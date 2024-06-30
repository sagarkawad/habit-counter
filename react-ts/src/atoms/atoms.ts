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
  default: localStorage.getItem("authToken"),
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

export const CurrentUserName = selector({
  key: "CurrentUserName",
  get: async () => {
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
    } catch (error) {
      throw error; // Optionally, handle the error in a way that suits your application
    }
  },
});

export const SelectDate = atom<Date | undefined>({
  key: "SelectDate",
  default: new Date(),
});

export const SelectedMeal = atom({
  key: "SelectedMeal",
  default: "Select a Meal",
});
