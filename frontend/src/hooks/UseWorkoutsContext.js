import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

const UseWorkoutsContext = () => {

    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error("useWorkoutContext should be used within a WorkoutContextProvider")
    }
  return context
}

export default UseWorkoutsContext