import React, { type ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/useDataContext";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
}
interface LoginInfo {
  email: string;
  password: string;
}

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
};
const loginInitialValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [account, setAccount] = useState<"login" | "register">("login");
  const [registerInfo, setRegisterInfo] =
    useState<RegisterInfo>(registerInitialValues);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(loginInitialValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingR, setIsLoadingR] = useState<boolean>(false);

  const navigate = useNavigate();
  const { loginUser, registerUser } = useDataContext();

  const toggleAccount = () => {
    setAccount((prev) => (prev === "login" ? "register" : "login"));
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async (): Promise<void> => {
    try {
      setIsLoadingR(true);
      await registerUser(registerInfo.name,registerInfo.email,registerInfo.password)
    } catch (error) {
      console.log("error while registering", error);
    } finally {
      setIsLoadingR(false);
    }
  };

  const login = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await loginUser(loginInfo.email,loginInfo.password);
    } catch (error) {
      console.log("error while logging in", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center px-4 text-white">
      <h1 className="text-3xl font-bold mb-1">SmashPost</h1>
      <p className="text-gray-300 text-center mb-6">
        Connect • Share • Inspire
      </p>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow mb-6"
        onClick={() => navigate("/")}
      >
        Go to the App
      </button>

      <div className="w-full max-w-md bg-[#2a2a2a] p-6 rounded-xl shadow-md border border-gray-700">
        <h3 className="text-xl font-semibold text-center mb-4">
          {account === "login" ? "Login" : "Register"}
        </h3>

        {account === "login" ? (
          <>
            <input
              placeholder="Email"
              name="email"
              value={loginInfo.email}
              onChange={onInputChange}
              className="w-full px-3 py-2 mb-3 bg-[#3a3a3a] text-white border border-gray-600 rounded focus:outline-none"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={onInputChange}
              className="w-full px-3 py-2 mb-4 bg-[#3a3a3a] text-white border border-gray-600 rounded focus:outline-none"
            />

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              onClick={login}
              disabled={!loginInfo.email || !loginInfo.password}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center mt-4 text-gray-400">OR</p>

            <button
              className="text-blue-400 w-full mt-2"
              onClick={toggleAccount}
            >
              New user? Register here
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Name"
              name="name"
              value={registerInfo.name}
              onChange={onValueChange}
              className="w-full px-3 py-2 mb-3 bg-[#3a3a3a] text-white border border-gray-600 rounded focus:outline-none"
            />
            <input
              placeholder="Email"
              name="email"
              value={registerInfo.email}
              onChange={onValueChange}
              className="w-full px-3 py-2 mb-3 bg-[#3a3a3a] text-white border border-gray-600 rounded focus:outline-none"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={registerInfo.password}
              onChange={onValueChange}
              className="w-full px-3 py-2 mb-4 bg-[#3a3a3a] text-white border border-gray-600 rounded focus:outline-none"
            />

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              onClick={register}
              disabled={
                !registerInfo.name ||
                !registerInfo.email ||
                !registerInfo.password
              }
            >
              {isLoadingR ? "Registering..." : "Register"}
            </button>

            <p className="text-center mt-4 text-gray-400">OR</p>

            <button
              className="text-blue-400 w-full mt-2"
              onClick={toggleAccount}
            >
              Already have an account? Login here
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
