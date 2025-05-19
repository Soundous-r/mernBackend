import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useDispatch } from 'react-redux';
import moment from 'moment';



import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
const Profile = () => {
    const {user} = useSelector((state) => state.user);
    const [doctor,setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.put(
            "/api/v1/doctor/updateProfile",
            {
              ...values,
              userId: user._id,
              //i used it to convert the time to 24 hours format
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
              
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };
    //get doctor details
    const getDoctorInfo =async ()=>{
        try {
            const res = await axios.post(`/api/v1/doctor/getDoctor`,{userId:params.id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() =>{
        getDoctorInfo();
    },[])
  return (
    <Layout>
        <h2 className='text-center mt-2 fw-bold' style={{color:"#061e54" ,
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}>Update Profile</h2>
        {doctor && (
              <Form layout='vertical'  onFinish={handleFinish} className='m-5'
               initialValues={{
                ...doctor,
                timings:[
                    moment(doctor.timings[0],'HH:mm'),
                    moment(doctor.timings[1],'HH:mm')
                    ]}} >
            <h4 className='m-3 fw-bold ' style={{color:"#c0ccffe6", textShadow:"0 0 1px gray",
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}>Personal Information:</h4>
      
            <Row gutter={40}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='First Name' name='firstName' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='First Name' />
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}>
                <Form.Item label='Last Name' name='lastName' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='Last Name' />
                </Form.Item>
                </Col>
            </Row >
            <Row  gutter={40}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='phone' name='phone' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='Phone number' />
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}>
                <Form.Item label='Email' name='email' required rules={[{ required: true }]}>
                    <Input type='email' placeholder='Email address' />
                </Form.Item>
                </Col>
            </Row>
            <Row  gutter={40}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='Address' name='address' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='Address' />
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}>
                <Form.Item label='website' name='website'  >
                    <Input type='text' placeholder='Website URL' />
                </Form.Item>
                </Col>
            </Row>
            <h4 className='m-3 fw-bold' style={{color:"#c0ccffe6", textShadow:"0 0 1px gray", 
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}>Professional Information:</h4>
            <Row gutter={40}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='specialization' name='specialization' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='specialization' />
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}>
                <Form.Item label='experience' name='experience' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='experience as a doctor' />
                </Form.Item>
                </Col>
            </Row >
            <Row  gutter={40}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label='feesPerConsultation' name='feesPerConsultation' required rules={[{ required: true }]}>
                    <Input type='text' placeholder='Fees Per Consultation' />
                </Form.Item>
                </Col>
                 <Col xs={24} md={24} lg={8}>
               <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
                </Col>
                
                <Col xs={24} md={24} lg={8}>
                 <button
            className="btn btn-primary form-btn"
            type="submit" style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}
          >
          Update 
          </button></Col>
            </Row>
        
        </Form>)
            }
    </Layout>
  )
}

export default Profile