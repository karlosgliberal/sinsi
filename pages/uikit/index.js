export default () => (
  <div className="m-4 bg-sinsiblue w-screen h-screen flex justify-center">
    <div className="overflow-scroll w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-white">UIKIT</h1>
      </div>

      <div className="p-4">
        <h2 className="text-2xl text-white">TEXTOS</h2>
      </div>
      <p className="text-white p-6">
        VivamDus blandit arcu eget tempor ullamcorper. Integer
      </p>
      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          Blandit arcu eget tempor ullamcorper. Integer porta nibh at
          condimentum tempus. Mauris interdum neque vitae est ultricies pretium.
          Proin in lectus vitae tellus auctor fermentum aliquam vel velit.
          Aliquam risus augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>
      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          Blandit arcu eget tempor ullamcorper. Integer porta nibh at
          condimentum tempus. Mauris interdum neque vitae est ultricies pretium.
          Proin in lectus vitae tellus auctor fermentum aliquam vel velit.
          Aliquam risus augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>
      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          neque vitae est ultricies pretium.
          Proin in lectus vitae tellus auctor fermentum aliquam vel velit.
          Aliquam risus augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>
      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          tum tempus. Mauris interdum neque vitae est ultricies pretium.
          Proin in lectus vitae tellus auctor fermentum aliquam vel velit.
          Aliquam risus augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>
      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          tempus. Mauris interdum neque vitae est ultricies pretium.
          Proin in lectus vitae tellus auctor fermentum aliquam vel velit.
          Aliquam risus augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>

      <div className="text-decoration">
        <p className="font-sinsimono p-6 text-white">
          us augue, finibus at volutpat malesuada, vestibulum eu
          mauris.
        </p>
      </div>


      <div className="flex flex-row justify-around px-4">
        <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Azul</div>
        <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Verde</div>
        <div className="py-3 px-8 mb-3 text-white border border-white font-sinsimono">Amarillo</div>
      </div>

      <p className="text-right font-sinsimono p-6 text-sinsipurple">Morado</p>
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
