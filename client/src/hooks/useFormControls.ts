import axios from 'axios';
import React, { useContext } from 'react';
import { InputValues } from '../utils/types';
import { SnackbarContext } from '../context/snackbarContext';

interface Props {
    setShowMessageErrors(param: boolean): void;
    inputValues: InputValues;
}

const useFormControls = ({setShowMessageErrors, inputValues}: Props) => {
    const snackbar = useContext(SnackbarContext);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const { data } = await axios.post('http://localhost:8080/api/address', {
            address: inputValues
          });
    
          if (data.ok) {
            snackbar.open('Data sent successfully!', true);
          }
        } catch (err: any) {
          setShowMessageErrors(true);
          snackbar.open(err.response?.data?.message || 'Error occurred', false);
        }
      };
    
      const handleResetForm = () => {
        window.location.reload();
      }

    return { handleFormSubmit, handleResetForm };
}

export default useFormControls;