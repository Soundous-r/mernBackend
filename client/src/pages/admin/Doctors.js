import React from 'react'
import Layout from '../../components/Layout'
import { message, Table } from 'antd'
import { useEffect,useState } from 'react'
import axios from 'axios';


const Doctors = () => {
const [doctors, setDoctors] = useState([]);
    const getDoctors = async () => {
            try {
               const res = await axios.get('/api/v1/admin/getAllDoctors', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
            
        if(res.data.success){
            setDoctors(res.data.data);
        } }catch (error) {
                console.log(error);
                
            }}
        //useEffect
    
        useEffect(() => {
            getDoctors();
        }, []);
    const handleAccountStatus= async(record,status) =>{
      try {
        const res = await axios.post('/api/v1/admin/changeAccountStatus', {doctorId:record._id,userId:record.userId, Status:status},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if(res.data.success){
          message.success(res.data.message);
          window.location.reload();
      }
      } catch (error) {
        message.error("something went wrong");
        
      }
    }
        const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
       render: (text) => (
    <span
      style={{
        color: text === "pending" ? "orange" : text === "approved" ? "green" : "red",
        fontWeight: "bold",
        textTransform: "capitalize",
      }}
    >
      {text}
    </span>
  ),
    },{
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
   {
  record.Status === "pending" ? (
    <button 
      className="btn btn-success w-50" 
      onClick={() => handleAccountStatus(record, 'approved')}
    >
      Approve
    </button>
  ) : record.Status === "approved" ? (
    <button 
      className="btn btn-danger w-50 " 
      onClick={() => handleAccountStatus(record, 'rejected')}
    >
      Reject
    </button>
  ) : record.Status === "rejected" ? (
    <button 
      className="btn btn-success w-50 " 
      onClick={() => handleAccountStatus(record, 'approved')}
    >
      Approve
    </button>
  ) : null
}

        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2 className="text-center m-2 fw-bold" style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}>All Doctors</h2>
      <Table columns={columns} dataSource={doctors} style={{
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",}}/>
    </Layout>
  );
}

export default Doctors