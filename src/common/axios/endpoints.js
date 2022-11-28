import axios from "axios";

export const getCompanies = async () => {
  return await axios.get(`/companies/list`);
};

export const getConcession = async (id, jwt) => {
  return await axios.get(`/concessions/${id}`);
};
