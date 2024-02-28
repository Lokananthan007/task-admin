import './App.css';
import Rootlayout from './layout/Rootlayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Edit';

function App() {
  return (
   <div>
     <BrowserRouter>
       <Routes>
          <Route path='/' element={<Rootlayout/>}>
            <Route index  element={<Home/>} />
            <Route path="update/:userId" element={<Update/>}/>
          </Route>
       </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
