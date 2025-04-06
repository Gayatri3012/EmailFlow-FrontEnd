import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/App.css';

import FlowchartBuilder from './Components/Flowchart/FlowChartBuilder';
import '@xyflow/react/dist/style.css';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const router = createBrowserRouter([
        {path: '/', index: true, element: <Home />},
        {path: '/signup', element: <Signup />},
        {path: '/login', element: <Login />},
        {path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute>},
        {path: '/emailFlow', element: <ProtectedRoute><FlowchartBuilder /></ProtectedRoute> },
        {path: '/emailFlow/:id', element: <ProtectedRoute><FlowchartBuilder /></ProtectedRoute> },
    ])

    return (
        <div className="App" >
            <RouterProvider router={router} />
            {/* ToastContainer must be included once to show toasts globally */}
            <ToastContainer />
        </div>
        
    );
}

export default App;
