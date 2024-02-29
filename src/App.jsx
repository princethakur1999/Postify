import { useEffect, useState } from 'react';

import './App.css';

import Start from './components/Start';
import Header from './components/Header';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Signup from './components/Signup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {

    const isVisited = sessionStorage.getItem("visited");

    if (!isVisited) {


      setTimeout(() => {

        setIsLoading(false);

        sessionStorage.setItem("visited", true);

      }, 5000);

    } else {

      setIsLoading(false);
    }

  }, []);


  return (

    <BrowserRouter>

      {
        isLoading && <Start />
      }

      {
        !isLoading &&
        <div className='h-screen w-[100vw] bg-white dark:bg-slate-900 flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto relative pt-20'>

          <Header />

          <Routes>

            <Route path="/search" element={<Search />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/signup" element={<Signup />} />

          </Routes>


        </div>
      }

    </BrowserRouter>
  )
}
