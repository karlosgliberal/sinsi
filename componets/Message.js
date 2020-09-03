const ReactMarkdown = require('react-markdown');

export default function Message(props) {
  return (
    <div>
      {props.author === 'You' && (
        <div className="text-decoration">
          <ReactMarkdown
            //className= {(prosp.puntos  ? 'active' : '')}
            className="font-sinsimono p-3 text-white"
            source={props.body}
            escapeHtml={false}
          />
        </div>
      )}
      {props.author === 'Me' && (
        <p className="text-right font-sinsimono p-6 text-sinsipurple">
          {props.body}
        </p>
      )}
    </div>
  );
}
