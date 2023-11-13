import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/auth" >
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
            </Route>

        </Route>
    )
);