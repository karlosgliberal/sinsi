import ButtonSelect from './ButtonSelect';

export default function ButtonList(props) {
  return (
    <div className="flex flex-col px-4 my-6">
      {props.buttons.map(fecha => (
        <ButtonSelect
          key={fecha.toString()}
          value={fecha}
          onButtonClick={props.onButtonClick}
        />
      ))}
    </div>
  );
}
