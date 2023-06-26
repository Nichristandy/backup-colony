import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Select, { GroupBase, OptionsOrGroups, Props as SelectProps } from 'react-select';
import OptionTypeBase from "react-select";
import { CountryData } from 'react-phone-input-2';
import { ReactDatePickerProps } from 'react-datepicker';
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager';

type Validator<T> = (value: T) => string | undefined;

// input
interface UseInputResult {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface UseInputOptions {
    defaultValue?: string;
    validate?: (value: string) => string | null;
}

const useInput = ({
    defaultValue = '',
    validate,
}: UseInputOptions = {}): UseInputResult => {
    const [value, setValue] = useState<string>(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const validationError = validate?.(newValue);
        setError(validationError as SetStateAction<string | null>);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue);
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// text-area
interface UseTextAreaResult {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    reset: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface UseTextAreaOptions {
    defaultValue?: string;
    validate?: (value: string) => string | null;
}

const useTextArea = ({
    defaultValue = '',
    validate,
}: UseTextAreaOptions = {}): UseTextAreaResult => {
    const [value, setValue] = useState<string>(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        const validationError = validate?.(newValue);
        setError(validationError as SetStateAction<string | null>);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue);
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// checkbox
interface UseCheckboxResult {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface UseCheckboxOptions {
    defaultChecked?: boolean;
    validate?: (checked: boolean) => string | null;
}

const useCheckbox = ({
    defaultChecked = false,
    validate,
}: UseCheckboxOptions = {}): UseCheckboxResult => {
    const [checked, setChecked] = useState<boolean>(defaultChecked);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        const validationError = validate?.(newChecked);
        setError(validationError as SetStateAction<string | null>);
        setChecked(newChecked);
    };

    const reset = () => {
        setError(null);
        setChecked(defaultChecked);
    };

    return {
        checked,
        setChecked,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// radio - input
interface UseRadioInputResult {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface UseRadioInputOptions {
    defaultValue?: string;
    validate?: (value: string) => string | null;
}

const useRadioInput = (
    options: string[],
    { defaultValue = '', validate }: UseRadioInputOptions = {}
): UseRadioInputResult => {
    const [value, setValue] = useState<string>(defaultValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const validationError = validate?.(newValue);
        setError(validationError as SetStateAction<string | null>);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue);
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// react-select useHook
interface UseSelectResult<T extends OptionTypeBase> {
    value: any;
    setValue: Dispatch<SetStateAction<StateManagedSelect | null>>;
    options: T[] | OptionsOrGroups<T, GroupBase<T>>;
    error: string | null;
    onChange: (newValue: T | null) => void;
    reset: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
}

interface UseSelectOptions<T extends OptionTypeBase> extends SelectProps<T> {
    defaultValue?: T;
    validate?: (value: T | null) => string | null;
}

const useSelect = <T extends OptionTypeBase>({
    options,
    defaultValue,
    validate,
    ...selectProps
}: UseSelectOptions<T>): UseSelectResult<T> => {
    const [value, setValue] = useState<StateManagedSelect | null>(defaultValue ?? null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (newValue: T | null) => {
        const validationError = validate?.(newValue);
        setError(validationError as SetStateAction<string | null>);
        setValue(newValue);
    };

    const reset = () => {
        setError(null);
        setValue(defaultValue ?? null);
    };

    return {
        value,
        setValue,
        // @ts-ignore
        options,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// usePhoneInput
interface UsePhoneInputResult {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
    onChange: (
        value: string,
        data?: {} | CountryData,
        event?: React.ChangeEvent<HTMLInputElement>,
        formattedValue?: string,
        enableSearch?: boolean,
        containerClass?: string,
        inputClass?: string,
        searchClass?: string,
        dropdownClass?: string,
        buttonClass?: string
    ) => void;
    reset: () => void;
}

interface UsePhoneInputOptions {
    defaultCountry?: string;
    validate?: (value: string) => string | null;
}

const usePhoneInput = (
    { defaultCountry = 'id', validate }: UsePhoneInputOptions = {}
): UsePhoneInputResult => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // const handleChange = (value: string, country?: string, event?: React.ChangeEvent<HTMLInputElement>, formattedValue?: string) => {
    const handleChange = (value: string, data?: {} | CountryData, event?: React.ChangeEvent<HTMLInputElement>, formattedValue?: string, enableSearch?: boolean, containerClass?: string, inputClass?: string, searchClass?: string, dropdownClass?: string, buttonClass?: string) => {
        const validationError = validate?.(value);
        setError(validationError as SetStateAction<string | null>);
        setValue(value);
    };

    const reset = () => {
        setError(null);
        setValue('');
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// useDatePicker
interface UseDatePickerResult {
    value: Date | null;
    setValue: Dispatch<SetStateAction<Date | null>>
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>
    onChange: ReactDatePickerProps['onChange'];
    reset: () => void;
}

interface UseDatePickerOptions {
    validate?: (value: Date | null) => string | null;
}

const useDatePicker = ({ validate }: UseDatePickerOptions = {}): UseDatePickerResult => {
    const [value, setValue] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange: ReactDatePickerProps['onChange'] = (date) => {
        const validationError = validate?.(date);
        setError(validationError as SetStateAction<string | null>);
        setValue(date);
    };

    const reset = () => {
        setError(null);
        setValue(null);
    };

    return {
        value,
        setValue,
        error,
        setError,
        onChange: handleChange,
        reset,
    };
};

// useScrollPosition
const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const lastScrollPositionRef = useRef(0);

    useEffect(() => {
        function handleScroll() {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
            lastScrollPositionRef.current = currentPosition;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollPosition, lastScrollPosition: lastScrollPositionRef.current };
}

// multi Array
export type ArrayInput = { [key: string]: string[] };

const useInputArray = (
    initialValue: ArrayInput,
    validateFn: (input: ArrayInput) => boolean
) => {
    const [value, setValue] = useState<ArrayInput>(initialValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (key: string, newValue: string[]) => {
        setValue((prevValue) => ({
            ...prevValue,
            [key]: newValue,
        }));
        setError(null);
    };

    const validate = () => {
        const isValid = validateFn(value);
        setError(isValid ? null : 'Invalid input');
        return isValid;
    };

    const reset = () => {
        setValue(initialValue);
        setError(null);
    };

    const handleArrayChange = (key: string, index: number, newValue: string) => {
        const newArray = [...value[key]];
        newArray[index] = newValue;
        handleChange(key, newArray);
    };

    return {
        value,
        error,
        handleChange,
        handleArrayChange,
        validate,
        reset,
    };
};


export {
    useInput,
    useInputArray,
    useTextArea,
    useCheckbox,
    useSelect,
    useRadioInput,
    usePhoneInput,
    useDatePicker,
    useScrollPosition
};
