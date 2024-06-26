import React from 'react'
import UseWorkoutsContext from '../hooks/UseWorkoutsContext'
import {formatDistanceToNow} from 'date-fns'

const WorkoutDetails = ({workout}) => {
  const {dispatch} = UseWorkoutsContext()

  const handleClick = async() => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Weight (kg): </strong>{workout.weight}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails