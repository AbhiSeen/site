import React, { useEffect, useRef, useState } from "react";
import "./Referral.css";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Referral({ delivered }) {
  const token = localStorage.getItem("token");
  const input = useRef("");
  const [referrals, setReferrals] = useState([]);
  let user = {};
  axios.defaults.headers={
    Authorization: `Bearer ${token}`,
  }
  if (token) {
    user = jwt_decode(token);
  }
  // console.log(user)
  const addReferral = async (code) => {
    const response = await axios.post(
      `http://localhost:8000/addReferral`,
      {
        referralCode: code,
        delivered: delivered,
      } 
    );
    return response.data;
  };

  const getReferrals=async()=>{
    const response=await axios.get("http://localhost:8000/getReferrals");
    // console.log(response.data.referrals)
    setReferrals(response.data.referrals);
  }

  useEffect(()=>{
    if(token)
      getReferrals();
  },[])
  return (
    <>
      {user && user.username ? (
        <>
          <div id="heading">
            Hey <span>{user && user.username}</span>, Your Referral Code is
            <h2>#{user.username.toUpperCase()}20</h2>
          </div>
          <section id="referall-section">
            <label>Got referral code? Enter code here: </label>
            <input type="textbox" ref={input}></input>
            <button
              type="submit"
              onClick={async (e) => {
                const response = await addReferral(
                  input.current.value && input.current.value.toUpperCase()
                );
                // setReferrals(referrals);
                console.log(response)
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
                  <td key={val.referreId}>{val.name}</td>
                ))}
              </tr>
              </tbody>
            </table>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Referral;
