import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
//import {Link} from 'react-router-dom'

class CreateExcercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            user: []
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('https://excercise-tracker-server.herokuapp.com/user/').then(res => {
            const users = res.data.map(data => {
                return data.username
            })
            this.setState({ user: users})
        })
    }
    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        const excrecise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log(excrecise)
        axios.post('https://excercise-tracker-server.herokuapp.com/excercise/add', excrecise).then(res => {
            console.log(res.data)
            window.location="/" 
        })
        
    }
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select required
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeHandler}>
                            {
                                this.state.user.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            name="duration"
                            value={this.state.duration}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                name="date"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExcercise
