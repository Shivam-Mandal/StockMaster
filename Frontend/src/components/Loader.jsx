import React from "react";
import loaderAnimation from "../assets/images/loader.json";
import Lottie from "lottie-react";

const Loader = ({ size = 150 }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <Lottie
        animationData={loaderAnimation}
        style={{ width: size, height: size }}
        loop
        autoplay
      />
    </div>
  );
};

export default Loader;
