import PropTypes from 'prop-types';

export default class Message extends React.Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  };

  render() {
    return (
      <div>
        {this.props.author === 'You' && (
          <div className="text-decoration">
            <p className="font-sinsimono p-6 text-white">{this.props.body}</p>
          </div>
        )}
        {this.props.author === 'Me' && (
          <p className="text-right font-sinsimono p-6 text-sinsipurple">
            {this.props.body}
          </p>
        )}
      </div>
    );
  }
}
