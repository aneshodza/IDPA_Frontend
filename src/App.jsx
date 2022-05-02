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
import GameRoom from './components/gameRoom';
import NotFound from './components/404';
import GameLobby from './components/gameLobby';
import PlayGame from './components/playGame';
import "./styles/teacher.css"
import TeacherGame from './components/teacherGame';


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
            <Route path='/teacher/gameLobby/:key' element={<RequireAuth><GameLobby /></RequireAuth>} />
            <Route path='/teacher/game/:id' element={<RequireAuth><TeacherGame /></RequireAuth>} />
            <Route path='/room/:id' element={<GameRoom />}></Route>
            <Route path='/play/:id' element={<PlayGame />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
