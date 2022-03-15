import ApiCalendar from 'react-google-calendar-api';


function Header({isSignedIn, onSignIn}) {

  function handleLogin() {
      ApiCalendar.handleAuthClick()
      .then(() => {
        onSignIn();
      });
    }

  return (
      <header>
          <img src="./images/logo2.svg"/>
          {
            isSignedIn ? null : <button onClick={handleLogin}>Sign In</button>
          }
      </header>
  )
}

export default Header;