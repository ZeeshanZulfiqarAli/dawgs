import React from 'react';
import { ReactComponent as SpinnerSVG } from '../../assets/spinner.svg';

const Loader = () => {
  return <SpinnerSVG className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" />;
};

export default Loader;
