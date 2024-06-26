import React, { useState } from 'react'
import UseWorkoutsContext from "../hooks/UseWorkoutsContext";


const WorkoutForm = () => {
    const {dispatch} = UseWorkoutsContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, reps, weight}

        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setTitle('')
            setReps('')
            setWeight('')
            setError(null)
            console.log("New workout added")
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

  return (
    <form className='create' onSubmit={(handleSubmit)}>
        <h3>Add a new workout</h3>
        <label>Exercise:</label>
        <input 
        type='text' 
        onChange={(e) => {
            setTitle(e.target.value)
        }} value = {title}/>

        <label>Reps:</label>
        <input 
        type='number' 
        onChange={(e) => {
            setReps(e.target.value)
        }} value = {reps}/>
        
        <label>Weight:</label>
        <input 
        type='number' 
        onChange={(e) => {
            setWeight(e.target.value)
        }} value={weight}/>

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
        
    </form>
  )
}

export default WorkoutForm