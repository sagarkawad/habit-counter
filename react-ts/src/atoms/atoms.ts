import { atom, selector } from "recoil";
import axios from "axios";

//atom
export const UserDetails = atom({
  key: "UserDetails",
  default: { username: "", email: "", password: "" },
});

export const UserDetailsLogin = atom({
  key: "UserDetailsLogin",
  default: { username: "", password: "" },
});

export const UserToken = atom({
  key: "UserToken",
  default: `${
    localStorage.getItem("authToken")
      ? `Bearer ${localStorage.getItem("authToken")}`
      : null
  }`,
});

interface User {
  data: {
    user: {
      username: string;
      email: string;
    };
  };
  // add other properties as needed
}

interface Meal {
  data: {
    msg: [
      {
        id: number;
        title: string;
        isCheat: boolean;
        date: Date;
        userId: number;
      }
    ];
  };
}

export const FetchTrigger = atom({
  key: "FetchTrigger",
  default: 0,
});

export const FetchTriggerUser = atom({
  key: "FetchTriggerUser",
  default: 0,
});

export const CurrentUserName = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
    const trigger = get(FetchTriggerUser);
    try {
      const response: User = await axios.post(
        "http://localhost:3000/me",
        null,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data.user;
      // return undefined;
    } catch (error) {
      return undefined;
      //throw error; // Optionally, handle the error in a way that suits your application
    }
  },
});

export const CurrentUserMeals = selector({
  key: "CurrentUserMeals",
  get: async ({ get }) => {
    const trigger = get(FetchTrigger);

    try {
      const response: Meal = await axios.post(
        "http://localhost:3000/meals",
        {
          date: get(SelectDate),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response);
      return response.data.msg;
    } catch (error) {
      throw error; // Optionally, handle the error in a way that suits your application
    }
  },
});

export const StartDateRange = atom<Date | undefined>({
  key: "StartDateRange",
  default: undefined,
});

export const EndDateRange = atom<Date | undefined>({
  key: "EndDateRange",
  default: undefined,
});

export const CurrentUserMealsByDate = selector({
  key: "CurrentUserMealsByDate",
  get: async ({ get }) => {
    try {
      const response: Meal = await axios.post(
        "http://localhost:3000/mealsbydate",
        {
          startDate: get(StartDateRange),
          endDate: get(EndDateRange),
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response);
      console.log(get(StartDateRange));
      console.log(get(EndDateRange));
      let isCheat = 0;
      let isNotCheat = 0;
      response.data.msg.map((el) => {
        if (el.isCheat) {
          isCheat++;
        } else {
          isNotCheat++;
        }
      });
      return {
        isCheat,
        isNotCheat,
      };
    } catch (error) {
      throw error; // Optionally, handle the error in a way that suits your application
    }
  },
});

export const SelectDate = atom<Date | undefined>({
  key: "SelectDate",
  default: undefined,
});

export const SelectedMeal = atom({
  key: "SelectedMeal",
  default: undefined,
});

export const CheatMeal = atom({
  key: "CheatMeal",
  default: true,
});
