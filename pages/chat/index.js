import MessageList from '../../componets/messageList';
import MessageForm from '../../componets/MessageForm';
import axios from 'axios';
export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { body: 'Connecting...' },
        { author: 'You', body: 'Primeras pruebas', me: true },
        { author: 'Them', body: 'Hey there!' },
      ],
    };
  }
  handleNewMessage = text => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'Me', body: text },
      ],
    });
    axios
      .post('https://us-central1-sinsi-vbvp.cloudfunctions.net/connectChat', {
        text: text,
      })
      .then(res => {
        this.setState({
          messages: [
            ...this.state.messages,
            { me: true, author: 'You', body: res.data.fulfillmentText },
          ],
        });
      });
  };

  render() {
    return (
      <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
          <div className="h-auto overflow-scroll">
            <MessageList messages={this.state.messages} />
            <MessageForm onMessageSend={this.handleNewMessage} />
            {/* <div className="p-6"></div> */}
          </div>
        </div>
      </div>
    );
  }
}
