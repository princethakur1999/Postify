import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Start from './components/Start';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import About from './pages/About';
import Message from './pages/Message';
import Notifications from './pages/Notifications';
import Activities from './pages/Activities';
import Setting from './pages/Setting';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './components/Error';

import Protected from './components/Protected';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    const isVisited = sessionStorage.getItem('visited');

    if (!isVisited) {

      setTimeout(() => {

        setIsLoading(false);

        sessionStorage.setItem('visited', true);

      }, 5000);

    } else {

      setIsLoading(false);
    }

  }, []);

  return (

    <BrowserRouter>

      {
        isLoading &&
        <Start />
      }

      {
        !isLoading &&
        (
          <div className='h-screen w-[100vw] bg-white dark:bg-slate-950 flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto relative'>

            <Header />

            <Routes>
              <Route path="/" element={< Protected ><Home /></Protected>} />

              <Route path="/search/" element={<Protected ><Search /></Protected>} />

              <Route path="/profile/" element={<Protected ><Profile /></Protected>} />

              <Route path="/about/" element={<Protected ><About /></Protected>} />

              <Route path="/message/" element={<Protected ><Message /></Protected>} />

              <Route path="/notifications/" element={<Protected ><Notifications /></Protected>} />

              <Route path="/activities/" element={<Protected ><Activities /></Protected>} />

              <Route path="/setting/" element={<Protected ><Setting /></Protected>} />

              <Route path="/signup/" element={<Signup />} />

              <Route path="/login/" element={<Login />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        )
      }

    </BrowserRouter>
  );
}
