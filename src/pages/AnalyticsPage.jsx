import { useEffect, useState } from "react"
import "./AnalyticsPage.css"
import { supabase } from "../supabase"


export default function AnalyticsPage () {

    const [habits,setHabits] = useState([])
    const [profile,setProfile] = useState(null)
    const [doneTodayCount,setDoneTodayCount] = useState(0)

    async function fetchHabits() {
        const {data: {user}} = await supabase.auth.getUser()
        const {data,error}  = await supabase.from('habits').select('*').eq('user_id',user.id)
        if(error) {
            console.log(error)
        } else {
            setHabits(data)
        }
        
    }
    async function fetchProfile() {
        const {data: {user}} = await supabase.auth.getUser()
        const {data} = await supabase.from('profiles')
        .select('*')
        .eq('id',user.id)
        .single()
        setProfile(data)
    }

    async function fetchTodayCount() {
       const {data: {user}} = await supabase.auth.getUser()
       const today = new Date().toISOString().split('T')[0]
       const {data} = await supabase
        .from('completions')
        .select('id')
        .eq('user_id', user.id)
        .eq('completion_date', today)
        setDoneTodayCount(data.length)

    }
    useEffect(() => {
        fetchHabits()
        fetchProfile()
        fetchTodayCount()
    },[])

    return (
<div className="analytics-page">
    <p style={{fontSize:'11px', color:'var(--text-muted)'}}>Your progress overview</p>
    <h2>Analytics</h2>

    {/* 4 stat cards */}
    <div className="stats-row">
        <div className="stat-card">
            <div className="stat-number" style={{color:'#A78BFA'}}>{habits.length}</div>
            <div className="stat-label">Total habits</div>
        </div>
        <div className="stat-card">
            <div className="stat-number" style={{color:'#2DD4BF'}}>
                {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0}d
            </div>
            <div className="stat-label">Best streak</div>
        </div>
        <div className="stat-card">
            <div className="stat-number" style={{color:'#4ADE80'}}>
                {doneTodayCount}/{habits.length}
            </div>
            <div className="stat-label">Done today</div>
        </div>
        <div className="stat-card">
            <div className="stat-number" style={{color:'#FB923C'}}>{profile?.xp || 0}</div>
            <div className="stat-label">XP earned</div>
        </div>
    </div>

    {/* Rate bars */}
    <div className="analytics-card">
        <div className="analytics-label">HABIT COMPLETION RATE</div>
        {habits.map(h => (
            <div key={h.id} style={{marginBottom:'14px'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'6px'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                        <div style={{width:'8px', height:'8px', borderRadius:'50%', background:h.color}}></div>
                        <span style={{color:'#E2E2EF'}}>{h.name}</span>
                    </div>
                    <span style={{color:h.color, fontWeight:'500'}}>{h.rate}%</span>
                </div>
                <div style={{height:'5px', background:'#18182A', borderRadius:'3px'}}>
                    <div style={{height:'100%', width:`${h.rate}%`, background:h.color, borderRadius:'3px'}}></div>
                </div>
            </div>
        ))}
    </div>

    {/* Streak leaderboard */}
    <div className="analytics-card">
        <div className="analytics-label">STREAK LEADERBOARD</div>
        {[...habits].sort((a,b) => b.streak - a.streak).map((h, i) => (
            <div key={h.id} style={{display:'flex', alignItems:'center', gap:'12px', padding:'10px 14px', background:'#0E0E1C', borderRadius:'8px', marginBottom:'8px'}}>
                <span style={{fontSize:'12px', color:'#4A4A62', width:'16px'}}>#{i+1}</span>
                <div style={{width:'8px', height:'8px', borderRadius:'50%', background:h.color}}></div>
                <span style={{fontSize:'13px', flex:1, color:'#E2E2EF'}}>{h.name}</span>
                <span style={{fontSize:'13px', fontWeight:'500', color:h.color}}>{h.streak}d</span>
            </div>
        ))}
    </div>
</div>
    )
}