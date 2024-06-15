import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//import
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserDetails } from "@/atoms/atoms";

//import libraries
import axios from "axios";

const Register = () => {
  const [user, setUser] = useRecoilState(UserDetails);
  const navigate = useNavigate();

  async function createUser() {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: user.email,
        username: user.username,
        password: user.password,
      });
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          value={user.email}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="text">Username</Label>
        <Input
          type="text"
          id="text"
          placeholder="Username"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, username: e.target.value }))
          }
          value={user.username}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="pass">Password</Label>
        <Input
          type="password"
          id="pass"
          placeholder="Password"
          onChange={(e) =>
            setUser((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          value={user.password}
        />
      </div>
      <Button onClick={createUser}>Register</Button>
      <p className="mt-14">
        Already Registered?{" "}
        <Link to="/login" className="text-gray-700">
          Click here to Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
