import React from 'react';

function Header (props) {
  return (
    <header>
      <h4>Welcome to a lightweight news reader app built with React.</h4>
      { props.newsTitle !== '' && 
        <h5>Reading from { props.newsTitle }</h5> 
      }
    </header>
  );
}

export default Header;