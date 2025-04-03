import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import Nav from './app/Navbar'
import Login from './pages/Login'
import CreatePipeline from './pages/CreatePipeline';
import reportWebVitals from './reportWebVitals';
import SignUpUI from './pages/SignUp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />, // root layout - and can contain children
    errorElement: <div>404 not found</div>,
    children: [
        // {
        //   path: "/home", 
        //   element: <Landing />,
        //   errorElement: <ErrorPage />
        //  },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/createpipeline",
          element: <CreatePipeline />
          
        },
        {
          path: "/signup",
          element: <SignUpUI />
        }
    ],
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
