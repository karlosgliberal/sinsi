export default function Message(props) {
  return (
    <div>
      {props.author === 'You' && (
        <div className="text-decoration">
          <p className="font-sinsimono p-6 text-white">{props.body}</p>
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
