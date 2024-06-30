import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <Image alt="banner" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/77dd9045daf65f13.jpg?q=20'} className="w-full lg:h-fit" width={1240} height={560} loading="lazy" />
      <div className="w-full flex justify-center py-16">
        <Link href="/products">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit rounded">
            Browse Products
          </button>
        </Link>
      </div>
    </div>

  );
}
