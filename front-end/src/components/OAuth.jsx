import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice"; // Ensure you import signInFailure
import { useNavigate } from "react-router-dom";

export default function OAuth({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/back-end/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          role: role, // Pass the selected role
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        // Handle any errors returned from the backend
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));

      // Navigate to the sign-in page after successful Google sign-up
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-90">
      Continue with Google
    </button>
  );
}
