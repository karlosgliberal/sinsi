export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="p-4 bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
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
              condimentum tempus. Mauris interdum neque vitae est ultricies
              pretium. Proin in lectus vitae tellus auctor fermentum aliquam vel
              velit. Aliquam risus augue, finibus at volutpat malesuada,
              vestibulum eu mauris.
            </p>
          </div>

          <p className="text-right font-sinsimono p-6 text-sinsipurple">
            Morado
          </p>
          <div className="border-t-2 border-b-2 border-gray-800 p-1 mb-3 mx-4 grid grid-cols-submit">
            <div className="">
              <input
                type="text"
                className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none"
                placeholder="Escribe tu texto"
              ></input>
            </div>
            <div className="border-l-2 border-gray-800 ">{/* Submit */}</div>
          </div>
        </div>
      </div>
    );
  }
}
