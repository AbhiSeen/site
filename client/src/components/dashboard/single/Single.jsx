import "./single.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router";
import { getUserInfo } from "../../service/api";
import { useEffect } from "react";
import { useState } from "react";
import UserTransactionsList from "../table/UserTransactionsList";

const Single = () => {
  const {userId}=useParams();
  const [userInfo,setUserInfo]=useState({});

  const getUserfromId=async()=>{
    const response=await getUserInfo(userId);
    setUserInfo(response);
  }
  
  useEffect(()=>{
    getUserfromId();
  },[])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1664721749~exp=1664722349~hmac=c5c27d41b7e17595070d7be511728c4dd734a2a7f22ff887845fe34ecae5b479"
                alt="profile-icon"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userInfo.fullName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userInfo.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{userInfo.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <UserTransactionsList/>
        </div>
      </div>
    </div>
  );
};

export default Single;