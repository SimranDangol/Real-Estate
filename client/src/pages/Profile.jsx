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
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

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

  // const handleShowListings = async () => {
  //   try {
  //     setShowListingsError(false);
  //     const res = await fetch(`/api/user/listings/${currentUser.data?._id}`);
  //     const data = await res.json();
  //     if (data.success === false) {
  //       setShowListingsError(true);
  //       return;
  //     }

  //     setUserListings(data);
  //   } catch (error) {
  //     setShowListingsError(true);
  //   }
  // };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      console.log("Current User ID:", currentUser.data._id);

      const res = await fetch(`/api/v1/user/listings/${currentUser.data._id}`);
      const data = await res.json();

      console.log("Response Data:", data);

      if (Array.isArray(data)) {
        // Update the state with the fetched listings
        setUserListings(data);
        console.log("User Listings:", data);
      } else {
        console.error("Invalid response data:", data);
        setShowListingsError(true);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      setShowListingsError(true);
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
        <Link
          to="/create-listing"
          className="p-2 text-center rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:text-white "
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5 text-sm text-red-600 cursor-pointer ">
        <span className="hover:underline" onClick={handleSignout}>
          Sign out
        </span>
        <span className="hover:underline" onClick={handledelete}>
          Delete Account
        </span>
      </div>
      <button className="w-full text-green-700" onClick={handleShowListings}>
        Show listings
      </button>

      {userListings.length > 0 ? (
        <div className="flex flex-col gap-4 mt-6">
          <h1 className="text-2xl font-semibold text-center">Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center justify-between gap-4 p-3 border rounded-lg"
            >
              {/* Listing Image */}
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="object-contain w-16 h-16"
                />
              </Link>

              {/* Listing Name */}
              <Link
                className="flex-1 font-semibold text-black truncate hover:underline"
                to={`/listing/${listing._id}`}
              >
                {listing.name}
              </Link>

              {/* Buttons in a single line with image and name */}
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 uppercase border rounded-md border-slate-700 hover:bg-red-100">
                  Delete
                </button>
                <button className="px-2 py-1 uppercase border rounded-md border-slate-700 hover:bg-red-100">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center">No listings to show.</p>
      )}
      {showListingsError && (
        <p className="mt-4 text-center text-red-500">
          Failed to load listings.
        </p>
      )}
    </div>
  );
};

export default Profile;
