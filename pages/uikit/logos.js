export default () => (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">
            <div className="p-4">
                <a className="text-white hover:text-sinsipurple transition duration-700" href="/uikit">&#8592;</a>
            </div>
            <div className="h-auto overflow-scroll">

                <div className="p-4 text-center">
                    <h1 className="text-3xl font-bold text-white">LOGOS SVG</h1>
                </div>

                <div className="flex flex-row justify-center px-4 my-10 ">
                    <img src="/images/logos.svg"></img>
                </div>
                <div className="flex flex-row justify-center px-4 my-10 ">
                    <img src="/images/logo-bikolabs.svg"></img>
                </div>
                <div className="flex flex-row justify-center px-4 my-10 ">
                    <img src="/images/logo-biko.svg"></img>
                </div>
                <div className="border-t border-gray-700 py-6"></div>
                <div className="p-4 text-center">
                    <h1 className="text-3xl font-bold text-white">LOGOS ESCALAS</h1>
                </div>

                <div className="flex flex-row justify-around p-4 my-10  ">
                    <img className="w-5" src="/images/logo-bikolabs.svg"></img>
                    <img className="w-15" src="/images/logo-bikolabs.svg"></img>
                    <img className="w-20" src="/images/logo-bikolabs.svg"></img>
                </div>


            </div>

        </div>
    </div>
);