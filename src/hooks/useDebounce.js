import { useEffect } from "react";
import { encode } from 'js-base64';

function useDebounce(values, delay) {

  useEffect(() => {
    const handler = setTimeout(() => {
      const hashedCode = `${encode(values.html)}|${encode(values.css)}|${encode(values.js)}`
      window.history.replaceState(null, null, `/${hashedCode}`)
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [values]);
}

export default useDebounce;