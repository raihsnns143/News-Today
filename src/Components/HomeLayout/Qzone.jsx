import React from "react";
import swimming from "../../assets/swimming.png";
import classImg from "../../assets/class.png";
import playGround from "../../assets/playground.png";
import backGround from "../../assets/bg.png";

const Qzone = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-md p-2">
        <h2 className="font-bold p-3 text-lg">QZone</h2>
        <div className="flex flex-col gap-2">
          <img src={swimming} alt="Swimming" className="rounded-md w-full" />
          <img src={classImg} alt="Class" className="rounded-md w-full" />
          <img src={playGround} alt="Playground" className="rounded-md w-full" />
        </div>
      </div>
      <img src={backGround} alt="Background" className="w-full rounded-md" />
    </div>
  );
};

export default Qzone;
