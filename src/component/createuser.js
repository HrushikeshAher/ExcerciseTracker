import React, { Component } from 'react'
import axios from 'axios'
//import {Link} from 'react-router-dom'

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            users: []
        }
    }
    componentDidMount() {
        axios.get('https://excercise-tracker-server.herokuapp.com/user/').then(res => {
            const userlist = res.data.map(data => {
                return { username: data.username, createdAT: data.createdAt, id: data._id }
            })
            this.setState({ users: userlist })
        })

    }
    onchangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmitHandler = (e) => {
        e.preventDefault()
        const user = { username: this.state.username }
        axios.post('https://excercise-tracker-server.herokuapp.com/user/add', user).then(res => {
            console.log(res.data)
            axios.get('https://excercise-tracker-server.herokuapp.com/user/').then(res => {
                const userlist = res.data.map(data => {
                    return { username: data.username, createdAT: data.createdAt, id: data._id }
                })
                this.setState({ users: userlist })
            })
        })
        this.setState({ username: '' })
    }
    deleteuser=(id,username)=>{
        axios.delete(`https://excercise-tracker-server.herokuapp.com/excercise/delete/${username}`).then(res=>console.log(res.data))
        axios.delete(`https://excercise-tracker-server.herokuapp.com/user/delete/${id}`).then(res=>console.log(res.data))
        this.setState({users:this.state.users.filter(data=>data.id!==id)})

    }
    render() {
        return (
            <>
                <div>
                    <h3>Create New User</h3>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                required
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.onchangeHandler}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create User" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <hr />
                <div className="container">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Created At</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => {
                                return <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{new Date(user.createdAT).toLocaleString()}</td>
                                    <td><a href="#" onClick={() => { this.deleteuser(user.id,user.username) }}>Delete</a></td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default CreateUser
