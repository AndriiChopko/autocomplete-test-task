import { useContext, useEffect, useState } from "react"
import { AutocompleteDataType, InputValues } from "../utils/types";
import { buildAutocompleteUrl } from "../utils/helpers";
import axios from "axios";
import { FORM_DEFAULT_STATE, INITIAL_DATA } from "../utils/constants";
import { SnackbarContext } from "../context/snackbarContext";

const useAutocomplete = (autocompleteField: string) => {
  const [autocompleteData, setAutocompleteData] = useState<AutocompleteDataType>();
  const [inputValues, setInputValues] = useState<InputValues>(FORM_DEFAULT_STATE);
  const [errors, setErrors] = useState<InputValues>(FORM_DEFAULT_STATE);
  const snackbar = useContext(SnackbarContext);

  const getAutocompleteData = async (inputValues: InputValues) => {
    const url = buildAutocompleteUrl(inputValues);

    try {
      const { data } = await axios.get(url);

      if (!data.addresses?.length) {
        setErrors({
          ...errors,
          [autocompleteField]: 'Please match requested format',
        })
      } else {
        setErrors({
          ...errors,
          [autocompleteField]: '',
        })
      }

      if (data.addresses?.length === 1) {
        const { street, city, state, postalCode, country } = data.addresses[0];

        setInputValues({
          street,
          city,
          state,
          postalCode,
          country,
        })
      }

      const organizedData: AutocompleteDataType = data.addresses.reduce((acc: AutocompleteDataType, address: InputValues) => {

        acc.street.push(address.street);
        acc.city.push(address.city);
        acc.state.push(address.state);
        acc.postalCode.push(address.postalCode);
        acc.country.push(address.country);

        return acc;
      }, INITIAL_DATA);

      if (organizedData) {
        setAutocompleteData(organizedData);
      }
    } catch (err: any) {
      snackbar.open(err.message, false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAutocompleteData(inputValues);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValues.street, inputValues.city, inputValues.country, inputValues.postalCode, inputValues.state]);

  const handleInputChange = async (data: { name: string, value: string }) => {
    const { name, value } = data;

    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    autocompleteData,
    errors,
    inputValues,
    handleInputChange,
  }
}

export default useAutocomplete;