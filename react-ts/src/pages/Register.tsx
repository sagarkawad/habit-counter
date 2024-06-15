import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//import
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="text">UserName</Label>
        <Input type="text" id="text" placeholder="UserName" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="pass">Password</Label>
        <Input type="password" id="pass" placeholder="Password" />
      </div>
      <Button>Register</Button>
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
