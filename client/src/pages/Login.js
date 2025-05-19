import React from 'react'
import '../styles/LoginStyles.css';
import { Form, Input, message } from 'antd';
import {useDispatch} from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
const navigate = useNavigate();
const dispatch = useDispatch()
//form handler
const onFinishHandler = async(values) => {


  try {
    dispatch(showLoading());
    const res =await axios.post('/api/v1/user/login', values);
    window.location.reload();
    dispatch(hideLoading());
    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      message.success('login successful');
      navigate('/');
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === 'Your account has been blocked. Please contact support.') {
          message.error('Your account has been blocked. Please contact support.');
        } else {
          message.error('Something went wrong');
        }
      } else {
        message.error('Something went wrong');
      }
    }
  
};
  return (
   <div className='form-container'>
          <h2 className='form-title'>We’re here to help you feel your best</h2>
          <Form layout="vertical" onFinish={onFinishHandler}>
          
          <Form.Item label='Email' name='email'  className='text-dark lead'>
            <Input type='text' placeholder='Enter your email'  required/>
          </Form.Item>
          <Form.Item label='Password' name='password'  className='text-dark lead'>
            <Input type='password' placeholder='Enter your password'  required/>
          </Form.Item>
          <Link to="/register" className='m-2 text-dark lead'>Don't have an account ? here</Link>
          <button type='submit' className='btn btn-primary'>Login</button>
          </Form>
          </div>
  )
}

export default Login