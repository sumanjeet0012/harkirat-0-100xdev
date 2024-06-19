import { SignupInput } from "@sumanjeet0012/medium-common";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const responce = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`
      , postInputs);
      console.log(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
      const jwt = responce.data;
      localStorage.setItem("token", jwt.jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="w-7/12">
          <div className="text-3xl font-extrabold">Create an account</div>
          <div>
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <Link
              className="pl-2 underline"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your Name"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="Enter your Username"
              onChange={(e) =>
                setPostInputs({ ...postInputs, username: e.target.value })
              }
            />
            <LabelledInput
              label="Password"
              placeholder="Enter your Password"
              type="password"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />
            <button
              type="button" 
              onClick={sendRequest}
              className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
