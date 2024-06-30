import { SelectDate } from "@/atoms/atoms";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectedMeal } from "@/atoms/atoms";

const MealPage = () => {
  const [date, setDate] = useRecoilState(SelectDate);
  const stringifiedDate =
    date?.toLocaleDateString() || new Date().toLocaleDateString();

  return (
    <div>
      <h1>Add a meal for {stringifiedDate}</h1>
      <DropDown />
    </div>
  );
};

const DropDown = () => {
  const Meals = ["Breakfast", "Lunch", "Dinner", "Other"];
  const [selectedMeal, setSelectedMeal] = useRecoilState(SelectedMeal);

  return (
    <DropdownMenu>
      <h2>Add the details for : </h2>
      <DropdownMenuTrigger>{selectedMeal}</DropdownMenuTrigger>
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

export default MealPage;
