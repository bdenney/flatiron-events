import './App.css';
import ApiCalendar from 'react-google-calendar-api';
import { useState } from 'react';
import Header from "./components/Header"
import Footer from './components/Footer';
import CalendarDisplay from "./components/CalendarDisplay"

function App() {
  const [isSignedIn, setIsSignedIn] = useState(ApiCalendar.sign);

  function handleSignIn() {
    setIsSignedIn(true);
  }

  let backgroundImage = "url(./images/photos/0.jpg)";
  const heroStyle = {
    "backgroundImage": backgroundImage,
    "backgroundSize": "cover",
    "backgroundPosition": "center",
    "height": "100%",
    "width": "100%",
    "position":"absolute",
    "opacity": 0.75,
    "top": 0,
    "left":0,
    "zIndex": -2,

    "filter": "blur(8px)",
    "-webkit-filter": "blur(8px)"
  };

  return (
    <div className="App">
      <Header onSignIn={handleSignIn}/>
      <CalendarDisplay isSignedIn={isSignedIn} />
      <Footer />  
      <div style={heroStyle}></div>
    </div>
    
  );
}

export default App;
