import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getCompanies = async () => {
  return await axios.get(`${BASE_URL}/companies/list`);
};



export const getConcession = async (id, jwt) => {
  return await axios.get(`${BASE_URL}/concessions/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getConcessions = async (params) => {
  return await axios.get(`${BASE_URL}/concessions/vectors${params}`);
};

