import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.data?.username || "",
    email: currentUser.data?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-auto max-w-sm p-6 m-10 mx-auto rounded-lg">
      <h1 className="mb-6 text-2xl font-semibold text-center">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.data.image}
          alt="img"
          className="w-20 mx-auto rounded-full "
        />
        <TextInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>

      <div className="flex justify-between mt-5 text-sm text-red-600 cursor-pointer ">
        <span className="hover:underline">Sign out</span>
        <span className="hover:underline">Delete Account</span>
      </div>
    </div>
  );
};

export default Profile;
