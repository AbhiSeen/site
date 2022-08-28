import React from 'react'
import DashHome from './DashHome/DashHome'
import '../dashboard/style/dark.scss'
import { useContext } from "react";
import { DarkModeContext } from "../dashboard/context/darkModeContext";
import List from './list/List'
import New from './New/New'
import Single from './single/Single'


function Dashboard({username}) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className='DashBoard'>
        <DashHome/>
    </div>
  )
}

export default Dashboard