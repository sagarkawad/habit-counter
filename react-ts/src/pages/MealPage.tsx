import { SelectDate } from "@/atoms/atoms";
import React from "react";
import { useRecoilState } from "recoil";

const MealPage = () => {
  const [date, setDate] = useRecoilState(SelectDate);
  const stringifiedDate =
    date?.toLocaleDateString() || new Date().toLocaleDateString();

  return (
    <div>
      <h1>Add a meal for {stringifiedDate}</h1>
    </div>
  );
};

export default MealPage;
