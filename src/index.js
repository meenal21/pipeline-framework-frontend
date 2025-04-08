import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login'
import CreatePipeline from './pages/CreatePipeline';
import reportWebVitals from './reportWebVitals';
import SignUpUI from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // root layout - and can contain children
    errorElement: <div>404 not found</div>,
    children: [
        {
          path: "/", 
          element: <Landing/>,
         },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/home",
          element: <HomePage />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
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
