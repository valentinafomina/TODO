import React from 'react'

class TaskForm extends React.Component {
    constructor(props) {
    super(props)
    this.state = {description: '', created_by: props.users[0].id, project: props.Projects[0].id}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createTask(this.state.description, this.state.created_by, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" description="description"
                    value={this.state.description} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="created by">created_by</label>
                    <select name="created by" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                        {this.props.users.map((item)=><option value={item.id}>{item.last_name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className='form-control'
                        onChange={(event)=>this.handleChange(event)}>
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />

            </form>
        );
    }
}

export default TaskForm