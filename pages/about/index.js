export default () => (
  <div className="bg-sinsiblue w-screen h-screen flex justify-center">
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
          <img src="/images/logos.svg"></img>
        </div>
        <div className="p-6">
          <p className="font-sinsimono text-white">
            Sinsi es nuesta app de Diseño de futuros y fue ideada por los
            magistrales.... Integer porta nibh at condimentum tempus. Mauris
            interdum neque vitae est ultricies pretium. Proin in lectus vitae.
            mauris.
          </p>
          <p className="font-sinsimono text-white">
            us augue, finibus at volutpat malesuada, vestibulum eu mauris.
          </p>
        </div>
      </div>
    </div>
  </div>
);
