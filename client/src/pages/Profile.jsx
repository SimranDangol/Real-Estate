import { useSelector, useDispatch } from "react-redux";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser.data?.username || "",
    email: currentUser.data?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.patch("/api/v1/user/update", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateUserSuccess(res.data)); // Ensure image is part of res.data.data
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      dispatch(updateUserFailure());
    }
  };

  const handledelete = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await axios.delete("/api/v1/user/delete", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message || "Delete Successfull");
        dispatch(deleteUserSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      dispatch(deleteUserFailure());
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await axios.post("/api/v1/auth/logout", formData, {});
      if (res.data.success) {
        toast.success(res.data.message || "Sign out Successfull");
        dispatch(signOutUserSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign out  failed");
      dispatch(signOutUserFailure());
    }
  };

  return (
    <div className="w-full h-auto max-w-sm p-6 m-10 mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-semibold text-center">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <img
          src={currentUser.data.image}
          alt="img"
          className="w-20 mx-auto rounded-full "
        />
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" /> <span className="pl-3">Loading..</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        <Link to='/create-listing' className="p-2 text-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:text-white ">Create Listing</Link>
      </form>

      <div className="flex justify-between mt-5 text-sm text-red-600 cursor-pointer ">
        <span className="hover:underline" onClick={handleSignout}>
          Sign out
        </span>
        <span className="hover:underline" onClick={handledelete}>
          Delete Account
        </span>
      </div>
    </div>
  );
};

export default Profile;
