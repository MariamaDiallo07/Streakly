import { useState } from "react"
import { supabase } from "../supabase"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"






export default function LoginPage() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isSignup,setIsSignup] = useState(false)
    const [name,setName] = useState("")
    const navigate = useNavigate()
    const [errorMsg,setErrorMsg] = useState('')

    // function handleLogin(email,password) {
    //     console.log(`Your email is: ${email}`)
    //     console.log(`Your password is: ${password}`)

    // }
    async function handleLogin() {
        if(isSignup) { 
            const {data,error} = await supabase.auth.signUp({email,password})
            if(error) {
                setErrorMsg(error.message)
            } else {
                console.log(data)
                await supabase.from('profiles').insert({
                    id: data.user.id,
                    username: name
                })
                navigate('/today')
            }
        } else {
            // so here the default behavior is login
            const {data, error} =  await supabase.auth.signInWithPassword({email,password})
            if(error) {
               setErrorMsg(error.message)

            } else {
                console.log(data)
                navigate('/today')

            }
        }
                

        
        
    }

    return (
        <div className="login-page" >
            <div className="card">
                <div style={{textAlign:'center', marginBottom:'8px'}}>
                    <h2 style={{
                        fontSize:'28px',
                        fontWeight:'500',
                        color:'#A78BFA',
                        letterSpacing:'-0.5px',
                        marginBottom:'4px'
                    }}>streakly</h2>
                    <p style={{fontSize:'12px', color:'#4A4A62'}}>Build habits. Track streaks. Level up.</p>
                </div>
                <h1>{ isSignup ? "Sign Up": "Login"}</h1>
                <input type="email" autoComplete="off"
                value={email}
                onChange={(e) => (setEmail(e.target.value))}
                placeholder="Enter your email..."
                />
                <input type="password"
                value={password}
                onChange={(e) => (setPassword(e.target.value))}
                placeholder="Enter your password..."
                />
                {errorMsg && <p style={{color: "#F87171", fontSize: "13px"}}>{errorMsg}</p>}
                {isSignup && <input type="text" value={name}
                 placeholder="Your name" onChange={(e) => setName(e.target.value)}
                 /> }
                <button onClick={()=> (handleLogin(email,password))}>Submit</button>
                <button onClick={() =>setIsSignup(!isSignup)}> {isSignup? "Already have an account? Log in " : "No account? Sign Up"
                } </button>
            </div> 
        </div>
    
    )
}