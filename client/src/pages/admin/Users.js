import React from 'react'
import Layout from '../../components/Layout'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { message, Table } from 'antd';
import { jwtDecode } from 'jwt-decode';

const Users = () => {
    const [users, setUsers] = useState([]);
    //get all users
    const getUsers = async () => {
        try {
           const res = await axios.get('/api/v1/admin/getAllUsers', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

        
    if(res.data.success){
        setUsers(res.data.data);
    } }catch (error) {
            console.log(error);
            
        }}
    //useEffect


const handleBlock = async (targetUserId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error("No token found.");
      return;
    }

    const res = await axios.post(
      `/api/v1/admin/block-user/${targetUserId}`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log("API Response:", res.data);

    if (res.data.success) {
      message.success("User blocked successfully");
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    console.error("Block Error:", error);

    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      message.error(error.response.data.message);
    } else {
      message.error("Something went wrong");
    }
  }
};




    useEffect(() => {
        getUsers();
    }, []);
    const columns =[
        {
            title: 'Name',
            dataIndex: 'name',
           
        },
        {
            title: 'Email',
            dataIndex: 'email',
          
        },
        {
            title: 'Is Doctor',
            dataIndex: 'isDoctor',
            render: (text, record) => (
                <span>{record.isDoctor ? 'Yes' : 'No'}</span>
            ),
           
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger w-50'  onClick={() => handleBlock(record._id)}>Block</button>
                   
                </div>
            ),
        },
    ]
  return (
    <Layout>
        <h2 className='text-center m-2 p-3' style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}>Users List</h2>
        <Table columns={columns} dataSource={users} style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}></Table>
    </Layout>
  )
}

export default Users