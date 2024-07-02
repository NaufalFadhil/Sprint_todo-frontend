import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Task from './pages/Task';
import AddTask from './pages/AddTask';
import EditTaskPage from './pages/EditTaskPage';
import DetailTaskPage from './pages/DetailTaskPage';
import AddSubTaskPage from './pages/AddSubTaskPage';
import EditSubTaskPage from './pages/EditSubTaskPage';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <div className="content-wrapper container">
        <Routes>
          <Route path='/' element={<Task status='todo' />} />
          <Route path='/todo' element={<Task status='todo' />} />
          <Route path='/ongoing' element={<Task status='ongoing' />} />
          <Route path='/completed' element={<Task status='completed' />} />
          <Route path='/canceled' element={<Task status='canceled' />} />
          <Route path='/add' element={<AddTask />} />
          <Route path='/:id/edit' element={<EditTaskPage />} />
          <Route path='/:id' element={<DetailTaskPage />} />
          <Route path='/:id/add' element={<AddSubTaskPage />} />
          <Route path='/:id/sub/:subId/edit' element={<EditSubTaskPage />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
