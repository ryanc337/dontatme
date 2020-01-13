import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'><Logo /></div>
    </div>
  )
}

export default Header;
