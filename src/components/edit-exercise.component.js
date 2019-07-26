import React, { Component } from 'react'; 
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props){
        super()
        this.state = {
            username : "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        }

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){

        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    data: new Date(response.data.date)
                })
            })
        axios.get('http://localhost:5000/users/')
            .then(response=> {
                if (response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    handleChange(e){
        const {value, name, type} = e.target

        this.setState({
            [name]: value,
        })

    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = "/";
    }
    
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleChange}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>
                                })
                            }
                            </select>
                    </div>
                    <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                required
                                name="description"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.handleChange}
                                />
                    </div>
                    <div className="form-group">
                            <label>Duration (in minutes): </label>
                            <input type="text"
                                required
                                name="duration"
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.handleChange}
                                />
                    </div>
                    <div className="form-group">
                            <label>Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
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