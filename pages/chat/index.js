import MessageList from '../../componets/MessageList';
import MessageForm from '../../componets/MessageForm';
import ButtonList from '../../componets/ButtonList';
import { getIntentionFromDialogflow } from '../../services/dialogflowResponse';
import { sinsiText } from '../../core/sinsiText';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sinsiText,
      boton: true,
      messages: [{ author: 'Them', body: 'Hey there!' }],
    };
  }

  getIntention = async intention => {
    const res = await getIntentionFromDialogflow(intention);
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'You', body: res.data.fulfillmentText },
      ],
    });
  };
  handleButtonClick = event => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'You', body: event },
      ],
    });
  };

  componentDidMount() {
    this.getIntention('dame la entrada');
  }

  handleNewMessage = text => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'Me', body: text },
      ],
    });
    this.getIntention(text);
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
                buttons={this.state.sinsiText['saltoTemporal'].preguntas}
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
