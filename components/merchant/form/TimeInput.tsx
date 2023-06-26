import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeInputProps {
  selectedTime: Date | null;
  onChange: (time: Date | null) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ selectedTime, onChange }) => {
  const handleTimeChange = (time: Date | null) => {
    onChange(time);
  };

  return (
    <DatePicker
      selected={selectedTime}
      onChange={handleTimeChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="h:mm aa"
      placeholderText="Select time"
      className='w-full'
    />
  );
};

export default TimeInput;