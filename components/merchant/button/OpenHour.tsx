import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import ReactDatePicker from "react-datepicker";
import TimeInput from "../form/TimeInput";

const OpenHours = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openPopup}
        className="p-2 rounded-lg bg-[#5F59F7] flex flex-row justify-center items-center text-white"
      >
        <span>New Open Hours</span>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          className="w-4 h-4 ml-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg flex items-center justify-center">
          <div className="absolute inset-0 z-30 bg-black opacity-70"></div>
          <div className="relative mx-auto w-full inline-block text-left align-middle transition-all transform max-w-sm z-50 opacity-100 scale-100">
            <div className="bg-white flex flex-col rounded-lg z-50 p-4">
                <div className="flex flex-row justify-between items-center border-b-2 border-b-slate-300 pb-2">
                    <h1 className="text-xl">Add item</h1>
                    <svg
                        onClick={closePopUp}
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        className="text-gray-500 w-5 h-5 cursor-pointer"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
              </div>
              <div className="flex mt-2 space-y-1 flex-col w-full">
                <label className="font-bold">Schedule Code</label>
                 <input
                  placeholder="Schedule Code"
                  className="w-full border-2 border-slate-300 p-2 rounded-md"
                  ></input>
              </div>

              <div className="flex mt-2 space-y-1 flex-col w-full">
                  <label className="font-bold">Schedule Name</label>
                    <input
                      placeholder="Schedule Name"
                      className="w-full border-2 border-slate-300 p-2 rounded-md"
                    ></input>
              </div>
              <div className="flex mt-2 space-y-1 flex-col w-full">
                    <label className="font-bold">Description</label>
                    <textarea placeholder="Description" className="border-slate-300 border-2 rounded-md p-2" rows={5} cols={30}>
                    </textarea>
                    <p className="text-slate-400 text-xs">0/400 characters</p>
            </div>
            <div className="flex mt-2 space-y-1 flex-col w-full">
                    <label className="font-bold">Schedule Type</label>
                    <div className="flex flex-row w-full items-center p-2 justify-between rounded-md border-slate-300 border-2">
                      <div className="w-5/6 flex justify-start items-center text-slate-300">
                        <p>-- Select Schedule Type--</p>
                      </div>
                      <button
                        onClick={() => setIsCategory(!isCategory)}
                        className="flex w-1/6 justify-center items-center border-l-2 border-slate-300"
                      >
                        {!isCategory ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="transform transition-all duration-75 text-gray-600 w-5 h-5 -rotate-90"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="transform transition-all duration-75 text-gray-600 w-5 h-5 rotate-0"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <Transition
                      show={isCategory}
                      enter="transition ease-out duration-100 transform"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75 transform"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      {(ref) => (
                        <div
                          ref={ref}
                          className="bg-white shadow-md inset-0 flex flex-col rounded-lg pt-2 px-2 pb-3 space-y-1 sm:px-3"
                        >
                          <button className="cursor-pointer text-left w-full hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base">
                            Day
                          </button>
                          <button className="cursor-pointer text-left w-full hover:bg-[#5F59F7] text-black hover:text-white block px-3 py-2 rounded-md text-base">
                            Date
                          </button>
                        </div>
                      )}
                    </Transition>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col space-y-1 mt-2 w-1/2 px-1">
                      <label className="font-bold">Open Time</label>
                      <div className="flex flex-row rounded-md w-full border-2 border-slate-300 items-center">
                        <div className="w-1/4">
                        <svg 
                          stroke="currentColor" 
                          fill="currentColor" 
                          stroke-width="0" 
                          viewBox="0 0 24 24" 
                          className="w-5 h-5 mx-2 cursor-pointer" 
                          height="1em" 
                          width="1em" 
                          xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M-618-568H782v3600H-618zM0 0h24v24H0z"></path>
                            <path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path>
                        </svg>
                        </div>
                        <div className="w-3/4">
                        <TimeInput selectedTime={selectedTime} onChange={handleTimeChange} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 mt-2 w-1/2 px-1">
                      <label className="font-bold">Close Time</label>
                      <div className="flex flex-row rounded-md w-full border-2 border-slate-300 items-center">
                        <div className="w-1/4">
                        <svg 
                          stroke="currentColor" 
                          fill="currentColor" 
                          stroke-width="0" 
                          viewBox="0 0 24 24" 
                          className="w-5 h-5 mx-2 cursor-pointer" 
                          height="1em" 
                          width="1em" 
                          xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M-618-568H782v3600H-618zM0 0h24v24H0z"></path>
                            <path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path>
                        </svg>
                        </div>
                        <div className="w-3/4">
                        <TimeInput selectedTime={selectedTime} onChange={handleTimeChange} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-2 flex-row justify-center items-center bg-[#5F59F7] p-2 rounded-lg text-white">
                   <p>SAVE</p>
                  </div>



            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenHours;
