import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));

const MainLayout
 = () => {
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
