import Message from './Message';

export default function MessageList(props) {
  return (
    <div>
      {props.messages.map((message, i) => (
        <Message key={i} {...message} />
      ))}
    </div>
  );
}
