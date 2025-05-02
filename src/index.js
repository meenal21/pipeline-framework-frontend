import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login'
import CreatePipeline from './pages/CreatePipeline';
import reportWebVitals from './reportWebVitals';
import SignUpUI from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import StageConfigurationPage from './pages/StageConfigurationPage';
import PipelineDetails from './pages/PipelineDetails';
import ViewDAG from './pages/ViewDAG';
import PipelineXDetails from './pages/PipelineXDetails';
import ProtectedRoute from './components/ProtectedRoutes';
import  About from './pages/About';
import ContactUs from './pages/Contact';
import '@fortawesome/fontawesome-free/css/all.min.css';


const router = createHashRouter([
  {
    path: "/",
    element: <Layout />, // root layout - and can contain children
   // errorElement: <div>404 not found</div>,
    children: [
        {
          path: "",  // changed from "/" to "" for root path 
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
          path: "/about",
          element: <About />
        },
        {
          path: "/signup",
          element: <SignUpUI />
        },
        {
          path: "/contact",
          element: <ContactUs />
        },
        { element: <ProtectedRoute />, // Protected route for dashboard
          children: [
          {
            path: "/dashboard",
            element: <Dashboard />
          },
          {
            path: "/createpipeline",
            element: <CreatePipeline />
            
          },
          {
            path: "/pipeline-detail/:id",
            element: <PipelineDetails />
          },
          {
            path: "/pipelinex-detail/:id",
            element: <PipelineXDetails />
          },
          
          {
            path: "/configure",
            element: <StageConfigurationPage/>
          },
          {
            path: "/view-dag/:id",
            element: <ViewDAG/>
          }
          ],
        },
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
