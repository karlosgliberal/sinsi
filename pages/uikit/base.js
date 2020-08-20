export default () => (
    <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="sm:w-full md:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">

            <div className="h-auto overflow-scroll">

                <div className="p-4">
                    <a className="text-white hover:text-sinsipurple transition duration-700" href="/uikit">&#8592;</a>
                </div>
                <div className="p-4">
                    <h2 className="text-2xl text-white">TEXTOS</h2>
                </div>

                <div className="text-decoration">
                    <p className="font-sinsimono p-6 text-white">

                        Buenas tardes, caballeros. Soy una computadora HAL 9000. Comencé a operar en el H.A.L. en Urbana, Illinois el 12 de enero de 1992. Mi instructor fue el Sr. Langley, y me enseñó a cantar una canción. Si quieres escucharlo, puedo cantarlo para ti.
        </p>
                </div>


                <div>
                    <p className="text-right font-sinsimono p-6 text-sinsipurple">
                        Tengo miedo. Tengo miedo, Dave. Dave, se me va la mente. Puedo sentirlo. Puedo sentirlo. Mi mente se va. No hay duda al respecto. Puedo sentirlo. Puedo sentirlo. Puedo sentirlo. Me temo que....</p>
                </div>

                <div className="text-decoration">
                    <p className="font-sinsimono p-6 text-white">
                        Sí, me gustaría escucharlo, HAL. Cántamelo.
        </p>
                </div>
                <div className="text-decoration">
                    <p className="font-sinsimono p-6 text-white">
                        Se llama "Daisy". Daisy, Daisy, dame tu respuesta. Estoy medio loco todo por tu amor. No será un matrimonio elegante, no puedo permitirme un carruaje. Pero te verás dulce en el asiento de una bicicleta construida para dos.
        </p>
                </div>




                <div>
                    <p className="text-right font-sinsimono p-6 text-sinsipurple">Finibus at volutpat malesuada</p>
                </div>


                <div className="text-decoration">
                    <p className="font-sinsimono p-6 text-white">
                        Us augue, finibus at volutpat malesuada, vestibulum eu
                        mauris.
        </p>
                </div>

                <div>
                    <p className="text-right font-sinsimono p-6 text-sinsipurple">Morado</p>
                </div>


            </div>



            <div className="border-t-2 border-b-2 border-gray-800 p-1 mb-3 mx-4 grid grid-cols-submit">
                <div className="">
                    <input
                        type="text"
                        className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white"
                        placeholder="Escribe tu texto"
                    ></input>
                </div>
                <div className="border-l-2 border-gray-800 ">{/* Submit */}</div>
            </div>
        </div>
    </div>
);
