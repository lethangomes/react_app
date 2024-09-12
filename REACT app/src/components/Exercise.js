import React from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Exercise({ exercise, deleteMovie, setExerciseToEdit }) {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td onClick = {() => {
                setExerciseToEdit(exercise);
                navigate("/edit-exercise");
                }}> <MdEdit /></td>
            <td onClick = {() => {deleteMovie(exercise._id)}}><MdDelete /></td>
        </tr>
    );
}

export default Exercise;