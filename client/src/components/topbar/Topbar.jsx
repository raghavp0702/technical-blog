import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import axios from "axios";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:5000/images/";

  const logoutHandler = async () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <h3 className="topLeftTitle">
          <Link className="link" to="/">
            Technical Blog
          </Link>
        </h3>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
              <Link className="link" to={`/${user._id}/favourites`}>
                {user && "FAVOURITES"}
              </Link>
            </li>
          <li className="topListItem">ABOUT-US</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem" onClick={logoutHandler}>
            {" "}
            {user && "LOGOUT"}
          </li>

        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={
                user.profilePic
                  ? PF + user.profilePic
                  : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
            
          </ul>
        )}
      </div>
    </div>
  );
}
