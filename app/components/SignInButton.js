// components/SignInButton.js
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();
    if(session){
        console.log(session);
    }
  return session ? (
    <>
      <p>Signed in</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signIn("google")}>Sign in with Google</button>
  );
}
