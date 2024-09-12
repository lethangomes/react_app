import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);

    const loadMovies = async() => {
        const response = await fetch('/exercises');
        if(response.status !== 404)
        {
            const temp = await response.json();
            setExercises(temp);
        }
        else
        {
            setExercises([]);
        }
        //console.log(exercises);
    }

    const deleteMovie = async(id) => {
        const response = await fetch(`/exercises/${id}`, {method: "DELETE"});
        if(response.status === 400)
        {
            alert("Failed to delete exercise. Please try again later");
        }
        else{
            loadMovies();
        }
    }

    useEffect(() => {loadMovies();}, []); 

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} deleteMovie={deleteMovie} setExerciseToEdit={setExerciseToEdit}></ExerciseList>
            <Link to="/add-exercise">Add a exercise</Link>
        </>
    );
}

export default HomePage;