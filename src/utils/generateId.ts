const generateID = () => {
    return Math.random().toString(36).slice(10);
  };
  
  export {generateID}