import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/welcomePage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<WelcomePage />}></Route>
        </Routes>
      </AuthProvider>
    </div >
  );
}

export default App;
