import { useState, useEffect } from "react";




const useTrees = (url) => {

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

  const trees={
    'falled':randomNumberInRange(0,1000),
    'marked':randomNumberInRange(0,1000),
    'live':randomNumberInRange(0,1000),
    'species':{
        'African Mahogany':{
            'falled':randomNumberInRange(0,1000),
            'marked':randomNumberInRange(0,1000),
            'live':randomNumberInRange(0,1000),
        },
        'Ebony':{
            'falled':randomNumberInRange(0,1000),
            'marked':randomNumberInRange(0,1000),
            'live':randomNumberInRange(0,1000),
        },
        'Okoume':{
            'falled':randomNumberInRange(0,1000),
            'marked':randomNumberInRange(0,1000),
            'live':randomNumberInRange(0,1000),
        }
    }
  }

  return trees;
};

export default useTrees;