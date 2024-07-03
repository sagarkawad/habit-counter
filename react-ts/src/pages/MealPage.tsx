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

const MealPage = () => {
  const [date, setDate] = useRecoilState(SelectDate);
  const selectedMeal = useRecoilValue(SelectedMeal);
  const token = useRecoilValue(UserToken);
  const isCheatMeal = useRecoilValue(CheatMeal);

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
          authorization: token,
        },
      }
    );
    alert("meal successfully added!");
  }

  return (
    <div>
      <h1>Add a meal for {date ? date.toLocaleDateString() : "---"}</h1>
      <DropDown />
      <RadioSection />
      <Button
        onClick={() => {
          sendDataHandler();
        }}
      >
        Add
      </Button>
    </div>
  );
};

const DropDown = () => {
  const Meals = ["Breakfast", "Lunch", "Dinner", "Other"];
  const [selectedMeal, setSelectedMeal] = useRecoilState(SelectedMeal);

  return (
    <DropdownMenu>
      <h2>Add the details for : </h2>
      <DropdownMenuTrigger>
        {selectedMeal || "Select a Meal"}
      </DropdownMenuTrigger>
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
  const handleRadioChange = (event) => {
    setIsCheatMeal(event.target.value === "option-one");
  };

  console.log("cm - ", isCheatMeal);

  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option-one"
          id="option-one"
          onChange={(e) => handleRadioChange(e)}
        />
        <Label htmlFor="option-one">Is a Cheat Meal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="option-two"
          id="option-two"
          onChange={(e) => handleRadioChange(e)}
        />
        <Label htmlFor="option-two">Is not a Cheat Meal</Label>
      </div>
    </RadioGroup>
  );
};

export default MealPage;
