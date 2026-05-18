import { useState,useEffect } from "react";
import { supabase } from "../supabase";
import { calculateStreak,calculateRate } from "../utile";
import "./TodayPage.css"




export default function TodayPage() {
       const [habits,setHabits]  = useState(
        [
        // {id: 1, name: "coding",color: "#4CAF50",streak: 13, rate: 5},
        // {id: 2, name: "sing",color: "#FF7043",streak: 18, rate: 6},
        // {id: 3,name: "dance", color: "#2DD4BF", streak: 7,rate: 8},
        // {id: 4,name: "running", color: "#1E88E5", streak: 9,rate: 19}
     
        
    ]
    )
    async function fetchHabits() {
      const {data:{user}} = await supabase.auth.getUser()
      const {data,error} =  await supabase.from("habits").select('*').eq('user_id',user.id)
      if(error) {
        console.log(error)
      }
      else {
        setHabits(data)
      }
      
    }
    useEffect(() => {
      fetchHabits()
      fetchTodayCompletions()
    }, [])


    const [doneTodayIds, setDoneTodayIds]  = useState([])

  async function fetchTodayCompletions() {
    const {data: {user}} = await supabase.auth.getUser()
    const today = new Date().toISOString().split('T')[0]
    const {data} =  await supabase
    .from('completions')
    .select("habit_id")
    .eq('completion_date',today)
    .eq('user_id',user.id)
    setDoneTodayIds(data.map(c =>c.habit_id))
    
  }  


   async function handleToggleId(id) {
    const today = new Date().toISOString().split('T')[0]
    const {data: {user}} = await supabase.auth.getUser()
    // console.log(user)
    if(doneTodayIds.includes(id)) {
      await supabase.from('completions').delete().eq('habit_id',id).eq('completion_date',today)
        setDoneTodayIds(doneTodayIds.filter((existId) => existId !== id

        ))
    }
    else {
        const {data:existing} = await supabase.from('completions').select('id').eq('habit_id',id).eq('completion_date',today).eq('user_id',user.id)
        if(existing && existing.length>0) return
        else {
         
          await supabase.from('completions').insert({
            habit_id: id,
            user_id : user.id,
            completion_date: today
          })
          const {data: profileData} = await supabase.from('profiles').select('xp').eq('id',user.id).single()
          const newXp = (profileData.xp || 0) + 10
          const newLevel = Math.floor(newXp / 500) +1
          await supabase.from('profiles').update({xp:newXp,level: newLevel}).eq('id',user.id)
          const {data: habitCompletions} = await supabase.from('completions').select('completion_date').eq('habit_id',id).eq('user_id',user.id)
          const dates = habitCompletions.map(c => c.completion_date)
          const newStreak = calculateStreak(dates)
          const newRate = calculateRate(dates)
          await supabase
          .from('habits')
          .update({streak: newStreak,rate: newRate})
          .eq('id',id)
          setDoneTodayIds([...doneTodayIds,id])
        }
        // const {data: {user}} = await.supabase.auth.getUser()
        // await supabase.from('completions').insert({
        //   habit_id: id,
        //   user_id : user.id,
        //   completion_date: today
        // })
        // setDoneTodayIds([...doneTodayIds,id])
    }
  }
  return(
    <div className="today-page">
        <h2>Today</h2>
        <p className="progress-text">{doneTodayIds.length}/{habits.length}</p>
        {habits.map((habit) =>{ 
            const isDone = doneTodayIds.includes(habit.id)
        return( 
                 <div className="today-row" key={habit.id} onClick={()=>(handleToggleId(habit.id))}>
                    {/* <button onClick={() => (handleToggleId(habit.id))}>done</button> */}
                 
                    <div style={{backgroundColor: isDone ? habit.color: "transparent", width: "18px",height: "18px",borderRadius:"50px",border: `2px solid ${habit.color}`}}></div>
                       <span style={{flex:1, fontSize:'14px', textDecoration: isDone ? 'line-through' : 'none', color: isDone ? '#4A4A62' : '#E2E2EF'}}>
                                  {habit.name}
                        </span>
                        <span style={{fontSize:'12px', color: habit.color}}>
                                  {habit.streak}d
                          </span>
                    
                 </div>   
            )

})}
       
    </div>
  )
}
