import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Home/:id' element={<Details/>}/>
          <Route path='/Post' element={<Create/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
