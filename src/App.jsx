import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './components/welcomePage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


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
        main: '##00f9ba',
      },
      info: {
        main: "#5685fd",
        contrastText: '#fafafa',
      },
      danger: {
        main: "#fd4239",
        contrastText: '#fafafa',
      }
    }
  })
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<WelcomePage />}></Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
