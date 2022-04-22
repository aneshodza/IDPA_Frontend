import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/welcomePage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import TeacherLogin from './components/teacherLogin';
import RequireAuth from './components/requireAuth';
import Dashboard from "./components/dashboard"
import CreateGame from './components/createGame';


function App() {

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#2fd20d',
        contrastText: '#fafafa',
      },
      secondary: {
        main: '#9d00ec',
        contrastText: '#fafafa',
      },
      success: {
        main: '#28a10e',
      },
      info: {
        main: "#5685fd",
        contrastText: '#fafafa',
      },
      danger: {
        main: "#fd4239",
        contrastText: '#fafafa',
      },
      warning: {
        main: "#f4f4f4",
      }
    }
  })
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<WelcomePage />}></Route>
            <Route path='/teacherLogin' element={<TeacherLogin />}></Route>
            <Route path='/teacher/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>}></Route>
            <Route path='/teacher/createGame' element={<RequireAuth><CreateGame create={true} /></RequireAuth>}></Route>
            <Route path='/teacher/edit/:id' element={<RequireAuth><CreateGame create={false} /></RequireAuth>}></Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
