import React from "react";
import {
  DatePickerWithRange,
  StartDateRangeComponent,
} from "@/components/ui/start-date-range";
import DoughNut from "@/components/ui/doughnut";
import {
  CurrentUserMealsByDate,
  EndDateRange,
  StartDateRange,
} from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { EndDateRangeComponent } from "@/components/ui/end-date-range";

const AnalyticsPage = () => {
  //   const mealsByDate = useRecoilValue(CurrentUserMealsByDate);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>AnalyticsPage</h1>

      <StartDateRangeComponent />
      <EndDateRangeComponent />

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
