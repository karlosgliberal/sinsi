export default class ButtonSelect extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="w-full py-3 px-8 mb-5 text-white border border-white font-sinsimono text-center hover:bg-white hover:text-gray-800 transition duration-700">
        {this.props.value}
      </div>
    );
  }
}
