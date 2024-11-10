// components/SignInButton.js
import { signIn, signOut, useSession } from "next-auth/react";
import { IoExitOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }
  return session ? (
    <>
      <button
        className="group [transform:translateZ(0)] px-4 py-2 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-sky-600 before:top-1/2 before:left-1/2 before:h-8 before:w-10 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
        onClick={() => signOut()}
      >
        <span className="flex flex-row items-center justify-between text-sm font-semi-bold relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
          <IoExitOutline className="mr-4" />
          Sign out
        </span>
      </button>
    </>
  ) : (
    <button
      className="group [transform:translateZ(0)] px-4 py-2 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-slate-900 before:top-1/2 before:left-1/2 before:h-8 before:w-10 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
      onClick={() => signIn("google")}
    >
      <span className="flex flex-row items-center justify-between text-sm font-semi-bold relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
        <FcGoogle size={30} className="mr-4" />
        Sign in with Google
      </span>
    </button>
  );
}
