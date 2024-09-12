'use strict'
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {useNewUrlParser: true}
);

//connect to database
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose");
})

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
});

const Exercise = mongoose.model("excercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
    const exerciseProperties = {name: name, reps: reps, weight: weight, unit: unit, date: date};

    const exercise = new Exercise(exerciseProperties);
    return exercise.save();
}

const findExercises = async (filter) =>
{   
    const query = Exercise.find(filter);
    return query.exec();
}

const replaceExercise = async (id, newDoc) =>
{
    const exerciseProperties = { 
        name: newDoc.name, 
        reps: newDoc.reps, 
        weight: newDoc.weight, 
        unit: newDoc.unit,
        date: newDoc.date};

    const result = await Exercise.replaceOne(id, exerciseProperties);
    return result.modifiedCount;
}

const deleteExercise = async (id) =>
{
    const result = await Exercise.deleteOne({_id: id});
    
    return result.deletedCount;
}

export {createExercise, findExercises, replaceExercise, deleteExercise};
