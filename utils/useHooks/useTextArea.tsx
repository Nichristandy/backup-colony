import { useState, useEffect } from 'react';

type ValidatorFn<T> = (value: T) => string | null;

interface UseTextAreaProps<T> {
  initialValue?: T;
  validator?: ValidatorFn<T>;
}

interface UseTextAreaResult<T> {
  value: T;
  error: string | null;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reset: () => void;
}

export default function useTextArea<T>({
  initialValue = '' as T,
  validator = () => null,
}: UseTextAreaProps<T>): UseTextAreaResult<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [initialValueRef, setInitialValueRef] = useState<T>(initialValue);

  useEffect(() => {
    const error = validator(value);
    setError(error);
  }, [value, validator]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value as T);
  };

  const reset = () => {
    setValue(initialValueRef);
  };

  useEffect(() => {
    setInitialValueRef(initialValue);
    reset();
  }, [initialValue]);

  return {
    value,
    error,
    onChange,
    reset,
  };
}