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
            {
              ApiCalendar.sign ? <button onClick={handleLogin}>Sign In</button> : null
            }
        </header>
    )
}

export default Header;