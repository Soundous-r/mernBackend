import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
const Appointements = () => {
    const [appointments,setAppoitments] =useState([]);
    const getAppointments=async ()=>{
        try {
            const res= await axios.get('/api/v1/user/user-appointements',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setAppoitments(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        getAppointments()
    },[])

    const columns= [
        {
            title:'ID',
            dataIndex:'_id'
        },
        {
            title:'Name',
            dataIndex:'name',
            render:(text,record) =>{
          return      <span>
                {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
                
            }
        },
        {
            title:'Doctor Phone',
            dataIndex:'phone',
            render:(text,record) =>{
            return    <span>
                {record.doctorInfo.phone}
                </span>
                
            }
        },
        {
            title:'Date & time',
            dataIndex:'date',
            render:(text,record) =>{
              return   <span>
  {moment(record.time).local().format('DD-MM-YYYY HH:mm')}
</span>

                
            }
        },
         {
            title:'Status',
            dataIndex:'status',
              render:(text,record) =>{
          return      <span>
                {record.Status}
                </span>
                
            }
       
        },
        
    ]
  return (
    <Layout>
        <h3 className='text-center p-3 fw-bold'>Appointments list </h3>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointements