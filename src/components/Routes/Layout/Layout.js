import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useClass } from "../../Store/store";

const Layout = () =>{
    
    const classCss = useClass((state) => state.class);
    return(
        <div className="layout">
            <Header/>
            {classCss && <Sidebar/>}
            <Outlet/>
        </div>
    )
}

export default Layout;