import React from 'react'
import DashHome from './DashHome/DashHome'
import { useContext } from "react";
import { DarkModeContext } from "../dashboard/context/darkModeContext";


function Dashboard() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className='DashBoard'>
        <DashHome/>
    </div>
  )
}

export default Dashboard