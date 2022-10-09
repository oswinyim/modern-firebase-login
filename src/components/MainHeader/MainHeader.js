import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A simple Sign in & Sign up page with Firebase</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
