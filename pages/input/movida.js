import MessageList from '../../componets/messageList';
import SendMessageForm from '../../componets/SendMessageForm';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.setState({
      messages: [...this.state.messages, text],
    });
  }

  render() {
    return (
      <div className="p-4 bg-sinsiblue w-screen h-screen flex justify-center">
        <div className="w-1/2 border border-gray-700 flex flex-col justify-end bg-dots">
          <div className="h-auto overflow-scroll">
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
                pretium. Proin in lectus vitae tellus auctor fermentum aliquam
                vel velit. Aliquam risus augue, finibus at volutpat malesuada,
                vestibulum eu mauris.
              </p>
              <MessageList messages={this.state.messages} />
            </div>

            <p className="text-right font-sinsimono p-6 text-sinsipurple">
              Morado
            </p>
          </div>
          <SendMessageForm sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}
