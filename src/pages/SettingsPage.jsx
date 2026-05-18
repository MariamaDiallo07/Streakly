import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { supabase } from "../supabase"
import './SettingsPage.css'

export default function SettingsPage() {
    const navigate =useNavigate()
    const [profile,setProfile] = useState(null)
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    async function fetchUser() {
        const {data: {user}} = await supabase.auth.getUser()
        const {data} = await supabase
        .from('profiles')
        .select('*')
        .eq('id',user.id)
        .single()
        setProfile(data)
        setEmail(user.email)
    }
useEffect(() => {
    fetchUser()
},[])
    async function handleUpdateNewPassword() {
        await supabase.auth.updateUser({ password: newPassword })
        setNewPassword('')
    }

     async function handleAction() {
        await supabase.auth.signOut()
        navigate("/login")
    }
    return (
<div className="settings-page">
    <p style={{fontSize:'11px', color:'var(--text-muted)', marginBottom:'4px'}}>Manage your account</p>
    <h2 style={{marginBottom:'24px'}}>Settings</h2>

    {/* Profile section */}
    <div className="settings-card">
        <div className="settings-section-label">PROFILE</div>
        {profile && (
            <div>
                <div style={{display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px'}}>
                    <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'#1E1040', border:'1px solid #3D2080', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:'500', color:'#A78BFA'}}>
                        {profile.username?.[0]?.toUpperCase()}
                    </div>
                    <div>
                        <div style={{fontSize:'15px', fontWeight:'500', color:'#E2E2EF'}}>{profile.username}</div>
                        <div style={{fontSize:'12px', color:'#4A4A62'}}>{email}</div>
                    </div>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px'}}>
                    <div>
                        <div style={{fontSize:'11px', color:'#4A4A62', marginBottom:'6px'}}>Full name</div>
                        <input type="text" value={profile.username} readOnly className="settings-input"/>
                    </div>
                    <div>
                        <div style={{fontSize:'11px', color:'#4A4A62', marginBottom:'6px'}}>Email</div>
                        <input type="email" value={email} readOnly className="settings-input"/>
                    </div>
                </div>
            </div>
        )}
    </div>

    {/* Security section */}
    <div className="settings-card">
        <div className="settings-section-label">SECURITY</div>
        <div style={{marginBottom:'12px'}}>
            <div style={{fontSize:'11px', color:'#4A4A62', marginBottom:'6px'}}>New password</div>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 characters" className="settings-input"/>
        </div>
        <button onClick={handleUpdateNewPassword} className="settings-btn">Update password</button>
    </div>

    {/* Danger zone */}
    <div className="settings-card" style={{borderColor:'#2A1818'}}>
        <div className="settings-section-label" style={{color:'#4A3A3A'}}>ACCOUNT</div>
        <button onClick={handleAction} className="logout-btn">Log out</button>
    </div>
</div>
        
    )
}