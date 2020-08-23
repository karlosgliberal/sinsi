import PropTypes from 'prop-types';
import Message from './Message';

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    messages: [],
  };
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
