import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();
    
    const updateExercise = async () =>
    {
        const updatedExercise = {name : name, reps: parseInt(reps), weight: parseInt(weight), unit: unit, date: date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {method: 'PUT', body: JSON.stringify(updatedExercise), headers: {'Content-Type': 'application/json'}});
        if(response.status === 200)
        {
            alert("Exercise has been updated");
        }
        else
        {
            alert("Failed to update exercise. Please try again later");
        }
        navigate("/");
    }
    
    return (
        <div>
            <h1>Edit Exercise</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Enter name here"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={reps}
                                placeholder="Enter reps here"
                                onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder="Enter weight here"
                                value={weight}
                                onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <select value={unit} onChange={e => setUnit(e.target.value)}>
                                <option value = "lbs">lbs</option>
                                <option value = "kgs">kgs</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Enter date here"
                                value={date}
                                onChange={e => setDate(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={updateExercise}
            >Submit</button>
        </div>
    );
}

export default EditExercisePage;