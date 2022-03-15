import './App.css';
import ApiCalendar from 'react-google-calendar-api';
import { useState } from 'react';
import Header from "./components/Header"
import Footer from './components/Footer';
import CalendarDisplay from "./components/CalendarDisplay"
import BlurredBackgroundHero from './components/BlurredBackgroundHero';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(ApiCalendar.sign);

  function handleSignIn() {
    setIsSignedIn(true);
  }

  return (
    <div className="App">
      <Header isSignedIn={isSignedIn} onSignIn={handleSignIn}/>
      { isSignedIn ? <CalendarDisplay /> : null }
      { isSignedIn ? <Footer />  : null }
      <BlurredBackgroundHero/>
    </div>
    
  );
}

export default App;
