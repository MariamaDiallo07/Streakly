import MiniHeatMap from "./MiniHeatMap"
import "./HabitRow.css"

     
        
    
// here I render each habit name individually for not the code to be messy
export default function HabitRow({habit, onDelete}) {
    return(
        // <div className="habit-row">
        //     <div className="habit-info">
        //        <div className="habit-name-row"> <span className="color-dot " style={{backgroundColor: habit.color}}></span> <span className="habit-name">{habit.name}</span> <span>{habit.streak}</span> </div>
        //         <MiniHeatMap color={habit.color}/>
        //         <span style={{fontSize:'12px', color:'#4A4A62'}}>{habit.rate}%</span>
        //     </div>
            
        //     <button className="delete-btn" onClick={() => onDelete(habit.id)}>Delete</button>
           

        // </div>
        <div className="habit-row">
            <div className="habit-info">
                <div className="habit-name-row">
                    <span className="color-dot" style={{backgroundColor: habit.color}}></span>
                    <span className="habit-name">{habit.name}</span>
                </div>
                <MiniHeatMap color={habit.color}/>
            </div>
    
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <span style={{fontSize:'12px', color: habit.color}}>{habit.streak}d</span>
                <span style={{fontSize:'12px', color:'#4A4A62'}}>{habit.rate}%</span>
                <button className="delete-btn" onClick={(e) => {
                    e.stopPropagation()
                    onDelete(habit.id)
                }}>Delete</button>
            </div>
        </div>

    )


}