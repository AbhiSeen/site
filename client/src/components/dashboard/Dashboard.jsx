import React from 'react'
import DashHome from './DashHome/DashHome'
import '../dashboard/style/dark.scss'
import { useContext } from "react";
import { DarkModeContext } from "../dashboard/context/darkModeContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import List from './list/List'
import New from './New/New'
import Single from './single/Single'


function Dashboard({username}) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className='DashBoard'>
      <Routes>
        <Route index element={<DashHome/>}/>
        <Route path="/users">
          <Route index element={<List/>}/>
          <Route path=":userId" element={<Single/>}/>
          </Route>
      </Routes>
     {/* <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<DashHome/>}/>
          <Route path="users">
          <Route index element={<List/>}/>
          <Route path=":userId" element={<Single/>}/>
          </Route>
          </Route>
      </Routes>
        
      </BrowserRouter> */}
    </div>
  )
}

export default Dashboard