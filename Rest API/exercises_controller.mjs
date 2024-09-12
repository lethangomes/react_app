'use strict'
import 'dotenv/config';
import * as exercise from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

function createFilter(query)
{
    const filter = {};
    if(query.hasOwnProperty('name')) filter.name = query.name;
    if(query.hasOwnProperty('reps')) filter.reps = query.reps;
    if(query.hasOwnProperty('weight')) filter.weight = query.weight;
    if(query.hasOwnProperty('unit')) filter.unit = query.unit;
    if(query.hasOwnProperty('date')) filter.date = query.date;
    return filter;
}

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validateRequest(request)
{
    let isValid = true;

    if(typeof request.name !== "string" || request.name === "")
    {
        console.log("Invalid name");
        isValid = false;
    }

    
    if(typeof request.reps !== "number" || request.reps <= 0)
    {
        console.log("Invalid reps");
        isValid = false;
    }

    
    if(typeof request.weight !== "number" ||request.weight <= 0)
    {
        console.log("Invalid weight");
        isValid = false;
    }

    if((request.unit !== "kgs" && request.unit !== "lbs"))
    {
        console.log("Invalid unit");
        isValid = false;
    }

    if(!isDateValid(request.date))
    {
        console.log("Invalid date");
        isValid = false;
    }

    return isValid;

}

//add new excercise
app.post('/exercises', (req, res) =>{

    if(!validateRequest(req.body))
    {
        console.log("Invalid request");
        res.status(400).json({Error: "Invalid request"})
    }
    else
    {
        exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise =>
        {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({Error: 'Request failed'});
        });
    }
   
});

//get by id
app.get('/exercises/:id', (req, res) =>{
    exercise.findExercises({_id: req.params.id})
        .then(exercises => 
        {
            if(exercises.length !== 0)
            {
                res.status(200).json(exercises);
            }
            else
            {
                res.status(404).json({Error: 'Resource not found'})
            }
        })
        .catch(error => 
        {
            console.log(error);
            res.status(400).json({Error: 'Request failed'})
        });
});

//get by filter
app.get('/exercises', (req,res) => {
    const filter = createFilter(req.query);

    exercise.findExercises(filter)
        .then(exercises => 
        {
            res.status(200).json(exercises);
        })
        .catch(error => 
        {
            console.log(error);
            res.status(400).json({Error: 'Request failed'})
        });
});

//update
app.put('/exercises/:id', (req, res) => {
    if(!validateRequest(req.body))
    {
        console.log("Invalid request");
        res.status(400).json({Error: "Invalid request"})
    }
    else
    {
        let newDoc = createFilter(req.body);

        exercise.replaceExercise({_id : req.params.id}, newDoc)
            .then(modifiedCount => {
                if(modifiedCount !== 0)
                {
                    res.status(200).json({_id: req.params.id, 
                        name: newDoc.name, 
                        reps: newDoc.reps, 
                        weight: newDoc.weight, 
                        unit: newDoc.unit,
                        date: newDoc.date});
                }
                else
                {
                    res.status(404).json({Error: "Resource not found"});
                }
            }).catch(error =>
            {
                console.log(error);
                res.status(400).json({Error: 'Request failed'});
            });
    }
    
});

app.delete('/exercises/:id', (req,res) => {
    exercise.deleteExercise(req.params.id).then(count => {
        if(count !== 0)
        {
            res.status(204).send();
        }
        else
        {
            res.status(404).json({Error: "Resource not found"});
        }
    }).catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Request failed'});
    });
});

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
})