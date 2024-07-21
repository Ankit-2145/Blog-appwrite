import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <button
      className="inline-block text-blue-500 px-4 py-2 duration-150 transition-all hover:bg-blue-500 hover:text-white border-2 border-blue-500 font-medium rounded-full"
      onClick={logoutHandler}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
