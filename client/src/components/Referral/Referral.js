import React, { useEffect, useRef, useState } from "react";
import "./Referral.css";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Referral({ delivered }) {
  const token = document.cookie.split("=")[1];
  const input = useRef("");
  const [referrals, setReferrals] = useState([]);
  let user = {};
  if (document.cookie) {
    if (token) {
      user=jwt_decode(token);
    }
  }
  // console.log(user)
  const addReferral = async (user,code) => {
    const response = await axios.post(
      `http://localhost:8000/addReferral`,
      {
        user,
        referralCode: code,
        delivered: delivered,
      } ,
      {withCredentials:true}
    );
    return response.data;
  };

  const getReferrals=async()=>{
    const response=await axios.get("http://localhost:8000/getReferrals",{withCredentials:true});
    // console.log(response.data.referrals)
    setReferrals(response.data.referrals);
  }

  useEffect(()=>{
    if(token)
      getReferrals();
  },[])
  return (
         !localStorage.getItem("accountUser")?.includes("guest") ? (<> <div id="heading">
            Hey <span>{localStorage.getItem("accountUser")}</span>, Your Referral Code is
            <h2>{user.fullName?.substring(0,5)?.toUpperCase()}#R20</h2>
          </div>
          <section id="referall-section"> 
            <label>Got referral code? Enter code here: </label>
            <input type="textbox" ref={input} onChange={(e)=>input.current.value=e.target.value}></input>
            <button
              type="submit"
              onClick={async (e) => {
                const response = await addReferral(
                  {user,referralCode:input.current.value}
                );
                // setReferrals(referrals);
                // console.log(response)
              }}
            > 
              Submit
            </button>
          </section>
          <section>
            <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
              Referrals
            </h1>
            <table className="referral-list">
              <tbody>
              <tr>
                <th>Referred By</th> 
              </tr>
              <tr>
                {referrals && referrals.map((val) => (
                  <td key={val.referreId}>{val.email}</td>
                ))}
              </tr>
              </tbody>
            </table>
          </section>
          </> ) : 
          <div id="heading" style={{"padding":"8rem"}}>
            Hey <span>Friend</span>, looks like you are not logged in 
            <h2>Please login to see your referrals</h2>
          </div>
  )
}

export default Referral;
