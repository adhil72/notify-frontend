// App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Auth from './App/Auth/Auth';
import MyContext from './App/Configs/Context';
import SideBar from './App/Layout/SideBar';
import Layout from './App/Layout/Layout';

const Darktheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3477eb',
    },
    secondary: {
      main: '#243dff',
    }
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        color: 'info'
      }
    }
  }
});

const Lighttheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3477eb',
    },
    secondary: {
      main: '#243dff',
    }
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        color: 'info'
      }
    }
  }
});

function App() {
  const [isNight, setIsNight] = useState(localStorage.getItem('dark') == "true");
  const [active, setActive] = useState('home')

  const router = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') === "undefined" && localStorage.removeItem('token')
  }, [])


  useEffect(() => {
    if (router.pathname !== '/auth') {
      if (localStorage.getItem('token') === null) {
        nav('/auth');
      }
    } else if (router.pathname === '/auth') {
      if (localStorage.getItem('token') !== null) {
        nav('/');
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.backgroundColor = isNight
      ? '#2a2a2a' // Replace with your dark mode background color
      : '#f2f2f2'; // Replace with your light mode background color

    localStorage.setItem('dark', `${isNight}`)
  }, [isNight]);

  return (
    <MyContext.Provider value={{ active, isNight, setIsNight }}>
      <ThemeProvider theme={isNight ? Darktheme : Lighttheme}>
        <Layout child={
          <Routes>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        } />

      </ThemeProvider>
    </MyContext.Provider>
  );
}

export default App;
