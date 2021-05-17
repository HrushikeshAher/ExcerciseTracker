import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

class EditExcercise extends Component {
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
        axios.get('http://localhost:9000/user/').then(res => {
            const users = res.data.map(data => {
                return data.username
            })
            this.setState({ user: users })
        })
        console.log(this.props.id)
        axios.get(`http://localhost:9000/excercise/${this.props.match.params.id}`).then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            })
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
        axios.patch(`http://localhost:9000/excercise/update/${this.props.match.params.id}`, excrecise).then(res => {
            console.log(res.data)
            window.location = "/"
        })

    }
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExcercise