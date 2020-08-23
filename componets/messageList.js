import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export default class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          console.log(message);
          return (
            <p
              key={Math.random() * (12 - 2) + 2}
              className="font-sinsimono p-6 text-white"
            >
              {message.txt}
            </p>
          );
        })}
      </div>
    );
  }
}
