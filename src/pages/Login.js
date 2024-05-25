import React, { useEffect } from "react";
import bgCover from "../assets/images/bgCover.png";
import SSOButton from "../components/SSOButton";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import logo from "../assets/images/Vector.png";


const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      console.log("testtt", user);
      navigate("/home");
    }
  }, [user]);

  return (
    <div>
      <div
        className="flex justify-between flex-col md:flex-row md:h-screen py-4 md:py-0 md:relative"
        // style={{ height: "100vh" }}
      >
        <div className="flex-1 md:flex items-center justify-center mx-8 md:mx-0 ">
          <div className="md:absolute left-9 top-9">
            <img
              loading="lazy"
              src={logo}
              alt="cover"
              style={{ width: 40, height: 40 }}
            />
          </div>
          <div className="md:w-7/12">
            <h1 className="text-blue-600 font-bold text-2xl text-center">
              Login
            </h1>

            <p className="text-center">
              Organize your tasks efficiently with our intuitive todo app.
              Easily add, edit, and delete tasks to keep track of your daily
              activities. Filter tasks by categories like Completed, Favorite,
              and Deleted. The search function allows quick access to specific
              tasks, ensuring you never miss a detail. Stay productive and
              manage your workload seamlessly with our feature-rich todo app.
            </p>
            <div className="flex justify-center mt-8">
              {/* <SSOButton /> */}
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            loading="lazy"
            src={bgCover}
            alt="cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
