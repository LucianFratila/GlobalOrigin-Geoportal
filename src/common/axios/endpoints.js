import axios from "axios";

export const getCompanies = async () => {
  return await axios.get(`/companies/list`);
};

export const getConcession = async (id) => {
  return await axios.get(`/concessions/${id}`);
};

export const getConcessions = async (params) => {
  return await axios.get(`/concessions/vectors${params}`);
};

// export const getTreesInConcession = async (params) => {
//   return await axios.get(`/concessions/vectors${params}`);
// };

