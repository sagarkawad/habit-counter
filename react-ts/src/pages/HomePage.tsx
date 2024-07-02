import React, { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  UserToken,
  CurrentUserName,
  SelectDate,
  CurrentUserMeals,
  FetchTrigger,
} from "@/atoms/atoms";
import { Calendar } from "@/components/ui/calendar";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = () => {
  const [token, setToken] = useRecoilState(UserToken);
  const currentUser = useRecoilValue(CurrentUserName);
  const [date, setDate] = useRecoilState<Date | undefined>(SelectDate);
  const setFetchTrigger = useSetRecoilState(FetchTrigger);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  console.log(date);

  useEffect(() => {
    startTransition(() => {
      setFetchTrigger((prev) => prev + 1);
    });
  }, []);

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
    <ErrorBoundary
      fallback={
        <p className="p-4">Something went wrong! Try refreshing the Page...</p>
      }
    >
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
        {isPending ? "loading" : "up-to-date"}
        <React.Suspense fallback={<MealContainer>Loading...</MealContainer>}>
          <MealContainer>
            <AllMeals />
          </MealContainer>
        </React.Suspense>
      </section>
    </ErrorBoundary>
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
            <p className="mr-4">{el.date.toLocaleString()}</p>
          </li>
        );
      })}
    </ol>
  );
};

export default HomePage;
