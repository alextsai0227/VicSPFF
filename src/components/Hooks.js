import { useState } from "react";

export const useInputState = (initialVal) =>{
    const [value, setValue] = useState(initialVal);

    const handleChange = e => {
        if (e.target){
            setValue(e.target.value);
        }else{
            setValue(e);
        }
        
    };
    // const resetValue = () => {
    //     setValue('')
    // }
    return [value, handleChange];
};

export const useToggle = (editable) => {
    const [state, setState] = useState(editable);
    const toggle = () => {
      setState(!state);
    };
    return [state, toggle];
};

  