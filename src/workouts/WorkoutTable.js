import React, { useEffect } from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable=(props)=>{
    const deleteWorkout=(workout)=>{
        fetch(`http://localhost:3000/log/${workout.id}`,{
            method:'DELETE',
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':props.token
            })
        })
        .then(()=>{
            console.log("delete");
            props.fetchWorkouts()
        })
    }
    
    const workoutMapper=()=>{
        
        return props.workouts.entries.map((workout,index)=>{
            return(
                <tr key={index}>
                    <th scope="row">{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        <Button color ="warning" onClick={()=>{props.editUpdateWorkout(workout);props.updateOn()}}>Update</Button>
                        <Button color ="danger" onClick={()=>deleteWorkout(workout)}>Delete</Button>
                    </td>

                </tr>
            )
        })
    }

    
    return(
        <>
        <h3>Workout Table</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Result</th>
                    <th>Description</th>
                    <th>Definition</th>

                </tr>
            </thead>
            <tbody>
                {props.workouts.length==0?useEffect:workoutMapper()}
                {/* I had to tweak this ^^^ to get it to work! */}
            </tbody>
        </Table>
        </>
    )
}

export default WorkoutTable;