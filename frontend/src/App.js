import React, { Component, useState } from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter, Route, NavLink, Switch, Link} from 'react-router-dom'
import Cookies from 'universal-cookie';

import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TaskList from './components/Tasks.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import TaskForm from './components/TaskForm.js'


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'tasks': [],
            'token': '',
        }
    }

    async loadData() {

        const headers = this.get_headers()

        const requestUser = () => axios.get('http://127.0.0.1:8000/api/users', {headers}).catch(err => null);
        const requestProject = () => axios.get('http://127.0.0.1:8000/api/projects', {headers}).catch(err => null);
        const requestTask = () => axios.get('http://127.0.0.1:8000/api/tasks', {headers}).catch(err => null);

        try {

            const [UserData, ProjectsData, TaskData] = await axios.all([requestUser(), requestProject(), requestTask()]);

            this.setState({
                'users': UserData.data.results,
                'projects': ProjectsData.data.results,
                'tasks': TaskData.data.results,
                }
                );
            console.log(this.state.projects)
        }

        catch (err) {
            console.log(err.message);
        }
    }


    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            console.log(response.data)
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }


    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.loadData())

    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => {this.loadData()})
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
            }
            if (this.is_authenticated())
            {
            headers['Authorization'] = 'Token ' + this.state.token
            }
        return headers
        }

    createProject(name, owner) {
        const headers = this.get_headers()
        const data = {name: name, owner: owner}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).
            then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }
        ).catch(error => console.log(error))
    }


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})
            }).catch(error => console.log(error))
        }

    createTask(description, created_by, project) {
        const headers = this.get_headers()
        const data = {description: description, created_by: created_by, project: project}
        axios.post(`http://127.0.0.1:8000/api/tasks/`, data, {headers, headers}).
            then(response => {
                let new_task = response.data
                const created_by = this.state.created_by.filter((task) => task.id === new_task.created_by)[0]
                const project = this.state.project.filter((task) => task.id === new_task.project)[0]
                new_task.created_by = created_by
                new_task.project = project
                this.setState({tasks: [...this.state.tasks, new_task]})
            }
        ).catch(error => console.log(error))
    }


    deleteTask(id) {
        const headers = this.get_headers()
        axios.delete('http://127.0.0.1:8000/api/tasks/${id}', {headers, headers})
            .then(response => {
                this.setState({projects: this.state.tasks.filter((task)=>task.id !== id)})
            }).catch(error => console.log(error))
    }


    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
        <div className="App">
                <BrowserRouter>
                <nav>
                        <ul>
                            <li>
                            <NavLink exact
                              to="/"

                            >
                              Users
                            </NavLink>

                            </li>
                            <li>
                                <NavLink to='/projects'>Projects</NavLink>
                            </li>
                            <li>
                                <NavLink to='/tasks' >Tasks</NavLink>
                            </li>

                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                                </li>

                        </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                        deleteProject={(id)=>this.deleteProject(id)}/>} />
                    <Route exact path='/tasks' component={() => <TaskList tasks={this.state.tasks}
                        deleteTask={(id)=>this.deleteTask(id)}/>}/>} />
//                    <Route exact path='/login' component={() => <LoginForm />} />
                    <Route exact path='/login' component={() => <LoginForm
                    get_token={(username, password) => this.get_token(username, password)} />} />
//                    <Route exact path='/projects/create' component={() => <ProjectForm />}/>
                    <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, owner) =>
                        this.createProject(name, owner)} />} />
                    <Route exact path='/tasks/create' component={() => <TaskForm users={this.state.users} createTask={(description, created_by, project) =>
                        this.createTask(description, created_by, project)} />} />
                </Switch>
                </BrowserRouter>
        </div>
        )
    }
}


export default App;

//    constructor(props) {
//        super(props)
//        const user1 = {first_name: 'Иван', last_name: 'Иванов', role: 'manager'}
//        const user2 = {first_name: 'Пётр', last_name: 'Петров', role: 'developer'}
//        const users = [user1, user2]
//
//        const project1 = {name: 'Project 1', owner: user1}
//        const project2 = {name: 'Project 2', owner: user1}
//        const project3 = {name: 'Project 3', owner: user2}
//        const project4 = {name: 'Project 4', owner: user2}
//        const projects = [project1, project2, project3, project4]
//
//        const task1 = {project: project1, description: 'task 1', assigned_to: '123'}
//        const task2 = {project: project1, description: 'task 2', assigned_to: '123'}
//        const task3 = {project: project2, description: 'task 3', assigned_to: '123'}
//        const task4 = {project: project2, description: 'task 4', assigned_to: '123'}
//        const tasks = [task1, task2, task3, task4]
//
//        this.state = {
//            'users': users,
//            'projects': projects,
//            'tasks': tasks
//        }
//    }

//    componentDidMount() {
//    const requestUser = 'http://127.0.0.1:8000/api/users'
//    const requestProject = 'http://127.0.0.1:8000/api/projects'
//    const requestTask = 'http://127.0.0.1:8000/api/tasks'
//
//    axios.all(requestUser, requestTask, requestProject)
//        .then(response => {
//            axios.spread((...responses) => {
//            const responseOne = responses[0];
//            const responseTwo = responses[1];
//            const responsesThree = responses[2];
//
//            console.log(responseOne, responseTwo, responsesThree);
//            })
//            )
//            }).catch(error => console.log(error))
//        }

//    render () {
//        return (
//            <div>
//            <UserList users={this.state.users} />
//            </div>
//        )
//    }
//





//        axios
//            .all([requestUser, requestProject, requestTask])
//            .then(
//                axios.spread((...responses) => {
//
//                    const responseOne = responses[0].data;
//                    const responseTwo = responses[1].data.results;
//                    const responseThree = responses[2].data.results;
//
//                    console.log(responseOne, responseTwo, responseThree);
//                    })
//                )
//                .catch(errors => {console.error(errors)
//                })
//    }

//                                <NavLink to="/" >Users</NavLink>