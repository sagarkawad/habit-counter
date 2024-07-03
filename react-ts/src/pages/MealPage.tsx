import {
  SelectDate,
  UserToken,
  SelectedMeal,
  CurrentUserMeals,
  fetchTrigger,
  CheatMeal,
} from "@/atoms/atoms";
import { useState, useTransition } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MealPage = () => {
  const [date, setDate] = useRecoilState(SelectDate);
  const selectedMeal = useRecoilValue(SelectedMeal);
  const isCheatMeal = useRecoilValue(CheatMeal);

  const navigate = useNavigate();

  console.log(isCheatMeal);

  //interfaces and types

  async function sendDataHandler() {
    if (date === undefined) {
      alert("go to homepage and select a date");
      return;
    }

    if (selectedMeal === undefined) {
      alert("please select a meal");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/add",
      {
        title: selectedMeal,
        isCheat: isCheatMeal,
        //@ts-ignore
        date: new Date(date),
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    alert("meal successfully added!");
  }

  function navigationHandler() {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="bold text-xl mb-4">
        Add a meal for {date ? date.toLocaleDateString() : "---"}
      </h1>
      <DropDown />
      <RadioSection />
      <div className="flex ">
        <Button
          onClick={() => {
            sendDataHandler();
          }}
          className="w-40 mr-4"
        >
          Add
        </Button>
        <Button onClick={navigationHandler} className="w-40">
          Go to HomePage
        </Button>
      </div>
    </div>
  );
};

const DropDown = () => {
  const Meals = ["Breakfast", "Lunch", "Dinner", "Other"];
  const [selectedMeal, setSelectedMeal] = useRecoilState(SelectedMeal);

  return (
    <DropdownMenu>
      <div className="flex">
        <h2>Add the details for - </h2>{" "}
        <DropdownMenuTrigger>
          {selectedMeal || "Select a Meal"}
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        {Meals.map((el) => (
          //@ts-ignore
          <DropdownMenuItem
            key={el}
            onClick={() => {
              //@ts-ignore
              setSelectedMeal(el);
            }}
          >
            {el}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RadioSection = () => {
  const [isCheatMeal, setIsCheatMeal] = useRecoilState(CheatMeal);

  //@ts-ignore
  const handleRadioChange = (e) => {
    setIsCheatMeal(e === "option-one" ? true : false);
    console.log("val: ", e);
    console.log("inside handle radio change");
    console.log("cm - ", isCheatMeal);
  };

  return (
    <RadioGroup
      defaultValue="option-one"
      onValueChange={(e) => handleRadioChange(e)}
      className="my-8"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">is a Cheat Meal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">is not a Cheat Meal</Label>
      </div>
    </RadioGroup>
  );
};

export default MealPage;
