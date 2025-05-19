import React from 'react'
import Layout from '../components/Layout';
import { message, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
const NotificationPage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    //handle mark all as read
    const handleMarkAllRead =async () => {
       try {
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message);
            window.location.reload();


       }
    else{
        message.error(res.data.message);
       }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("Error in marking all notifications as read");
        
       }
    }
    //handle delete all read
    const handleDeleteAllRead = async () => {
  try {
    dispatch(showLoading());

    const res = await axios.delete('/api/v1/user/delete-all-notification', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: { userId: user._id } // This is required since DELETE doesn’t accept a 2nd param as body
    });

    dispatch(hideLoading());

    if (res.data.success) {
      message.success(res.data.message);
      window.location.reload();
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    message.error("Error in deleting all read notifications");
  }
};

  return (
    <Layout>
        <h4 className='p-3 text-center'>Notifications</h4>
        <Tabs className='p-3'>
            <Tabs.TabPane tab="Unread" key={0} className='text-secondary'>
                <div className='d-flex  '>
                    <h4 className='p-2 text-end ' onClick={handleMarkAllRead} style={{
    color: "#061e54",
    cursor:"pointer",
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)"
  }}>Mark All as read</h4>
                </div>
                {user?.notification.map((notification) =>(
                    <div className='card p-2 m-2' onClick={notification.onClickPath} style={{cursor:"pointer"}}>
                        <div className='card-text'>
                            <h6>{notification.message}</h6>
                            <p>{notification.date}</p>
                        </div></div>
                ))
                }
            </Tabs.TabPane>
             <Tabs.TabPane tab="Read" key={1}>
                <div className='d-flex jsutify-content-end '>
                    <h4 className='p-2 text-primary' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete All read</h4>
                </div>
                {user?.seenNotification.map((seenNotification) =>(
                    <div className='card p-2 m-2' onClick={seenNotification.onClickPath} style={{cursor:"pointer"}}>
                        <div className='card-text'>
                            <h6>{seenNotification.message}</h6>
                            <p>{seenNotification.date}</p>
                        </div></div>
                ))
                }
                
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage