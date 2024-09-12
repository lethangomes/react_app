import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name : name, reps: parseInt(reps), weight: parseInt(weight), unit: unit, date: date};
        const response = await fetch("/exercises", {method: 'POST', body: JSON.stringify(newExercise), headers: {'Content-Type': 'application/json'}});
        if(response.status === 201)
        {
            alert("Exercise added successfully!");
        }
        else
        {
            alert("Failed to add new exercise. Please check your inputs and try again later");
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
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
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;