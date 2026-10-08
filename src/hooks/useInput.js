import { useState } from 'react';

/**
 * Custom hook para gestionar el estado de un input de formulario controlado.
 * @param {string} initialValue - Valor inicial del campo.
 * @returns {[string, Function, Function]} - Tupla con [valor, manejadorOnChange, reset].
 */
export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [value, onChange, reset];
}
