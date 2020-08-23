import MessageList from '../../componets/messageList';
import MessageForm from '../../componets/MessageForm';
export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { body: 'Connecting...' },
        { author: 'You', body: 'Hello!', me: true },
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
  };

  render() {
    return (
      <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
          <div className="h-auto overflow-scroll">
            <div className="p-4">
              <a
                className="text-white hover:text-sinsipurple transition duration-700"
                href="/uikit"
              >
                &#8592;
              </a>
            </div>
            <div className="p-4">
              <h2 className="text-2xl text-white">TEXTOS</h2>
            </div>
            <MessageList messages={this.state.messages} />
            <MessageForm onMessageSend={this.handleNewMessage} />
            <div className="p-6"></div>
          </div>
        </div>
      </div>
    );
  }
}
