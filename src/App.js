import './App.css';
import Header from "./components/Header"
import Footer from './components/Footer';
import CalendarDisplay from "./components/CalendarDisplay"
import BlurredBackgroundHero from './components/BlurredBackgroundHero';

function App() {
  return (
    <div className="App">
      <Header />
      <CalendarDisplay />
      <Footer />
      <BlurredBackgroundHero/>
    </div>
    
  );
}

export default App;
