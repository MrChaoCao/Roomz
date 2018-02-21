import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render(){
    return (
      <div>
        <a href="/auth/facebook">Login</a>
        <a href="/api/logout">Logout</a>
      </div>
    );
  }
}

export default Header;