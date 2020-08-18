

import ReactSlider from 'react-slider';

export default () => (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="sm:w-full md:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">

            <div className="h-auto overflow-scroll">

                <div className="p-4 text-center">
                    <h1 className="text-5xl font-bold text-white">SLIDER</h1>
                </div>



                <div className="p-6">
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        max="10"
                        renderThumb={(props, state) => (
                            <div {...props}>{state.value}</div>
                        )}
                        renderTrack={(props, state) => (
                            <div className="mt-12 pt-6 text-white" {...props}>{state.value}</div>
                        )}

                    />

                </div>


                <div className="flex flex-row justify-around px-4 mt-10 ">

                    <a href="" className="transition duration-500 ease-in-out py-3 px-8 mb-3 text-white border border-white hover:border-sinsipurple font-sinsimono animate-pulse hover:animate-none">Empezar</a>


                </div>


            </div>

        </div>
    </div >
);