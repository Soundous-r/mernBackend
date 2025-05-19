import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, message, TimePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice'
const BookingPage = () => {
  const {user} =useSelector(state => state.user)
    const [doctors, setDoctors] = useState([]);
    const params = useParams();
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();
      const getUserData =async ()=>{
        try {
          const res = await axios.post('/api/v1/doctor/getDoctorById',{doctorId :params.doctorId},  {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (res.data.success) {
            setDoctors(res.data.data);
          } 
        } catch (error) {
          console.log(error);
        }
      }
    
      //handle the booking
      const handleBooking =async()=>{
        try {
          setIsAvailable(true);
          if(!date && !time){return alert("date and time required!")}
          dispatch(showLoading());
          const res= await axios.post('/api/v1/user/book-apointement',{
            doctorId:params.doctorId,
            userId:user._id,
            doctorInfo:doctors,
            date:date,
            userInfo:user,
            time:time
          },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch(hideLoading());
        if(res.data.success){
          message.success((res.data.message))
        }
        console.log("user object from Redux:", user);

        } catch (error) {
          dispatch(hideLoading())
          console.log(error)
        }
      }

  const handleAvailability =async()=>{
    try {
      dispatch(showLoading())
      const res =await axios.post('/api/v1/user/booking-availability',{
        doctorId:params.doctorId ,date,time
      },
     {
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
         dispatch(hideLoading());
        if(res.data.success){
       setIsAvailable(true);

        message.success(res.data.message);

        }
        else{
          message.error( res.data.message)
        }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }
   useEffect(() => {
     getUserData();
   }, []) 
  return (
    <Layout>
        <h3 className='text-center mt-5' style={{color:"#061e54", fontWeight:"bold", textShadow:"0 0 1px gray"}}>Book your Appointement</h3>
        <div className='container mt-5 '>
            <h3 style={{color:"#061e54", fontWeight:"bold", textShadow:"0 0 1px gray"}}>Doctor Details</h3>
            {doctors && (
                <div>
                  <h5 style={{color:"#061e54", fontWeight:"light", textShadow:"0 0 1px gray"}}>Dr. {doctors.firstName} {doctors.lastName}</h5>
                  <h6>Specialization : {doctors.specialization}</h6>
                  <h6>Fees : {doctors.feesPerConsultation} da</h6>
              <h6 style={{color:"#061e54"}}>
  Timings : {doctors?.timings?.[0]} - {doctors?.timings?.[1]}
</h6>
                <div className='d-flex flex-column '>
                   <DatePicker
  format={"YYYY-MM-DD"} 
  onChange={(value) => {
    setIsAvailable(false);
    if (value) {
      setDate(value.format("YYYY-MM-DD")); 
    } else {
      setDate(null);
    }
  }}
/>

                    <TimePicker
  className="mt-2"
  format="HH:mm"
  onChange={(value) => {
    setIsAvailable(false);
    if (value) {
      setTime(value.format("HH:mm")); 
    } else {
      setTime(null);
    }
  }}
/>

                    <button className='btn btn-primary mt-2' onClick={handleAvailability}> Check availability</button>
                   {!isAvailable && (
                     <button className='btn btn-primary mt-2' onClick={handleBooking}> Book now</button>

                   )}
                </div>
                </div>
            )}
        </div>
    </Layout>
  )
}

export default BookingPage