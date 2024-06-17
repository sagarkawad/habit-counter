import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

//import
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserDetailsLogin } from "@/atoms/atoms";

const Login = () => {
  const [userLogin, setUserLogin] = useRecoilState(UserDetailsLogin);
  const navigate = useNavigate();

  async function setUserLoginHandler() {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: userLogin.username,
        password: userLogin.password,
      });
      console.log(response);
      console.log(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      navigate("/");
    } catch (err) {
      console.log("err: ", err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="email">UserName</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email / UserName"
          onChange={(e) => {
            setUserLogin((prev) => {
              return { ...prev, username: e.target.value };
            });
          }}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="pass">Password</Label>
        <Input
          type="password"
          id="pass"
          placeholder="Password"
          onChange={(e) => {
            setUserLogin((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </div>
      <Button onClick={setUserLoginHandler}>Login</Button>
      <p className="mt-14">
        Not Registered?{" "}
        <Link to="/register" className="text-gray-700">
          Click here to Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
