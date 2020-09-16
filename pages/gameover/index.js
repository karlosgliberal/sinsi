export default () => (
  <div className="bg-black w-screen h-screen flex justify-center">
    <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">
      <div className="p-4">
        <a
          className="text-white hover:text-sinsipurple transition duration-700"
          href="/"
        >
          &#8592;
        </a>
      </div>
      <div className="h-auto overflow-scroll flex flex-col justify-end">
        <div className="flex flex-row justify-center px-4 my-10 ">
          <img src="/images/gameover.gif"></img>
        </div>
      </div>
    </div>
  </div>
);
