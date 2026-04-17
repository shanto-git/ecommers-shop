"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase.config";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        Swal.fire("Account Created!", `Welcome ${name}`, "success");
      } else {
        // লগইন করা
        const result = await signInWithEmailAndPassword(auth, email, password);
        Swal.fire("Logged In!", `Welcome back ${result.user.displayName || "User"}`, "success");
      }
      router.push("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        Swal.fire({
          title: "Logged In!",
          text: `Welcome ${result.user.displayName}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000b18] px-4">
      <div className="backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-800 max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          {isRegister ? "Join us to start shopping" : "Sign in to manage your cart"}
        </p>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-[#000b18] border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-sky-800 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <hr className="border-gray-700" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#001e3c] px-4 text-gray-500 text-sm italic">
            OR
          </span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-400 text-sm">
          {isRegister ? "Already have an account?" : "New to our shop?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 font-semibold hover:underline"
          >
            {isRegister ? "Login here" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}