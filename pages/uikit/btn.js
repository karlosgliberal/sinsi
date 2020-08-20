export default () => (

    <div className="bg-sinsiblue w-screen h-screen flex justify-center">

        <div className="sm:w-full md:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">
            <div className=" p-4">
                <a className="text-white hover:text-sinsipurple transition duration-700" href="/uikit">&#8592;</a>
            </div>

            <div className="h-auto overflow-scroll">


                <div className="p-4 text-center">
                    <h2 className="text-2xl text-white">BOTONES</h2>
                </div>





                <div className="flex flex-row justify-around px-4 my-6">
                    <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Azul</div>
                    <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Verde</div>
                    <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Amarillo</div>
                </div>

                <div className="flex flex-col px-4 my-6">
                    <a href="/" className="w-full py-3 px-8 mb-5 text-white border border-white font-sinsimono text-center hover:bg-white hover:text-gray-800 transition duration-700">Azul extendido</a>
                    <a href="/" className="w-full py-3 px-8 mb-5 text-white border border-white font-sinsimono text-center hover:bg-white hover:text-gray-800 transition duration-700">Verde extendido</a>
                    <a href="/" className="w-full py-3 px-8 mb-5 text-white border border-white font-sinsimono text-center hover:bg-white hover:text-gray-800 transition duration-700">Amarillo extendido</a>
                </div>

                <div className="flex flex-row justify-around mt-10 border-t border-gray-600">
                    <a href="" className="transition duration-500 ease-in-out py-3 px-8 my-10 text-white border border-white hover:border-sinsipurple font-sinsimono animate-pulse hover:animate-none pt-7">Empezar</a>
                </div>


            </div>


        </div>
    </div>
);
