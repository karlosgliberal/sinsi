export default () => (
  <div className="bg-sinsiblue w-screen h-screen flex justify-center">
    <div className="sm:w-full md:w-1/2 border border-gray-700 flex flex-col justify-center bg-dots">
      <div className="h-auto overflow-scroll">
        <div className="p-4 text-center">
          <h1 className="text-3xl font-bold text-white">SINSI</h1>
        </div>

        <div className="sm:px-5 lg:px-10 font-sinsimono p-6 text-white ">
          <p className="">
            Blandit arcu eget tempor ullamcorper. Integer porta nibh at
            condimentum tempus.{' '}
          </p>
          <p className="">
            Mauris interdum neque vitae est ultricies pretium. Proin in{' '}
            <span class="bg-purple">lectus</span> vitae tellus auctor fermentum
            aliquam vel velit.
          </p>
        </div>

        <div className="flex flex-row justify-around px-4 mt-10 ">
          <a
            href=""
            className="transition duration-500 ease-in-out py-3 px-8 mb-3 text-white border border-white hover:border-sinsipurple font-sinsimono animate-pulse hover:animate-none"
          >
            Empezar
          </a>
        </div>
      </div>
    </div>
  </div>
);
