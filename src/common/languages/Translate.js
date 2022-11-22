import React from "react"
import Languages  from './languages.js'
import { useContext } from 'react';

export const LangContext = React.createContext();

const Translate = ({ children }) => {
  const lang = useContext(LangContext);
  const text = children;
  if (Object.keys(Languages).includes(lang)) {
   
    return Languages[lang][text] || text;
  }
  return text;
};

export default Translate;