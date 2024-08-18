import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
    
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
      try {
        const Provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, Provider);

        const res = await fetch("/back-end/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        const data = await res.json();
        if (data.success === false) {
          // Handle any errors returned from the backend
          dispatch(signInFailure(data.message));
          return;
        }

        dispatch(signInSuccess(data));

        if (data.isAdmin) {
          navigate("/admin"); // Redirect to admin page if user is admin
        } else {
          navigate("/"); // Redirect to homepage if not admin
        }
      } catch (error) {
        console.log("Could not sign in with Google", error);
        dispatch(signInFailure(error.message)); // Dispatch failure if there's an error
      }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-90'>Continue with google</button>
  )
}
