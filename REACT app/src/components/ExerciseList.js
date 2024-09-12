import React from 'react';
import Movie from './Exercise';

function ExerciseList({ exercises, deleteMovie, setExerciseToEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Movie exercise={exercise}
                    key={i} deleteMovie = {deleteMovie} setExerciseToEdit = {setExerciseToEdit} />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;
