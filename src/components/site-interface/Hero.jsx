export default function Hero() {
    return (
        <>
            <div className="hero flex flex-col sm:flex-row">
                <div className="flex justify-center items-center w-full sm:w-1/2">
                    <div className="w-full sm:w-4/5 flex flex-col gap-8 py-16 px-4 sm:px-0">
                        <h1 className="text-4xl sm:text-6xl font-bold text-center sm:text-left">FIND CLOTHES THAT MATCH YOUR STYLE</h1>
                        <span className="faded-color font-normal text-sm">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</span>
                        <button className="px-8 py-3 rounded-full bg-black text-white self-center">Shop Now</button>
                        <div className="flex justify-center md:flex-row sm:flex-col align-top gap-2 ">
                            <div className="w-full px-0 mx-0 flex justify-center items-center flex-col">
                                <h3 className="text-3xl font-bold">200+</h3>
                                <span className="faded-color font-normal text-sm text-center">International Brands</span>
                            </div>
                            <hr className="sm:hidden w-full" />
                            <div className="w-full px-0 mx-0 flex justify-center items-center flex-col">
                                <h3 className="text-3xl font-bold">2,000+</h3>
                                <span className="faded-color font-normal text-sm text-center">High-Quality Products</span>
                            </div>
                            <hr className="sm:hidden w-full" />
                            <div className="w-full px-0 mx-0 flex justify-center items-center flex-col">
                                <h3 className="text-3xl font-bold">30,000+</h3>
                                <span className="faded-color font-normal text-sm text-center">Always Happy Customers</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8 sm:mt-0">
                    <img className="max-w-full h-auto" src="src/assets/image.png" alt="" />
                </div>
            </div>
            <div className="bg-black flex flex-wrap justify-center gap-[5%] items-center py-3">
                <img className=" py-4" src="src/assets/Versage.svg" alt="" />
                <img className=" py-4" src="src/assets/Versage.svg" alt="" />
                <img className=" py-4" src="src/assets/Versage.svg" alt="" />
                <img className=" py-4" src="src/assets/Versage.svg" alt="" />
                <img className=" py-4" src="src/assets/Versage.svg" alt="" />
            </div>
        </>
    );
}
