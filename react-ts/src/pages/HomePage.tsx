import React from "react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserToken } from "@/atoms/atoms";

const HomePage = () => {
  const [token, setToken] = useRecoilState(UserToken);

  if (token) {
    return <Navigate to="/login" />;
  }

  function signOutHandler() {
    localStorage.removeItem("authToken");
    setToken("");
  }

  return (
    <div>
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
