import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "./Layout.css"

export default function Layout() {
    return(
        <div className="layout">
            
            <SideBar/>
            <main className="main-content">
                <Outlet/>

            </main>
    
        </div>
    )
}