import { AboutPage } from '../pages/AboutPage';
import { LandingPage } from '../pages/LandingPage';
import { Route, Routes } from 'react-router';


export const routes = <Routes>
    <Route path="/" Component={LandingPage} />,
    <Route path="/about" Component={AboutPage} />
</Routes>