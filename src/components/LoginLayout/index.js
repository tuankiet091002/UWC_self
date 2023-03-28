import React from 'react'
import { Outlet } from 'react-router-dom'

const LoginLayout = ({ child }) => {
    return (<>
        <div>LoginLayout</div>
        <Outlet />
    </>)
}

export default LoginLayout