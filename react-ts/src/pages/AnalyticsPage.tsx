import React from "react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import DoughNut from "@/components/ui/doughnut";
import { CurrentUserMealsByDate } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

const AnalyticsPage = () => {
  //   const mealsByDate = useRecoilValue(CurrentUserMealsByDate);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>AnalyticsPage</h1>
      <React.Suspense fallback={<b>Loading...</b>}>
        <DatePickerWithRange />
      </React.Suspense>
      <DoughNut />
      <React.Suspense fallback={<b>Loading...</b>}>
        <CheatCounter />
      </React.Suspense>
    </div>
  );
};

const CheatCounter = () => {
  const mealsByDate = useRecoilValue(CurrentUserMealsByDate);
  return (
    <div>
      <h2>isCheat - {mealsByDate.isCheat}</h2>
      <h2>isNotCheat - {mealsByDate.isNotCheat}</h2>
    </div>
  );
};

export default AnalyticsPage;
