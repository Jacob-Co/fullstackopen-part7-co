import { useState } from 'react';

export const useField = (type) => {
  const [ value, setValue ] = useState('');

  const onChange = (event) => {
    setValue(event.target.value)
  };

  const onClick = (event) => {
    event.preventDefault();
    setValue('');
  }

  return {
    type,
    value,
    onChange,
    onClick
  };
};

