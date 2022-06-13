import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {name: '', owner: props.users[0].id}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
//        console.log(this.state.name)
//        console.log(this.state.owner)
        this.props.createProject(this.state.name, this.state.owner)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="owner">owner</label>
                    <select name="owner" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                        {this.props.owners.map((item)=><option value={item.id}>{item.last_name}</option>)}
                        </select>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Save" />

            </form>
        );
    }
}

export default ProjectForm



