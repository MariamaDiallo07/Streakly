import { NavLink } from "react-router-dom"
import { useEffect,useState } from "react"
import { supabase } from "../supabase"
import "./Sidebar.css"


export default function SideBar() {
    const [profile,setProfile] = useState(null)
    const [email,setEmail] = useState('')
    async function fetchProfile() {
        const {data: {user}} = await supabase.auth.getUser()
        const {data} = await supabase.from('profiles')
        .select('*')
        .eq('id',user.id)
        .single()
        setProfile(data)
    }
    useEffect(()=> {
        fetchProfile()
    },[])
    return(
        <div className="sidebar">
            <h2 style={{color: "#7C3AED"}}>Streakly</h2>
            <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px'}}>
                <div style={{width: '36px',height: '36px',borderRadius: '50%',backgroundColor: '#1E1040'
                    ,border: '1px solid #3D2080', display:'flex',alignItems:'center',justifyContent:'center',
                    color: '#A78BFA',fontSize: '14px',fontWeight: '500',flexShrink: 0
                }}>{profile?.username?.[0]?.toUpperCase()}</div>

                <div>
                    <div style={{fontSize:'13px', fontWeight:'500', color:'#E2E2EF'}}>
                        {profile?.username}

                    </div>
                    <div style={{fontSize:'11px', color:'#4A4A62'}}>
                         Level {profile?.level}
                    </div>
                </div>
            </div>
                <div style={{marginBottom:'20px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#4A4A62', marginBottom:'5px'}}>
                        <span>XP</span>
                        <span>{profile?.xp} / {Math.ceil((profile?.xp || 1)/500)*500} </span>
                    </div>
                    <div  style={{height:'3px', background:'#18182A', borderRadius:'2px'}}>
                        <div style={{height:'100%', width:`${((profile?.xp || 0) % 500) / 500 * 100}%`, background:'#7C3AED', borderRadius:'2px'}}></div>
                    </div>
                </div>
            <nav>
                <NavLink to="/today">Today</NavLink>
                <NavLink to="/allHabit">All Habit</NavLink>
                <NavLink to="/analytics">Analytics</NavLink>
                <NavLink to="/settings">Settings</NavLink>
            </nav>
        </div>
    )
}