import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Start from './components/Start';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Message from './pages/Message';
import Notifications from './pages/Notifications';
import Activity from './pages/Activity';
import Setting from './pages/Setting';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './components/Error';

import Protected from './components/Protected';

export default function App() {

  const token = useSelector((state) => state.user.token);

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
          <div className='h-screen w-[100vw] bg-white dark:bg-slate-900 flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto relative pt-28'>

            <Header />

            <Routes>
              <Route path="/" element={< Protected token={token}><Home /></Protected>} />

              <Route path="/search" element={<Protected token={token}><Search /></Protected>} />

              <Route path="/profile" element={<Protected token={token}><Profile /></Protected>} />

              <Route path="/message" element={<Protected token={token}><Message /></Protected>} />

              <Route path="/notifications" element={<Protected token={token}><Notifications /></Protected>} />

              <Route path="/activity" element={<Protected token={token}><Activity /></Protected>} />

              <Route path="/setting" element={<Protected token={token}><Setting /></Protected>} />

              <Route path="/signup" element={<Signup />} />

              <Route path="/login" element={<Login />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        )
      }

    </BrowserRouter>
  );
}
