import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.svg';

const Header = () => {
  return (
    <div className="h-16 flex box-content p-6 justify-between items-center">
      <Link to="/">
        <img src={logo} alt="logo" className="h-14 max-h-full max-w-full" />
      </Link>
      <h4 className='font-thin'>The Ultimate Dog Database</h4>
    </div>
  );
};

export default Header;
