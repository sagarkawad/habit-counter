import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserToken, CurrentUserName } from "@/atoms/atoms";

const HomePage = () => {
  const [token, setToken] = useRecoilState(UserToken);
  const currentUser = useRecoilValue(CurrentUserName);

  if (!token) {
    return <Navigate to="/login" />;
  }

  function signOutHandler() {
    localStorage.removeItem("authToken");
    setToken("");
  }

  return (
    <div>
      <h1>
        <b>Welcome back, {currentUser.username}</b>
      </h1>
      <Calendar />
      <Button>Add a meal</Button>
      <Button onClick={signOutHandler}>Sign Out</Button>
    </div>
  );
};

const Calendar = () => {
  return <h1>Calendar</h1>;
};

export default HomePage;
