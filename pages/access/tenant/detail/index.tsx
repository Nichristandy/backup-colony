import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../../components/Layouts/DefaultLayouts";
import { MdMuseum } from "react-icons/md";
import SidebarComponent from "../../../../components/Layouts/Sidebar/SidebarComponent";
import { BillingProps } from "../../../../components/tables/components/billingData";
import { menuBM } from "../../../../utils/routes";
import Menus from "../../../../components/Layouts/Sidebar/Menus/Menus";
import { menuTenant } from "../../../../utils/routes";
import Tabs from "../../../../components/Layouts/Tabs";

type Props = {
  pageProps: any;
};

const detail = ({ pageProps }: Props) => {
  const { token, access, firebaseToken } = pageProps;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const billingHistory = {
    name: "billing history",
  };

  return (
    <>
    <header>
          <div className="flex flex-row justify-between bg-[#111F2C] px-8">
            <div className="flex flex-row items-center w-1/2">

                <div className="flex flex-row text-white items-center w-2/12">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" className="mr-2" xmlns="http://www.w3.org/2000/svg">
	                    <path d="M6.87843 4.34565C7.8566 1.6837 10.2832 0.394013 12.9481 0.0636506C16.0017 -0.311183 19.325 0.991205 21.1309 3.56422C21.4945 4.07882 21.8645 4.86025 22.0589 5.4638C21.9711 5.45109 21.877 5.45745 21.7955 5.4638C21.4945 5.48286 21.1998 5.55274 20.9051 5.62898C20.6167 5.70522 20.3345 5.79416 20.0586 5.90216C19.7827 6.01017 19.5131 6.13088 19.256 6.27064C19.024 6.39771 18.8046 6.53748 18.5914 6.68995C18.1086 7.04573 17.6696 7.46503 17.2746 7.92246C16.936 8.31 16.6288 8.71024 16.309 9.11049C15.9767 9.53615 15.6255 9.9491 15.2242 10.3112C14.4216 11.0418 13.4372 11.4866 12.365 11.5882C8.52752 11.9694 5.51777 8.01775 6.87843 4.34565Z" fill="#2620A9" />
	                    <path d="M24.316 6.96949C26.9433 7.96693 28.2161 10.4192 28.5422 13.1193C28.9121 16.2133 27.6267 19.5804 25.0872 21.4101C24.5794 21.7786 23.8081 22.1534 23.2124 22.3504C23.225 22.2614 23.2187 22.1661 23.2124 22.0836C23.1936 21.7786 23.1246 21.48 23.0494 21.1814C22.9742 20.8892 22.8864 20.6033 22.7798 20.3237C22.6732 20.0442 22.554 19.771 22.4161 19.5105C22.2907 19.2755 22.1527 19.0531 22.0023 18.8371C21.6511 18.3479 21.2373 17.9032 20.7858 17.503C20.4033 17.1599 20.0083 16.8486 19.6133 16.5246C19.1932 16.1879 18.7856 15.8321 18.4282 15.4255C17.7071 14.6123 17.2682 13.6149 17.1678 12.5285C16.7916 8.64036 20.6855 5.59086 24.316 6.96949Z" fill="#5F59F7" />
	                    <path d="M21.7263 24.6375C20.7419 27.2994 18.3215 28.5891 15.6567 28.9195C12.603 29.2943 9.27975 27.9855 7.4739 25.4125C7.11023 24.8979 6.74028 24.1165 6.5459 23.513C6.63368 23.5257 6.72774 23.5193 6.80925 23.513C7.11023 23.4939 7.40493 23.424 7.69964 23.3478C7.98807 23.2715 8.27023 23.1826 8.54613 23.0746C8.82202 22.9666 9.09165 22.8459 9.34873 22.7061C9.58073 22.579 9.80019 22.4393 10.0134 22.2868C10.4962 21.931 10.9351 21.5117 11.3301 21.0543C11.6687 20.6668 11.976 20.2665 12.2958 19.8663C12.6281 19.4406 12.9792 19.0277 13.3805 18.6655C14.1831 17.9349 15.1676 17.4902 16.2398 17.3885C20.071 17.0137 23.0807 20.959 21.7263 24.6375Z" fill="#44C2FD" />
	                    <path d="M4.28877 22.0137C1.66151 21.0163 0.388636 18.5576 0.06258 15.8639C-0.307368 12.7699 0.978046 9.40277 3.51752 7.57307C4.02542 7.20459 4.79667 6.82976 5.39235 6.63281C5.37981 6.72176 5.38608 6.81705 5.39235 6.89964C5.41116 7.20459 5.48013 7.50319 5.55537 7.80179C5.63062 8.09403 5.7184 8.37992 5.825 8.65946C5.93159 8.93899 6.05073 9.21218 6.18868 9.47266C6.31408 9.70772 6.45203 9.93008 6.60252 10.1461C6.95365 10.6353 7.36749 11.08 7.81896 11.4802C8.20145 11.8233 8.59648 12.1346 8.99151 12.4586C9.41162 12.7953 9.81919 13.1511 10.1766 13.5577C10.8977 14.3709 11.3366 15.3683 11.4369 16.4547C11.8131 20.3365 7.91301 23.386 4.28877 22.0137Z" fill="#6592FD" />
                    </svg>
                    <h1 className="font-bold">Colony.</h1>
                </div>

                <ul className="flex flex-row text-white space-x-4 mx-3 w-8/12">
                        <li className="h-full py-4 hover:border-b-4 hover:border-b-[#5F59F7]">
                            billing history
                        </li>

                    <li className="h-full py-4 hover:border-b-4 hover:border-b-[#5F59F7]">Transaction history</li>
                </ul>

            </div>

            
            <div className="flex flex-row items-center text-white space-x-4">
              <img src="../../image/user/user-01.png" className="w-8 h-8"/>
              <p>John doe</p>
            </div>
          </div>
        </header>
      <main className="h-[98vh] bg-[#1C2D3D]">
        <div className="flex flex-row">
            {/* sidebar */}
            <div className="w-1/4 bg-[#1C2D3D] px-8 py-4">
                {/* component unit owner */}
                <div className="flex flex-col space-y-2 ">
                    <h1 className="text-white text-xl font-bold">Unit Owner</h1>
                    <div className="flex flex-row bg-white p-4 rounded-lg items-center">
                        <div className="w-1/4 h-auto rounded-full flex justify-center">
                            <svg width="48" height="48" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
	                            <path d="M6.87843 4.34565C7.8566 1.6837 10.2832 0.394013 12.9481 0.0636506C16.0017 -0.311183 19.325 0.991205 21.1309 3.56422C21.4945 4.07882 21.8645 4.86025 22.0589 5.4638C21.9711 5.45109 21.877 5.45745 21.7955 5.4638C21.4945 5.48286 21.1998 5.55274 20.9051 5.62898C20.6167 5.70522 20.3345 5.79416 20.0586 5.90216C19.7827 6.01017 19.5131 6.13088 19.256 6.27064C19.024 6.39771 18.8046 6.53748 18.5914 6.68995C18.1086 7.04573 17.6696 7.46503 17.2746 7.92246C16.936 8.31 16.6288 8.71024 16.309 9.11049C15.9767 9.53615 15.6255 9.9491 15.2242 10.3112C14.4216 11.0418 13.4372 11.4866 12.365 11.5882C8.52752 11.9694 5.51777 8.01775 6.87843 4.34565Z" fill="#2620A9" />
	                            <path d="M24.316 6.96949C26.9433 7.96693 28.2161 10.4192 28.5422 13.1193C28.9121 16.2133 27.6267 19.5804 25.0872 21.4101C24.5794 21.7786 23.8081 22.1534 23.2124 22.3504C23.225 22.2614 23.2187 22.1661 23.2124 22.0836C23.1936 21.7786 23.1246 21.48 23.0494 21.1814C22.9742 20.8892 22.8864 20.6033 22.7798 20.3237C22.6732 20.0442 22.554 19.771 22.4161 19.5105C22.2907 19.2755 22.1527 19.0531 22.0023 18.8371C21.6511 18.3479 21.2373 17.9032 20.7858 17.503C20.4033 17.1599 20.0083 16.8486 19.6133 16.5246C19.1932 16.1879 18.7856 15.8321 18.4282 15.4255C17.7071 14.6123 17.2682 13.6149 17.1678 12.5285C16.7916 8.64036 20.6855 5.59086 24.316 6.96949Z" fill="#5F59F7" />
	                            <path d="M21.7263 24.6375C20.7419 27.2994 18.3215 28.5891 15.6567 28.9195C12.603 29.2943 9.27975 27.9855 7.4739 25.4125C7.11023 24.8979 6.74028 24.1165 6.5459 23.513C6.63368 23.5257 6.72774 23.5193 6.80925 23.513C7.11023 23.4939 7.40493 23.424 7.69964 23.3478C7.98807 23.2715 8.27023 23.1826 8.54613 23.0746C8.82202 22.9666 9.09165 22.8459 9.34873 22.7061C9.58073 22.579 9.80019 22.4393 10.0134 22.2868C10.4962 21.931 10.9351 21.5117 11.3301 21.0543C11.6687 20.6668 11.976 20.2665 12.2958 19.8663C12.6281 19.4406 12.9792 19.0277 13.3805 18.6655C14.1831 17.9349 15.1676 17.4902 16.2398 17.3885C20.071 17.0137 23.0807 20.959 21.7263 24.6375Z" fill="#44C2FD" />
	                            <path d="M4.28877 22.0137C1.66151 21.0163 0.388636 18.5576 0.06258 15.8639C-0.307368 12.7699 0.978046 9.40277 3.51752 7.57307C4.02542 7.20459 4.79667 6.82976 5.39235 6.63281C5.37981 6.72176 5.38608 6.81705 5.39235 6.89964C5.41116 7.20459 5.48013 7.50319 5.55537 7.80179C5.63062 8.09403 5.7184 8.37992 5.825 8.65946C5.93159 8.93899 6.05073 9.21218 6.18868 9.47266C6.31408 9.70772 6.45203 9.93008 6.60252 10.1461C6.95365 10.6353 7.36749 11.08 7.81896 11.4802C8.20145 11.8233 8.59648 12.1346 8.99151 12.4586C9.41162 12.7953 9.81919 13.1511 10.1766 13.5577C10.8977 14.3709 11.3366 15.3683 11.4369 16.4547C11.8131 20.3365 7.91301 23.386 4.28877 22.0137Z" fill="#6592FD" />
                            </svg>
                        </div>
                        
                        <div className="flex flex-col w-3/4 leading-5">
                            <h2 className="font-bold">Tech Colony</h2>
                            <p>colonyutopia@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* occupant */}
                <div className="flex flex-col mt-4 space-y-2">
                    <h1 className="text-white text-xl font-bold">Occupant</h1>
                    {/* button new occupant */}
                    <button className="flex flex-row p-4 justify-between items-center rounded-lg text-white bg-[#5F59F7]">
                        <h1 className="font-bold">Add An Occupant</h1>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
                        </svg>
                    </button>
                </div>

                {/* media */}
                <div className="flex flex-col mt-4 space-y-2">
                    <div className="flex flex-row justify-between ">
                        <h1 className="font-bold text-xl text-white">Media</h1>
                        <a className="text-white opacity-60">View All</a>
                    </div>

                    <div className="flex flex-col bg-white p-4 rounded-lg">
                        {/* gambar */}
                        <div className="rounded-lg mx-auto w-full h-40 bg-slate-400">
                        </div>
                        <button className="flex mt-3 flex-row justify-center bg-white border-2 border-black rounded-lg p-4 items-center">
                            <p>Preview</p>
                        </button>
                    </div>

                    <button className="flex flex-row p-4 mt-3 justify-between items-center rounded-lg text-white bg-[#5F59F7]">
                        <h1 className="font-bold">Upload Video</h1>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="white"/>
                        </svg>
                    </button>


                </div>

            </div>
        {/* menu billing history */}
        <div className="flex flex-col h-[98vh] w-3/4 rounded-tl-[30px] pt-5 px-4 bg-white ">
          {/* search bar */}
          <div className="flex flex-row items-center h-[40px] w-3/4 p-2 border-2 mt-2 border-[#DAE3EB] rounded-lg">
            <svg
              width="18"
              height="18"
              className="mr-2"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33332 7.33326H7.80666L7.61999 7.15326C8.41999 6.21993 8.83332 4.9466 8.60666 3.59326C8.29332 1.73993 6.74666 0.259929 4.87999 0.0332621C2.05999 -0.313405 -0.313344 2.05993 0.0333232 4.87993C0.25999 6.74659 1.73999 8.29326 3.59332 8.6066C4.94666 8.83326 6.21999 8.41993 7.15332 7.61993L7.33332 7.80659V8.33326L10.1667 11.1666C10.44 11.4399 10.8867 11.4399 11.16 11.1666C11.4333 10.8933 11.4333 10.4466 11.16 10.1733L8.33332 7.33326ZM4.33332 7.33326C2.67332 7.33326 1.33332 5.99326 1.33332 4.33326C1.33332 2.67326 2.67332 1.33326 4.33332 1.33326C5.99332 1.33326 7.33332 2.67326 7.33332 4.33326C7.33332 5.99326 5.99332 7.33326 4.33332 7.33326Z"
                fill="#9DACBA"
              />
            </svg>
            <input
              type="text"
              className="w-3/4 border-0 align-top"
              placeholder="search"
            ></input>
          </div>
          <table className="mt-2 w-3/4">
              <tr className="border-b-2 border-[#DAE3EB]">
                <th className="py-4 px-8">Payment Purpose</th>
                <th className="py-4 px-8">Total Payment</th>
                <th className="py-4 px-8">Due Date</th>
                <th className="py-4 px-8">Payment Date</th>
              </tr>
          </table>
        </div>
        </div>
      </main>
    </>
  );
};

export default detail;
