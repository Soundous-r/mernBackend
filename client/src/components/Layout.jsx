import React from 'react'
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Badge, message} from 'antd'
const Layout = ({ children }) => {
    const {user}= useSelector((state) => state.user);
    const location = useLocation();
    const Navigate = useNavigate();
    //logout function
    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        Navigate('/login');
        
    }
    //doctor menu 
    const doctorMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'fa-solid fa-house',
    },
    {
        name:'Appointments',
        path:'/doctor-appointments',
        icon:'fa-solid fa-calendar-check',
    },

    {
        name:'Profile',
        path:`/doctor/profile/${user?._id}`,
        icon:'fa-solid fa-user',
    },

];

    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  return (
    <>
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo " >
                    <h6 style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}} className='fw-bold'>SHIFA</h6>   
                    </div>
                    <hr/>
                <div className="menu">
                    {SidebarMenu.map(menu=>{
                        const isActive = location.pathname === menu.path
                        return (
                            <>
                            <div className={`menu-item ${isActive && "active"}` }>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                            </>
                        )
                    })}
                    <div className={"menu-item" } onClick={handleLogout}>
                                <i className={"fa-solid fa-right-from-bracket"}></i>
                                <Link to='/login'>Logout</Link>
                            </div>
                </div>

            </div>
            <div className="content">
                <div className="header" >
                    <div className="header-content p-3" style={{cursor:"pointer" , 
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)"}}>
                        <Badge count={user?.notification?.length} onClick={()=>Navigate('/notification')}  >
    <i className="fa-solid fa-bell"></i>
    </Badge>
                
                <Link to="/profile" className='p-5'>{user?.name || "Guest"}</Link>

            </div></div>
                <div className="body p-2">{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout;