import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input,message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
const Register = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
//form handler
const onFinishHandler =async (values) => {
  try {
    dispatch(showLoading());
      const res =await axios.post('/api/v1/user/register',values);
      dispatch(hideLoading());
      if(res.data.success){
        message.success("register success");
        navigate('/login');
  }
      else{
        message.error(res.data.message);
      }
  }
  catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong');
    
  }
  };
  return (
    <div className='form-container'>
        <h3 className='form-title'> Sign Up and Take Control of Your Medical Journey</h3>
        <Form layout="vertical" onFinish={onFinishHandler}>
        <Form.Item  label='Name' name='name' className='text-dark lead'>
          <Input type='text' placeholder='Enter your name'  required/>
        </Form.Item>
        <Form.Item label='Email' name='email'  className='text-dark lead'>
          <Input type='text' placeholder='Enter your email'  required/>
        </Form.Item>
        <Form.Item label='Password' name='password'  className='text-dark lead'>
          <Input type='password' placeholder='Enter your password'  required/>
        </Form.Item>
        <Link to="/login" className='m-2 text-dark lead'>Already have an account ? here</Link>
        <button type='submit' className='btn btn-primary'>Register</button>
        </Form>
        </div>
  )
}

export default Register