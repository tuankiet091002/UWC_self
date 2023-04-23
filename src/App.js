import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/Auth/useAuthContext'
import { Box, alpha } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainLayout from "./components/MainLayout";

import Login from "./pages/Login";
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.js";
import Calendar from "./pages/Calendar";
import Task from "./pages/Task.js";
import Map from "./pages/Map.js";
import Truck from "./pages/Truck.js";
import Employee from "./pages/Employee.js";
import Chat from "./pages/Chat.js";
import styles from "./App.module.css"



const App = () => {
    const { user } = useAuthContext();

    const theme = createTheme({
        typography: {
            fontSize: 16,
        },
    });


    return (<BrowserRouter>
        <ThemeProvider theme={theme}>
            <div className={styles.container}  >{user ?
                <Routes>
                    <Route element={<MainLayout />} >
                        <Route path="" element={user.role === 'backofficer' ? <Dashboard /> : <Calendar />} />
                        <Route path="task" element={<Task />} />
                        <Route path="map" element={<Map />} />
                        <Route path="truck" element={<Truck />} />
                        <Route path="emp" element={<Employee />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="login" element={<Login />} />
                        {user.role == 'backofficer' &&
                            <Route path="signup" element={<Signup />} />}
                    </Route>
                </Routes>
                :
                <Routes>
                    <Route path="" element={() => <Navigate to="login" />} />
                    <Route path='login' element={<Login />} />
                </Routes>
            }
            </div>
        </ThemeProvider>
    </BrowserRouter >)
}

export default App;