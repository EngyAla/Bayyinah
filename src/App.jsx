import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { styled, ThemeProvider, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import {  teal,grey } from '@mui/material/colors';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  }));


const App = ()=>{
const [open, setOpen] = React.useState(false);

const handleDrawerOpen = () => {
    setOpen(true);
};

const handleDrawerClose = () => {
    setOpen(false);
};


const getDesignToken = (mode)=>({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: {
            main: teal[500],   // اللون الأساسي
            light: teal[100],  // لون أفتح للهوفر مثلاً
            dark: teal[700],   // لون أغمق للعناصر البارزة
          },
          background: {
            default: '#e2e2e276', // خلفية الصفحة
            paper: '#fbf9f9',   // خلفية الكروت والقوائم
          },
          text: {
            primary: grey[900],
            secondary: grey[700],
          },
          border: {
            primary: "transparent",  // تمت الإضافة هنا
          },
          card:{
            primary: grey[400],
          },
          tasbih_card:{
            primary: teal[400]
          }
        }
      : {
          // Dark mode colors
          primary: {
            main: teal[300],   // درجة أفتح من teal في الوضع الليلي
            light: teal[200],
            dark: teal[500],
          },
          background: {
            default: '#252525', // خلفية داكنة
            paper: '#191919',
          },
          text: {
            primary: '#ffffff',
            secondary: grey[400],
          },
          border: {
            primary: "#3b3a3a",  // ✅ أو لون مختلف للوضع الداكن
          },
          card:{
            primary: '#363736',
          },
          tasbih_card:{
            primary: ''
          }
        }),
  },
})
const  [mode, setMode] = React.useState(localStorage.getItem("currentMood") !== null ? localStorage.getItem("currentMood") : "light" );
const theme = React.useMemo(()=> createTheme(getDesignToken(mode)), [mode])

return (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode}/>

      <SideBar open={open} handleDrawerClose={handleDrawerClose} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2 }}>
            {/* Outlet تستخدم لما اضغط علي لينك اي صفحه يعرض المحتوي بتاعها */}
            <Outlet />
          </Typography>
        </Box>
    </Box>
  </ThemeProvider>
);
}

export default App;