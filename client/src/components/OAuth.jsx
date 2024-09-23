import { Button } from "flowbite-react";
import logo from "../assets/logo.png";
import { signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const profilePicture = resultsFromGoogle.user.photoURL;

      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: profilePicture,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorData.message}`
        );
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return (
    <div className="text-center">
      <p className="mb-2 text-lg">or</p>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        className="w-full"
        onClick={handleGoogleClick}
      >
        <img src={logo} alt="logo" className="w-5 mr-2 rounded-full" />
        Continue with Google
      </Button>
    </div>
  );
};

export default OAuth;