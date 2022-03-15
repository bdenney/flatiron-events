import React, { useState } from 'react'
import ApiCalendar from 'react-google-calendar-api';


function Header({onSignIn}) {

    function handleLogin() {
        ApiCalendar.handleAuthClick()
        .then(() => {
          onSignIn();
        });
      }

    return (
        <header>
            <img src="./images/logo2.svg"/>
            {/* <h1>Flatiron Events</h1> */}
            <button onClick={handleLogin}>Sign In</button>
        </header>
    )
}

export default Header;