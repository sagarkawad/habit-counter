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
  FetchTriggerUser,
  UserDetailsLogin,
} from "@/atoms/atoms";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Calendar } from "@/components/ui/calendar";

const HomePage = () => {
  if (!localStorage.getItem("authToken")) {
    return <Navigate to="/login" />;
    console.log(localStorage.getItem("authToken"));
  }

  const [date, setDate] = useRecoilState<Date | undefined>(SelectDate);
  const setFetchTrigger = useSetRecoilState(FetchTrigger);
  const setFetchTriggerForUser = useSetRecoilState(FetchTriggerUser);

  useEffect(() => {
    setFetchTrigger((prev) => prev + 1);
  }, [date]);

  useEffect(() => {
    setFetchTriggerForUser((prev) => prev + 1);
  }, []);

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
    <section className="px-4">
      <div className="flex justify-around mb-10  border-b border-slate-300 items-center py-2">
        <h1>
          Welcome back,{" "}
          <React.Suspense fallback={<b>Loading...</b>}>
            <CurrentUserComponent />
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

const CurrentUserComponent = () => {
  const currentUser = useRecoilValue(CurrentUserName);
  return <b> {currentUser ? currentUser.username : null} </b>;
};

const MealContainer = ({ children }: { children: any }) => {
  return (
    <div className="flex flex-col justify-center items-center">{children}</div>
  );
};

const AllMeals = () => {
  const meals = useRecoilValue(CurrentUserMeals);
  return (
    <Table>
      <TableCaption>A list of your meals.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Meal Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meals.map((el) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{el.title}</TableCell>
              <TableCell>{el.isCheat ? "Cheated" : "Not Cheated"}</TableCell>
              <TableCell className="text-right">
                {" "}
                {new Date(el.date).toLocaleDateString("en-CA")}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

    // <ol>
    //   {meals.map((el) => {
    //     return (
    //       <li key={el.id} className="flex">
    //         <p className="mr-4">{el.title}</p>
    //         <p className="mr-4">{el.isCheat ? "Cheated" : "Not Cheated"}</p>
    //         <p className="mr-4">
    //           {new Date(el.date).toLocaleDateString("en-CA")}
    //         </p>
    //       </li>
    //     );
    //   })}
    // </ol>
  );
};

export default HomePage;
