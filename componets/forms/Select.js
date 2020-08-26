export default class Select extends React.Component {
    constructor(props) {
        super(props);
        const newLocal = 'Selecciona uno';
        this.state = { value: newLocal };
    }

    render() {
        return (

            <form className="flex flex-col" onSubmit={this.handleSubmit}>
                <label className="pb-6" >
                    Escoge una opcion:
                </label>
                <select className="mx-4 bg-transparent" value={this.state.value} onChange={this.handleChange}>
                    <option value="Farmaceutica">Farmaceutica</option>
                    <option value="Tecnológica">Tecnológica</option>
                    <option value="Alimentaria">Alimentaria</option>
                    <option value="Servicios">Servicios</option>
                </select>

                {/* <input type="submit" value="Enviar" /> */}

            </form>

        );
    }
}
