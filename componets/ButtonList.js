import ButtonSelect from './ButtonSelect';

export default class ButtonList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-col px-4 my-6">
        {this.props.buttons.map(fecha => (
          <ButtonSelect
            key={fecha.toString()}
            value={fecha}
            onButtonClick={this.props.onButtonClick}
          />
        ))}
      </div>
    );
  }
}
