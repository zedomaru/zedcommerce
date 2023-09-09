import { useEffect } from 'react';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  // signInWithGoogleRedirect,
  auth,
} from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log({ userDocRef });
  };

  const redirectResult = async () => {
    try {
      const response = await getRedirectResult(auth);
      if (response) {
        await createUserDocumentFromAuth(response.user);
        console.log(response);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    redirectResult();
  }, []);

  return (
    <div>
      <div>SignIn</div>;
      <button onClick={logGoogleUser}>Sign In with Google</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
