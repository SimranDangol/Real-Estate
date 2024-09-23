import { Button, TextInput, Spinner } from "flowbite-react";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate that all fields are filled
  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) return;
    dispatch(signInStart()); // loading is called before the request

    try {
      const res = await axios.post("/api/v1/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(signInSuccess(res.data));
      toast.success(res.data.message || "Login successful");
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      dispatch(signInFailure()); // Only dispatch failure in case of error
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-4 dark:text-white">
      <div className="w-full max-w-sm p-6 mx-auto mt-4 bg-white rounded-lg dark:bg-gray-800 md:mt-10 sm:ml-12 md:ml-24 lg:mx-auto">
        <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign in
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <TextInput
              id="email"
              placeholder="Email"
              type="email"
              icon={AiOutlineMail}
              iconposition="left"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextInput
              id="password"
              placeholder="Password"
              type="password"
              icon={FaLock}
              iconposition="left"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full focus:outline-none focus:ring-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading..</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Do not have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline dark:text-purple-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
