import {
  SelectDate,
  UserToken,
  SelectedMeal,
  CurrentUserMeals,
  fetchTrigger,
} from "@/atoms/atoms";
import { useTransition } from "react";
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
  const stringifiedDate =
    date?.toLocaleDateString() || new Date().toLocaleDateString();
  const selectedMeal = useRecoilValue(SelectedMeal);
  const token = useRecoilValue(UserToken);

  //interfaces and types

  async function sendDataHandler() {
    if (selectedMeal === undefined) {
      alert("please select a meal");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/add",
      {
        title: selectedMeal,
        isCheat: false,
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
      <h1>Add a meal for {stringifiedDate}</h1>
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
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Is a Cheat Meal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Is not a Cheat Meal</Label>
      </div>
    </RadioGroup>
  );
};

export default MealPage;
