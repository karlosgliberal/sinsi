import PropTypes from 'prop-types';

export default class MessageForm extends React.Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.input.focus();
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onMessageSend(this.input.value);
    this.input.value = '';
  };

  render() {
    return (
      <form className="MessageForm" onSubmit={this.handleFormSubmit}>
        {/* cuando esta activo se añade la clase "submit-outline-active" y cuando no se quita: */}
        <div className="border-t-2 border-b-2 submit-outline p-1 mb-5 mx-4 grid grid-cols-submit bg-sinsiblue">
          <input
            className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white"
            type="text"
            ref={node => (this.input = node)}
            placeholder="Escribe tu mensaje..."
          />

          <div className="flex justify-center w-full border-l-2 border-gray-800 pl-2" >
            {/* cuando esta activo se quita la classe: "opacity-25 y cuando no se pone": */}
            <button class="flex items-center px-2 transition duration-700 opacity-25" onSubmit={this.handleFormSubmit}>
              <div>
                <img src="/images/enter-white.svg"></img>
              </div>
            </button>

          </div>

        </div>
      </form>
    );
  }
}
