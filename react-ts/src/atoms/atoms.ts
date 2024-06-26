import { atom } from "recoil";

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
