import React, { Component } from 'react'; 
import axios from 'axios';
import Exercise from './exercise'

export default class ExercisesList extends Component {
    constructor(){
        super()
        this.state={
            exercises: []
        }
        this.deleteExercise = this.deleteExercise.bind(this);

    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({exercises : response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentEx => {
            return <Exercise exercise={currentEx} deleteExercise={this.deleteExercise}    key={currentEx._id}/>
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="table">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}