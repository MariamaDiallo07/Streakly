import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";



export default function ProtectedRoute({children}) {
    const [user,setUser]  = useState(null)
    const [loading,setLoading]  = useState(true)
 

    async function fetchUser() {
        const {data} = await supabase.auth.getSession()
        setUser(data.session)
        setLoading(false)
        
    }
    useEffect(()=> {
        fetchUser()
    },[])
    if(loading) return <p>Loading...</p>
    if(!user) return <Navigate to="/login"/>
    return children


}