import Header from "./Header";
import { useAuth } from "../hooks/useAuth";
import signInBg from "/signin_bg.jpg";

const Signin = () => {
  const {
    isSignInForm,
    errorMessage,
    loading,
    name,
    email,
    password,
    toggleForm,
    handleAuth,
  } = useAuth();

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover brightness-50"
          src={signInBg}
          alt="Background"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60" /> */}
      </div>

      <Header />

      <div className="flex justify-center items-center h-[70vh]">
        <form
          noValidate
          onSubmit={(e) => e.preventDefault()}
          className="bg-black/60 px-16 py-12 rounded-md space-y-6 w-[90%] max-w-md"
        >
          <h2 className="text-3xl font-bold text-left text-white">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          <div className="flex flex-col gap-8 py-4">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
              />
            )}
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-white/6 text-white placeholder-white/50 border border-gray-500 focus:border-2 focus:border-white focus:outline-none"
            />
          </div>
          
          {errorMessage && (
            <p className="text-red-500 text-sm -mt-2">{errorMessage}</p>
          )}

          {/* 🔹 Button with loader */}
          <button
            onClick={handleAuth}
            type="submit"
            disabled={loading}
            className="w-full h-10 flex justify-center items-center gap-2 bg-white hover:bg-gray-200 transition duration-300 text-black font-bold rounded cursor-pointer"

          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className=""
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className=""
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                
              </>
            ) : (
              isSignInForm ? "Sign In" : "Sign Up"
            )}
          </button>

          {isSignInForm ? (
            <div className="flex items-center justify-center text-sm text-white font-semibold gap-2">
              <a href="#" className="hover:underline">
                FORGOT PASSWORD?
              </a>
              <span>|</span>
              <a onClick={toggleForm} href="#" className="hover:underline">
                CREATE ACCOUNT
              </a>
            </div>
          ) : (
            <div className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <a
                onClick={toggleForm}
                href="#"
                className="font-semibold text-white hover:underline"
              >
                LOG IN
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
