import { BiBot } from "react-icons/bi";

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
      <BiBot size={40} color="#4a044e" className="text-center" />
      <h1 className="text-5xl font-bold mb-12 text-center text-white bg-clip-text text-transparent rounded bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-800 via-sky-600 to-violet-800">
        SmartMailBot
      </h1>
      <div className="flex flex-col justify-between items-center">
        <svg
          className="animate-spin h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="blue"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="mt-4 font-semibold text-blue-600">Fetching and saving emails to Vector DB...</p>
      </div>
    </div>
  );
}
