
import Select from '../../componets/forms/Select';
export default () => (
  <div className="bg-sinsiblue w-screen h-screen flex justify-center">
    <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
      <div className="p-4">
        <a className="text-white hover:text-sinsipurple transition duration-700" href="/uikit">&#8592;</a>
      </div>
      <div className="h-auto overflow-scroll flex flex-col justify-end">

        <div className="text-decoration">
          <div className="font-sinsimono p-6 text-white">
            <Select />
          </div>
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
