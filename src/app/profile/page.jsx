"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/PrivateRoute"; // আগে তৈরি করা গার্ড

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      Swal.fire("Logged Out", "See you again!", "success");
      router.push("/");
    });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md rounded-3xl p-8 border border-gray-800 shadow-2xl relative">
          
          <button 
            onClick={() => router.back()}
            className="absolute top-6 left-6 text-gray-400 hover:text-white transition"
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-blue-500 p-1 object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold mt-4 text-white">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-400 mt-1">{user?.email}</p>

            <div className="w-full grid grid-cols-2 gap-4 mt-8 border-t border-gray-800 pt-8">
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase">Account Status</p>
                <p className="text-green-500 font-bold">Active</p>
              </div>
              <div className="text-center border-l border-gray-800">
                <p className="text-gray-500 text-xs uppercase">Verified</p>
                <p className="text-blue-500 font-bold">Yes</p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="mt-10 w-full flex items-center justify-center gap-2 bg-red-600/10 text-red-500 border border-red-600/20 py-3 rounded-xl hover:bg-red-600 hover:text-white transition duration-300 font-semibold"
            >
              <AiOutlineLogout size={20} /> Logout from Device
            </button>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfilePage;