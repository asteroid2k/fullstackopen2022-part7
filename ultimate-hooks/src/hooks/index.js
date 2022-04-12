import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = useCallback(async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
    return response.data;
  }, [baseUrl]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    return response.data;
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue("");
  };

  return {
    default: { type, value, onChange },
    reset,
  };
};
