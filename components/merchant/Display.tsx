import React from 'react'

const Display = () => {
  
  
    return (
        <div className='w-full bg-white mt-2 p-2 rounded-lg'>
            <h1 className='font-bold text-xl'>Menu Display</h1>
            <div className='w-full flex flex-col mt-2 p-2 bg-slate-300 rounded-lg'>
                <h1 className='text-xl font-bold'>Product Name</h1>
                <div className='flex flex-row p-2 bg-white rounded-lg w-full'>
                    <img className='w-28 h-28' src='../../../images/no-image.jpeg'></img>
                    <div className='w-1/2 flex flex-col pl-2'>
                        <span className='text-slate-500 font-bold'>Category</span>
                        <p className='text-lg font-bold'>Product Name</p>
                        <p>-</p>
                    </div>
                    <div className='w-1/4 flex justify-end'>
                        <span>IDR 268</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Display