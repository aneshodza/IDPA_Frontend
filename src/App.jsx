import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './base/firebase';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <button onClick={() => signInWithEmailAndPassword(auth, "test@test.com", "asdfasdf")} >Sign IN</button>
      </AuthProvider>
    </div>
  );
}

export default App;
