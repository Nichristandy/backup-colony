import React from 'react'
import { ArrayInput, useInputArray } from '../../utils/useHooks/useHooks';
import { MdOutlinePerson } from 'react-icons/md';

type Props = {}

const MultiArrayForm = (props: Props) => {
  // useInput array
  const initialValue: ArrayInput = {
    name: ["ridho"],
    address: ['Jl Tanah kusir II no 9'],
    gender: ["Male"]
  };

  const validateInput = (input: ArrayInput): boolean => {
    // Custom validation logic
    // Return true if the input is valid, otherwise false
    // You can modify this based on your specific requirements
    console.log(input, 'input')
    return Object.values(input).every((arr) => arr.length > 0);
  };

  const {
    value,
    error,
    handleChange,
    handleArrayChange,
    validate,
    reset,
  } = useInputArray(initialValue, validateInput);

  console.log({ value, handleChange }, 'value arr')

  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <pre>{JSON.stringify(value)}</pre>
      {Object.entries(value).map(([key, array], arrayIndex) => (
        <div key={key}>
          <h3>{key}</h3>
          {array.map((element, index) => (
            <div key={index} className='mb-4 px-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>
                Name
              </label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  value={element}
                  onChange={(e) =>
                    handleArrayChange(key, index, e.target.value)
                  }
                />

                <span className='absolute right-4 top-4'>
                  <MdOutlinePerson className='w-6 h-6 fill-current text-gray-4 opacity-80' />
                </span>
                {error && <div className='mt-1 text-danger'>{error}</div>}
              </div>
            </div>
          ))}
          <button
            onClick={() => handleArrayChange(key, array.length, '')}
          >
            Add Element
          </button>
        </div>
      ))}
      {error && <div>{error}</div>}
      <button onClick={validate}>Validate</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default MultiArrayForm