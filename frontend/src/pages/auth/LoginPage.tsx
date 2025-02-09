import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loginApi } from "../../api/auth/auth.api";
import axios from "axios";
import useAuthStore from "../../stores/useAuthStore";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useAuthStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      toast.error("Username is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
  
    try {
      const response = await loginApi(username, password)
      setUserName("")
      setPassword("")
      setAuthUser(response.data.account);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred during signup.');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="h-[200px] w-screen flex flex-col items-center justify-end bg-white">
        <div className="h-screen w-screen flex flex-col bg-blue rounded-br-[100px] items-center justify-center">
          <h1 className="text-3xl text-white mb-0 font-extrabold">Login</h1>
        </div>
      </div>

      <div className="bg-blue">
        <div className="h-[80%] w-screen bg-white rounded-tl-[100px] flex flex-col items-center justify-center">
          <div>
            <form
              onSubmit={handleSubmit}
              className="h-fit w-96 bg-slate-50 p-10 rounded-md"
            >
              <div className="flex flex-col">
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="py-3 px-3 rounded-md"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="py-3 px-3 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue text-white mt-3 px-4 py-2 rounded-md hover:bg-pink hover:text-black"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="w-full flex items-center justify-center">
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default LoginPage;
