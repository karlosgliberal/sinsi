import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import dialogflowResponse from '../../services/dialogflowResponse';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boton: true,
      messages: [{ author: 'Them', body: 'Hey there!' }],
      fechas: ['dia', 'mes', 'años'],
    };
  }

  handleButtonClick = event => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'You', body: event },
      ],
    });
  };

  componentDidMount() {
    dialogflowResponse('dame la entrada', this);
  }

  handleNewMessage = text => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'Me', body: text },
      ],
    });
    dialogflowResponse(text, this);
  };

  render() {
    return (
      <div className="bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-screen lg:w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
          <div className="h-auto overflow-scroll">
            <MessageList messages={this.state.messages} />
            {this.state.boton == true && (
              <ButtonList
                onButtonClick={this.handleButtonClick}
                buttons={this.state.fechas}
              />
            )}
            <MessageForm onMessageSend={this.handleNewMessage} />
            {/* <div className="p-6"></div> */}
          </div>
        </div>
      </div>
    );
  }
}
