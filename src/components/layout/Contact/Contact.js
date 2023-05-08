/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import { AiOutlineHome, AiOutlineMail, AiOutlineFieldTime } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";


const Contact = () => {
  return (
    <>
      <div className="contactContainer">
        <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
          <Button>Contact: mymailforabhi@gmail.com</Button>
        </a>
        <div className="mb-14 w-[80%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.6835390490614!2d108.2068545747977!3d16.029981084643833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142198deb0fa097%3A0xebcb448879c7ffd3!2zMWUgxJDhu5cgVGjDumMgVOG7i25oLCBLaHXDqiBUcnVuZywgQ-G6qW0gTOG7hywgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1682066377381!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 1 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
        <div className=" bg-slate-100 mt-5 flex gap-10 w-[80%] px-3 py-5 max-sm:flex-col">
          <div className="w-full flex flex-col ml-5 max-sm:ml-0">
            <h3 className="mb-5 text-left text-xl font-medium text-black max-sm:text-center">Contact</h3>
            <div className="w-full">
              <form className="">
                <input
                  type="text"
                  placeholder="name"
                  className="w-full text-sm px-8 py-2 rounded-[5px] outline-none border border-slate-400 mb-4"
                />
                <input
                  type="text"
                  placeholder="email"
                  className="w-full text-sm px-8 py-2 rounded-[5px] outline-none border border-slate-400 mb-4"
                />

                <input
                  type="text"
                  placeholder="Mobile number"
                  className="w-full text-sm px-8 py-2 rounded-[5px] outline-none border border-slate-400 mb-4"
                />

                <textarea
                  placeholder="Comment"
                  className="w-full text-sm px-8 py-2 rounded-[5px] outline-none border border-slate-400 mb-4"
                ></textarea>
                <button className="bg-red-400 px-6 py-2 rounded text-sm text-white">Submit</button>
              </form>
            </div>
          </div>
          <div className="w-full">
            <h3 className="mb-5 text-left text-xl font-medium text-black max-sm:text-center">Get in touch with us</h3>
            <div className="flex items-center gap-4 mb-3">
              <AiOutlineHome className="text-lg"/>
              <span className="text-sm text-center font-normal max-lg:text-left">DN: 1e/6 Đỗ Thúc Tịnh, Cẩm Lệ , Đà Nẵng</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <FiPhoneCall className="text-lg"/>
              <span className="text-sm text-center font-normal">+84 123456789</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <AiOutlineMail className="text-lg"/>
              <span className="text-sm text-center font-normal">lientanvung@gmail</span>
            </div>
            <div className="flex items-center gap-4">
              <AiOutlineFieldTime className="text-lg"/>
              <span className="text-sm text-center font-normal">Monday - Friday 10 AM - 8 PM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
