
import { Outlet } from 'react-router-dom';
import NavBar from '../Pages/Home/Navbar/NavBar';


const MainLayOut = () => {
    return (
        <div className='overflow-hidden'>
            <NavBar></NavBar>
            <div className='flex bg-slate-900 text-white'>
                {/* <div className='h-screen w-16 fixed left-0 top-[90px] z-30'>
                   <SideNavbar></SideNavbar>
                </div> */}
                <div className='w-full'>
                    
                        <Outlet></Outlet>
                    
                </div>
            </div>
        </div>
    );
};

export default MainLayOut;