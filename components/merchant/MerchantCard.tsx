import React from 'react'

const MerchantCard = () => {
  return (
<div className="w-full shadow-md p-4 pb-4 bg-white rounded-lg flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/4 px-4 ml-3">
                        <img src="../../image/logo-icon.svg" className="rounded-full w-[200px] lg:w-[180px] max-w-[250px] h-[200px] lg:h-[180px] object-cover object-center m-auto"/>
                    </div>
                    <div className="flex flex-col mt-2 lg:mt-0 w-full lg:w-3/4 space-y-2 lg:space-y-4">
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-bold text-[#5F59F7] text-2xl">S-02</span>
                            <div className="rounded-lg p-2 bg-[#5F59F7] text-white">
                                <h1>Active</h1>
                            </div>
                        </div>
                        <div className="flex flex-row items-center uppercase">
                            <svg 
                                stroke="currentColor" 
                                fill="currentColor" 
                                stroke-width="0" 
                                viewBox="0 0 24 24" 
                                className="w-4 h-4" 
                                height="1em" 
                                width="1em" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"></path>
                            </svg>
                            <h1 className="pl-2 font-medium">Graha Sumartadinata</h1>
                        </div>
                        <div className="flex flex-row uppercase items-center">
                            <svg 
                                stroke="currentColor" 
                                fill="currentColor" 
                                stroke-width="0" 
                                viewBox="0 0 24 24" 
                                className="w-4 h-4" 
                                height="1em" 
                                width="1em" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M1 11v10h6v-5h2v5h6V11L8 6l-7 5zm12 8h-2v-5H5v5H3v-6.97l5-3.57 5 3.57V19zM17 7h2v2h-2zM17 11h2v2h-2zM17 15h2v2h-2z"></path>
                                    <path d="M10 3v1.97l2 1.43V5h9v14h-4v2h6V3z"></path>
                            </svg>
                            <p className="pl-2 font-medium">marygold</p>
                        </div>
                        <span className="font-bold text-2xl">COLONY</span>
                        <div className="flex flex-row lg:justify-start items-center">
                            <div className="flex text-[#5F59F7] mb-3 items-center">
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    version="1.2" 
                                    baseProfile="tiny" 
                                    viewBox="0 0 24 24" 
                                    className="w-6 h-6" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path>
                                </svg>
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    version="1.2" 
                                    baseProfile="tiny" 
                                    viewBox="0 0 24 24" 
                                    className="w-6 h-6" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path>
                                </svg>
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    version="1.2" 
                                    baseProfile="tiny" 
                                    viewBox="0 0 24 24" 
                                    className="w-6 h-6" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path>
                                </svg>
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    version="1.2" 
                                    baseProfile="tiny" 
                                    viewBox="0 0 24 24" 
                                    className="w-6 h-6" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path>
                                </svg>
                                <svg 
                                    stroke="currentColor" 
                                    fill="currentColor" 
                                    stroke-width="0" 
                                    version="1.2" 
                                    baseProfile="tiny" 
                                    viewBox="0 0 24 24" 
                                    className="w-6 h-6" 
                                    height="1em" 
                                    width="1em" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1l-1.9 4.3-4.7.5h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"></path>
                                </svg>
                            </div>
                            <div className="text-gray-500 text-sm mb-3 text-left lg:ml-3">
                                <span>14 / 5 from </span>
                                <span>2 users</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
  )
}

export default MerchantCard