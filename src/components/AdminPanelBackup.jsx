

export default function AdminPanel(){
    return <div className=" flex flex-row">
        <div className=" w-1/4 bg-gray-900 h-screen rounded-e-lg text-white text-center py-10 flex justify-center">
            <div className=" font-semibold text-2xl p-6 border-4 rounded-r-md w-fit h-fit border-white">Add product</div>
        </div>
        <div className="flex items-center justify-center w-full">
            <div className=" ">
                <h2 className=" text-3xl justify-start items-start">Product Information</h2>
                <label htmlFor=""> Add Product photo</label>
                <input type="file" />
            </div>
        </div>
    </div>
}