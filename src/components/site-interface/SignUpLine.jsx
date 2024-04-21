import { useState, useRef, useEffect } from "react";

export default function SignUpLine({ get, isSeen, setSeen }) {
    const [isSignActive, setSignActive] = useState(true);
    const myDivRef = useRef(null);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (myDivRef.current) {
                myDivRef.current.classList.remove('opacity-0');
                myDivRef.current.classList.add('opacity-100');
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, []);
    function handleX() {
        get(true);
    }
    const handleSignIn=()=> {
        setSignActive(!isSignActive);
        setSeen(!isSeen)
    }
    return (
        <div>
            {isSignActive === false ? (
                <div className="px-10 h-9 bg-black text-center font-serif text-white m-0 font-medium text-sm flex justify-center items-center z-10 w-full">
                    <span>Sign up and get 20% off to your first order. <a onClick={handleSignIn} className="text underline cursor-pointer"> Sign Up Now</a></span>
                    <span onClick={handleX} className="absolute left-x cursor-pointer">X</span>
                </div>
            ) : (
                isSeen? (
                    <div ref={myDivRef} id="myDiv" className="fixed inset-0 bg-opacity-50 z-50 opacity-0 transition-opacity duration-500 ease-in-out">
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
                        <div className="bg-black text-white p-8 rounded-lg max-w-lg relative">
                            <h2 className="text-3xl font-bold text-center text-white mb-8">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
                            <div className="flex items-center border-gray-300 mb-6">
                                <input type="email" placeholder="Enter your email address" className="flex-grow px-4 py-2 mr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 text-black" />
                                <button className="px-6 py-2 bg-white text-black rounded-lg focus:outline-none hover:bg-gray-900 hover:text-white hover:py-4">Subscribe to Newsletter</button>
                            </div>
                            <button onClick={handleSignIn} className="absolute top-4 right-4 text-gray-500 focus:outline-none hover:text-gray-700">×</button>
                        </div>
                    </div>
                </div>
                ): undefined
            )}
        </div>
    );
}
