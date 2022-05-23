import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Link} from 'react-router-dom'

import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TaskList from './components/Tasks.js'

class App extends React.Component {

    constructor(props) {
        super(props)

        const user1 = {first_name: 'Иван', last_name: 'Иванов', role: 'manager'}
        const user2 = {first_name: 'Пётр', last_name: 'Петров', role: 'developer'}
        const users = [user1, user2]

        const project1 = {name: 'Project 1', owner: user1}
        const project2 = {name: 'Project 2', owner: user1}
        const project3 = {name: 'Project 3', owner: user2}
        const project4 = {name: 'Project 4', owner: user2}
        const projects = [project1, project2, project3, project4]

        const task1 = {project: project1, description: 'task 1', assigned_to: '123'}
        const task2 = {project: project1, description: 'task 2', assigned_to: '123'}
        const task3 = {project: project2, description: 'task 3', assigned_to: '123'}
        const task4 = {project: project2, description: 'task 4', assigned_to: '123'}
        const tasks = [task1, task2, task3, task4]

        this.state = {
            'users': users,
            'projects': projects,
            'tasks': tasks
        }
    }

    render() {
        return (
            <div className="App">

                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                            <Link to='/'>Users</Link>
                            </li>
                            <li>
                            <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                            <Link to='/tasks'>Tasks</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                    <Route exact path='/tasks' component={() => <TaskList tasks={this.state.tasks} />} />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
//    componentDidMount() {
//        axios.get('http://127.0.0.1:8000/api/users')
//            .then(response => {
//                const users = response.data
//                    this.setState(
//                    {
//                        'users': users,
//                        'projects': projects,
//                        'tasks': tasks
//                    }
//                )
//            }).catch(error => console.log(error))
//}

//    render () {
//        return (
//            <div>
//            <UserList users={this.state.users} />
//            </div>
//        )
//    }
//











