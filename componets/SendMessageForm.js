import axios from 'axios';

export default class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // this.setState({
    //   message: ,
    // });
  }

  handleSubmit(e) {
    this.setState({
      message: '',
    });
    axios
      .post('https://us-central1-sinsi-vbvp.cloudfunctions.net/connectChat', {
        text: 'Tienes nova?',
      })
      .then(res => {
        this.setState({
          message: res.data.fulfillmentText,
        });
        console.log(res.data);
        this.props.sendMessage(this.state.message);
      });
    this.props.sendMessage(this.state.message);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <div className="border-t-2 border-b-2 border-gray-800 p-1 mb-3 mx-4 grid grid-cols-submit">
          <input
            className="border-0 bg-transparent w-full focus:border-transparent py-3 px-2 rounded-none text-white"
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Escribe tu texto"
            type="text"
          />
        </div>
      </form>
    );
  }
}
