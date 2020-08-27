import Message from './Message';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight;
  };
  render() {
    return (
      <div ref={node => (this.node = node)}>
        {this.props.messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </div>
    );
  }
}
