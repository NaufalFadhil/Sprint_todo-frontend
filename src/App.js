import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Task from './pages/Task';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Task status='todo' />} />
        <Route path='/todo' element={<Task status='todo' />} />
        <Route path='/ongoing' element={<Task status='ongoing' />} />
        <Route path='/completed' element={<Task status='completed' />} />
        <Route path='/canceled' element={<Task status='canceled' />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
