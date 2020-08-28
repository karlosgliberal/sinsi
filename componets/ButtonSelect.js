export default function ButtonSelect(props) {
  return (
    <div
      onClick={() => props.onButtonClick(props.value)}
      value={props.value}
      className="w-full py-3 px-8 mb-5 text-white border border-white font-sinsimono text-center hover:bg-white hover:text-gray-800 transition duration-700"
    >
      {props.value}
    </div>
  );
}
