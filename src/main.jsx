import  React  from 'react'
import ReactDOM  from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import App from './App'
import Home from './pages/Home';
import Auth from './pages/Sign/SignIn-Up';
import { ContextProvider } from './pages/Context/AuthContext';
import Quran from './pages/Quran/Quran';
import Azkar from './pages/Azkar/Azkar';
import Tasbih from './pages/Tasbih';
import PrayerTime from './pages/PrayerTime/PrayerTime';
import SurahDeatails from './pages/Quran/Surah';
import AzkarDetails from './pages/Azkar/AzkarDetails';
import RequireAuth from './pages/Sign/RequireAuth';
import { SearchProvider } from './pages/Context/SearchContext';
import { TimerProvider } from './pages/Context/TimerContext';
import NotFound from './pages/notFound';


const router = createBrowserRouter([
      // {
      //   element: <RequireAuth />,
      //   children: [
          {
          path:"/" , 
            element:<App />,
            children: 
            [
              {index: true, element: <Home />},
              {
                element: <RequireAuth />,
                children: 
                [
                  {path: "/quran", element: <Quran />},
                  {path: "/azkar", element: <Azkar />},
                  {path: "/tasbih", element: <Tasbih />},
                  {path: "/prayertime", element: <PrayerTime />},
                  {path: "/surah/:id", element: <SurahDeatails />},
                  {path: "/adhkar/:category", element: <AzkarDetails />},
                  {path: "*", element: <NotFound />}
                ]
              },
              
            ],
        },
      // ],
      // },
      {path:"/auth" , element:<Auth /> } ,
])

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContextProvider>
      <SearchProvider>
        <TimerProvider>
            <RouterProvider router={router} />
        </TimerProvider>
      </SearchProvider>
    </ContextProvider>
  </React.StrictMode>
);