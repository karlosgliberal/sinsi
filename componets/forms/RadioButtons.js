export default class RadioButtons extends React.Component {

    render() {
        return (

            <form className="flex flex-col" onSubmit={this.handleSubmit}>
                <input type="radio" name="gender" value="2033"></input>
                <label for="male">2033</label>
                <input type="radio" name="2090" value="2090"></input>
                <label for="female">2090</label>
                <input type="radio" name="3000" value="3000"></input>
                <label for="other">3000</label>
            </form>

        );
    }
}

