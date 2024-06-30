const ButtonComponent = (props: any) => {
    const { loading, onClick, disabled, text } = props;

    return (
        <button type="button" disabled={disabled} onClick={onClick} className="w-full flex justify-center text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {
                loading ? (
                    <div className="loader-custom"></div>
                ) : text
            }
        </button>
    )
}

export default ButtonComponent