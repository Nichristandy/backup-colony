import React from 'react'
import { MdDelete, MdDragHandle } from 'react-icons/md';
import Cards from '../../Cards/Cards';

type Props = {
  index: any;
  item: any;
  loading?: boolean;
}

const ListVideo = ({ index, item, loading }: Props) => {
  return (
    <div className="w-full grid grid-cols-12 mb-4">
      <div className="w-full h-full flex">
        <button
          type='button'
          className='w-full flex justify-center items-center my-auto'
          onClick={() => console.log("detail")}
        >
          <MdDragHandle className='w-6 h-6' />
        </button>
      </div>
      <Cards className='w-full col-span-10 flex bg-white shadow-card rounded-xl overflow-hidden max-h-[150px]'>
        <img src="../../../image/product.jpg" alt="playlist" className='w-1/4 object-cover object-center h-full h-min-[100px] max-h-[150px]' />
        <div className='w-3/4 flex flex-col gap-2 items-start justify-between p-4 overflow-auto'>
          <h3 className='font-semibold text-lg'>{item?.title}</h3>
          <p className=''>{item?.content}</p>
          <div className='flex items-center gap-2 text-gray-5'>
            <p>33 videos</p>
            &#x2022;
            <p>333 likes</p>
            &#x2022;
            <p>6 years ago</p>
          </div>
        </div>
      </Cards>
      <div className="w-full h-full flex">
        <button
          type='button'
          className='w-full flex justify-center items-center my-auto'
          onClick={() => console.log("detail")}
        >
          <MdDelete className='text-gray-5 w-6 h-6' />
        </button>
      </div>
    </div>
  )
}

export default ListVideo;