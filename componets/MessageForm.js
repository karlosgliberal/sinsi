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
        <div className="border-t-2 border-b-2 border-gray-800 p-1 mb-3 mx-4 grid grid-cols-submit">
          <input
            className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white"
            type="text"
            ref={node => (this.input = node)}
            placeholder="Enter your message..."
          />
        </div>
      </form>
    );
  }
}
