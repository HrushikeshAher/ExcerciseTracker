import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="/" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

class ExcercisesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            excercises: [],
            user: [],
            username: 'All Users',
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/excercise`).then(res => {
            this.setState({ excercises: res.data })
        }).catch(err => console.log(err))

        axios.get('http://localhost:9000/user/').then(res => {
            const users = res.data.map(data => {
                return data.username
            })
            this.setState({ user: users})
        })
    }

    deleteExcercise = (id) => {
        axios.delete(`http://localhost:9000/excercise/${id}`).then(res => alert(res.data)).catch(err => console.log(err))
        this.setState({ excercises: this.state.excercises.filter((excercise) => id !== excercise._id) })

    }

    exerciseList(username) {
        let records=[]
        if(username==='All Users')
            records=this.state.excercises
        else
            records =this.state.excercises.filter((record)=>record.username===username)
         return records.map(currentexercise => {
             return <Exercise exercise={currentexercise} deleteExercise={this.deleteExcercise} key={currentexercise._id} />;
         })
    }
    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <select className="form-select" aria-label="Default select example"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeHandler}>
                    <option value="All Users">All Users</option>
                    {
                        this.state.user.map(function (user) {
                            return <option
                                key={user}
                                value={user}>{user}
                            </option>;
                        })
                    }
                </select>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList(this.state.username)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExcercisesList