import HabitRow from "../components/HabitRow"
import { useState,useEffect } from "react"
import { supabase } from "../supabase"
import "./AllHabitsPage.css"





export default function AllHabitsPage() {

    const [searchQuery, setSearchQuery]  = useState('')



    const [habits,setHabits]  = useState(
        [
        // {id: 1, name: "coding",color: "#4CAF50",streak: 13, rate: 5},
        // {id: 2, name: "sing",color: "#FF7043",streak: 18, rate: 6},
        // {id: 3,name: "dance", color: "#2DD4BF", streak: 7,rate: 8},
        // {id: 4,name: "running", color: "#1E88E5", streak: 9,rate: 19}
     
        
    ]
    )

    const filteredHabits = habits.filter((habit) => {
        return habit.name.includes(searchQuery)
    })
    async function fetchHabits() {
        const {data:{user}} = await supabase.auth.getUser()
        const {data,error} = await supabase.from('habits').select('*').eq('user_id',user.id)
        if(error) {
            console.log(error)
        } else {
            setHabits(data)
        }
        
    }
    useEffect(() => {
        fetchHabits()
    },[])

    async function handleDelete(id) {
        // setHabits(
        //     habits.filter((habit) => {
        //      if (habit.id !== id) {
        //         return habit
        //      }
        // })
        // )
        await supabase.from('habits').delete().eq('id',id)
        await fetchHabits()

    } 

    const [isModalOpen,setIsModalOpen] = useState(false)
    const [newHabitName,setNewHabitName] = useState('')

    
    async function handleAddHabit() {
        if(!newHabitName.trim()) return
        const {data: {user}} = await supabase.auth.getUser()
        // const newHabit  = {
        //     id: Date.now(),
        //     name: newHabitName,
        //     color:"#A78BFA",
        //     streak:0,
        //     rate: 0
        // }
        
        await supabase.from('habits').insert({
                name: newHabitName,
                color: "#A78BFA",
                user_id : user.id,
                streak: 0,
                rate: 0
            })
            
    
    
        await  fetchHabits()

        setIsModalOpen(false)
        setNewHabitName("")

    }

    return (
        <div className="all-habits-page">
            <div style={{marginBottom:'20px'}}> 
                <p style={{fontSize: '11px',color: 'var(--text-muted)', marginBottom:'4px'}}>Manage your habits</p>
                <h2 className="page-title">All Habits</h2>
            </div>
            <div style={{display:'flex', gap:'10px', marginBottom:'20px', alignItems:'center'}}>
                <button className="add-btn" onClick={() => setIsModalOpen(true)}>+ New Habit</button>
                <input
                    className="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search habits..."
                />
            </div>
            {isModalOpen && <div className="modal">
                <input type="text" value={newHabitName} onChange={(e) => (setNewHabitName(e.target.value))}/>
                <div className="modal-buttons">
                    <button onClick={() => (setIsModalOpen(false))}>Cancel/Close</button>
                    <button  onClick={() => (handleAddHabit())}>Submit</button>
                </div>

            </div> }
            {/* <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => (setSearchQuery(e.target.value))}
                placeholder="Search habits..." 
            /> */}

           <div className="habits-list">
                {
                        filteredHabits.map((habit) => {
                            return   <HabitRow key={habit.id} habit={habit} onDelete={handleDelete} /> 

                })
                }
            </div>     


        </div>
   

    )
}