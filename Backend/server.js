const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const bodyParser = require('body-parser');

const cors = require('cors')
app.use(cors({
    origin: '*'
}))

//Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = () => {
    mongoose.connect("mongodb+srv://neelkhamar:neel1234@ecomm.wy4gfaj.mongodb.net/?retryWrites=true&w=majority&appName=Ecomm", {})

    mongoose.connection.once('open', function () {
        console.log('Database connected Successfully');
    }).on('error', function (err) {
        console.log('Error', err);
    })
}

app.get('/', (req, res, next) => {
    res.json({ success: true, data: [] })
})

app.get('/getProducts/:userId', async (req, res, next) => {
    let query = {};
    if (req?.query?.value) {
        query = {
            $or: [
                { 'title': { "$regex": req.query.value, "$options": "i" } }, { 'category': { "$regex": req.query.value, "$options": "i" } }
            ]
        }
    }
    let userAddedProducts = await Cart.find({ user: new mongoose.Types.ObjectId(req.params.userId) });
    let products = []
    userAddedProducts?.forEach((item) => {
        products.push(item?.product?.toString());
    })
    let response = await Product.find(query);
    let result = []
    response?.forEach((value) => {
        const {
            category,
            description,
            parent,
            price,
            quantity,
            title,
            url,
            __v,
            _id
        } = value;
        let payload = {
            category,
            description,
            parent,
            price,
            quantity,
            title,
            url,
            __v,
            _id
        };
        payload["cart"] = products.includes(value._id?.toString()) ? true : false
        result.push(payload);
    })
    res.json({ message: "Transaction successful", data: result, success: true, total: result.length })
});

app.get('/cart/:user', async (req, res, next) => {
    let response = await Cart.aggregate([
        {
            '$match': {
                'user': new mongoose.Types.ObjectId(req.params.user)
            }
        }, {
            '$lookup': {
                'from': 'products',
                'localField': 'product',
                'foreignField': '_id',
                'as': 'productInfo'
            }
        }
    ]);
    res.json({ message: "Transaction successful", data: response, success: true, total: response.length })
})

app.put('/cart/:id', async (req, res, next) => {
    let result = {};
    try {
        if (req.body.quantity > 0) {
            result = await Cart.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, {
                user: req.body.user,
                product: req.body.product,
                quantity: req.body.quantity
            })
        } else {
            result = await Cart.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) });
        }
        res.json({ message: "Transaction successful", data: result, success: true })
    } catch (err) {
        res.json({ message: "Something went wrong", data: null, success: false })
    }
})

app.post('/cart/:user', async (req, res, next) => {
    let cart = new Cart({
        user: req.params.user,
        product: req.body.product,
        quantity: req.body.quantity
    });
    cart.save().then(async (result) => {
        let response = await Cart.aggregate([
            {
                '$match': {
                    'user': new mongoose.Types.ObjectId(req.params.user)
                }
            }
        ])
        res.json({ message: "Added to cart", data: result, success: true, total: response?.length })
    }).catch((err) => {
        res.json({ message: "Something went wrong. Try again", data: null, success: false })
    })
})

app.get('/left-menu', async (req, res, next) => {
    let leftMenu = {};
    let response = await Product.find({});
    let menu = []
    response?.forEach((item) => {
        if (leftMenu[item.parent] && !leftMenu[item.parent]?.includes(item.category)) {
            leftMenu[item.parent].push(item.category)
        } else if (!leftMenu?.[item.parent]) {
            leftMenu[item.parent] = [item.category]
        }
    });
    Object.keys(leftMenu).forEach((key) => {
        let payload = {
            name: key,
            children: leftMenu[key]
        }
        menu.push(payload);
    })
    res.json({ message: "Fetched successfully", data: menu, success: true })
})

app.post('/addProduct', async (req, res, next) => {
    let product = new Product({ ...req.body });
    product.save().then(val => {
        delete val.password;
        res.json({ message: "Product saved successfully", data: val, success: true })
    }).catch((err) => {
        res.json({ message: "Something went wrong. Try again", data: null, success: false })
    })
})

app.post('/login', async (req, res) => {
    let response = await User.findOne({ email: req.body.email });
    if (!response) {
        return res.json({ message: "Invalid email or password", data: null, success: false })
    }

    if (response.password !== req.body.password) {
        return res.json({ message: "Invalid email or password", data: null, success: false })
    }

    let result = {
        "_id": response._id,
        "name": response.name,
        "email": response.email,
    };
    res.json({ message: "Login successful", data: result, success: true })
})

app.post('/create/user', async (req, res) => {
    const user = new User({
        ...req.body
    });
    let response = await User.find({ email: req.body.email });
    if (response?.length > 0) {
        return res.json({ message: "User already exists", data: null, success: false });
    }
    user.save().then(val => {
        delete val.password;
        res.json({ message: "User created successfully", data: val, success: true })
    }).catch((err) => {
        res.json({ message: "Something went wrong. Try again", data: null, success: false })
    })
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
    connection()
})