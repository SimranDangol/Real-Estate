import { Button, TextInput } from "flowbite-react";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen px-4 py-4 dark:text-white">
      <div className="w-full max-w-sm p-6 mx-auto mt-4 bg-white rounded-lg dark:bg-gray-800 md:mt-10 sm:ml-12 md:ml-24 lg:mx-auto">
        <h1 className="mb-2 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <TextInput
              id="email"
              placeholder="Email"
              type="email"
              icon={AiOutlineMail}
              iconposition="left"
            />
          </div>
          <div>
            <TextInput
              id="password"
              placeholder="Password"
              type="password"
              icon={FaLock}
              iconposition="left"
            />
          </div>
          <div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full focus:outline-none focus:ring-0"
            >
              Sign In
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
