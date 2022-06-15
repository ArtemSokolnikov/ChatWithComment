import 'animate.css';
import './App.css';
import Home from './components/Home';


function App() {
  localStorage.setItem('index', '1');
  return (
    <Home />
  );
}

export default App;
