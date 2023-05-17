import React from "react";
import hotline from "../../../images/hotline.png";
import chat from "../../../images/chat.png";
import chatZalo from "../../../images/chat-zalo.png";
import {Link} from 'react-router-dom'

const vehicle = [
  {
    id: 1,
    icon: hotline,
    content: "Hotline: 0123456789",
    link: 'https://www.messenger.com/',
  },
  {
    id: 2,
    icon: chat,
    content: "Hotline: 0123456789",
    link: 'https://www.messenger.com/',
  },
  {
    id: 3,
    icon: chatZalo,
    content: "Hotline: 0123456789",
    link: 'https://www.messenger.com/',
  },
];

const Vehicle = () => {
  return (
    <>
      <div className="bottom-28 fixed right-10 !z-50 w-[200px]">
        {vehicle.length > 0 &&
          vehicle.map((item) => {
            return (
              <Link to={item.link}
                key={item.id}
                className={` mb-2 relative flex flex-row-reverse items-center justify-center gap-2`}
              >
                <div
                  className={`${
                    item.id === 1 ? "animate-scale" : ""
                  } hiddenContent relative flex items-center justify-center rounded-full w-11 h-[45px] bg-[#1197f6] `}
                >
                  <img
                    src={`${item.icon}`}
                    alt=""
                    className="w-1/2 h-1/2 object-cover"
                  ></img>
                </div>
                <div className="iconPhone opacity-0">
                  <span className="text-[10px] text-center mx-auto bg-[#1197f6] py-2 px-5 ">
                    {item.content}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Vehicle;
