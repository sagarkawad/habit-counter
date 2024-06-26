import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserToken, CurrentUserName, SelectDate } from "@/atoms/atoms";
import { Calendar } from "@/components/ui/calendar";

const HomePage = () => {
  const [token, setToken] = useRecoilState(UserToken);
  const currentUser = useRecoilValue(CurrentUserName);
  const [date, setDate] = useRecoilState<Date | undefined>(SelectDate);
  const navigate = useNavigate();

  console.log(date);

  if (!token) {
    return <Navigate to="/login" />;
  }

  function signOutHandler() {
    localStorage.removeItem("authToken");
    setToken("");
  }

  function handleNavigator() {
    navigate("/meal");
  }

  return (
    <section className="p-4">
      <div className="flex justify-around mb-4">
        <h1>
          Welcome back, <b>{currentUser.username}</b>
        </h1>
        <Button onClick={signOutHandler}>Profile</Button>
      </div>
      <div className="flex flex-col justify-center items-center mb-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border mb-4"
        />
        <Button onClick={handleNavigator}>Add a meal</Button>
      </div>
      <MealContainer />
    </section>
  );
};

const MealContainer = () => {
  return <div className="flex justify-center">meal container</div>;
};

export default HomePage;
