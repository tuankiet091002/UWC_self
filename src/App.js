import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import { useAuthContext } from './hooks/Auth/useAuthContext'
import { Box, alpha } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainLayout from "./components/MainLayout/MainLayout";

import Login from "./pages/Login";
import Signup from './pages/Signup';
import Dashboard from "./pages/Dashboard.js";
import Calendar from "./pages/Calendar";
import Task from "./pages/Task.js";
import Map from "./pages/Map.js";
import Truck from "./pages/Truck.js";
import Employee from "./pages/Employee.js";
import Chat from "./pages/Chat.js";

const App = () => {
    const { user } = useAuthContext();

    const theme = createTheme({
        typography: {
            fontSize: 16,
        },
    });


    return (<BrowserRouter>
        <ThemeProvider theme={theme}>
        <Box position="sticky" sx={{ py: 4, pl: 8, pr: 4, height: "100vh", backgroundColor: alpha('#aeffc5', 0.79) }}>{user ?
                <Routes>
                    <Route element={<MainLayout />} >
                        <Route path="" element={user.role === 'backofficer' ? <Dashboard /> : <Calendar />} />
                        <Route path="task" element={<Task />} />
                        <Route path="map" element={<Map />} />
                        <Route path="truck" element={<Truck />} />
                        <Route path="emp" element={<Employee />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
                :
                <Routes>
                    <Route path="" element={() => <Navigate to="login" />} />
                    <Route path='login' element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Routes>
            }
            </Box>
        </ThemeProvider>
    </BrowserRouter >)
}

export default App;