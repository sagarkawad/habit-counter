import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  UserToken,
  CurrentUserName,
  SelectDate,
  CurrentUserMeals,
  FetchTrigger,
  UserDetailsLogin,
} from "@/atoms/atoms";
import { Calendar } from "@/components/ui/calendar";

const HomePage = () => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" />;
    console.log(localStorage.getItem("authToken"));
  }

  const setFetchTrigger = useSetRecoilState(FetchTrigger);

  useEffect(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  const currentUser = useRecoilValue(CurrentUserName);
  const [date, setDate] = useRecoilState<Date | undefined>(SelectDate);
  const navigate = useNavigate();

  console.log(date);

  function signOutHandler() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  function handleNavigator() {
    if (date === undefined) {
      alert("please select a date");
      return;
    }
    navigate("/meal");
  }

  return (
    <section className="p-4">
      <div className="flex justify-around mb-4">
        <h1>
          Welcome back,{" "}
          <React.Suspense fallback={<p>Loading...</p>}>
            <b> {currentUser ? currentUser.username : null} </b>
          </React.Suspense>
        </h1>

        <Button onClick={signOutHandler}>Log Out</Button>
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
      <React.Suspense fallback={<MealContainer>Loading...</MealContainer>}>
        <MealContainer>
          <AllMeals />
        </MealContainer>
      </React.Suspense>
    </section>
  );
};

const MealContainer = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>meal container</h1>

      {children}
    </div>
  );
};

const AllMeals = () => {
  const meals = useRecoilValue(CurrentUserMeals);
  return (
    <ol>
      {meals.map((el) => {
        return (
          <li key={el.id} className="flex">
            <p className="mr-4">{el.title}</p>
            <p className="mr-4">{el.isCheat ? "yes" : "no"}</p>
            <p className="mr-4">
              {new Date(el.date).toLocaleDateString("en-CA")}
            </p>
          </li>
        );
      })}
    </ol>
  );
};

export default HomePage;
