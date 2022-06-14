import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
    super(props)
    console.log(props)
    this.state = {name: '', owner: ''}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(this.state.name)
        console.log(this.state.owner)
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
                    <input type="text" className="form-control" name="owner"
                    value={this.state.owner} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />

            </form>
        );
    }
}

export default ProjectForm



