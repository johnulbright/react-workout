import React,{useState,useEffect} from 'react';
import {Button,Form,FormGroup,Label,Input} from 'reactstrap'

const WorkoutCreate=(props)=>{
    const [description,setDescription]=useState('');
    const [definition,setDefinition]=useState('');
    const [result,setResult]=useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/log", {
            method: "POST",
            body:JSON.stringify({log:{description:description,definition:definition,result:result}}),
            headers: new Headers({
             'Content-Type': 'application/json',
              'Authorization': props.token,
           // 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEzMDAwMTI1LCJleHAiOjE2MTMwODY1MjV9.K0yfc_k0s14p6pk1BhUWYqEzM4o9DAjN5vHF2YpKPUk'
           })
         })
           .then((res) => res.json())
           .then((logData) => {
               console.log(logData);
               setDescription('');
               setDefinition('');
               setResult('');
               props.fetchWorkouts();
           });
       };

    return(
        <>
            <h3>Log a workout</h3>
            <Form type='submit' onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description"/>
                    <Input name="description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition"/>
                    <Input type = "select" name="definition" value={definition} onChange={(e)=>setDefinition(e.target.value)}>
                        <option></option>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result"/>
                    <Input name="result" value={result} onChange={(e)=>setResult(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
                </Form>
        </>
    )
}

export default WorkoutCreate;