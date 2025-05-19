import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { message, Table } from 'antd'
const AppointementsDoctor = () => {
 const [appointments,setAppoitments] =useState([]);
    const getAppointments=async ()=>{
        try {
            const res= await axios.get('/api/v1/doctor/doctor-appointments',{
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

    const handleStatus =async (record,status)=>{
        try {
            console.log('Sending:', { appointmentId: record._id, status });

            const res= await axios.post('/api/v1/doctor/update-status',{appointmentId: record._id,status},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
             if(res.data.success){
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error)
            message.error("something went wrong")
        }

    }
    const columns= [
            {
                title:'ID',
                dataIndex:'_id'
            },
            {
                title:'Name',
                dataIndex:'name',
                render:(text,record) =>{
                    return  <span> {record.userInfo.name} </span>
                    
                }
            },
            {
                title:'Phone',
                dataIndex:'phone',
                render:(text,record) =>{return <span>
                    {record.doctorInfo.phone}
                    </span>
                    
                }
            },
            {
                title:'Date & time',
                dataIndex:'date',
                render:(text,record) =>{return <span>
                  {moment(`${record.date} ${record.time}`, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY HH:mm')
}

                    </span>
                    
                }
            },
            {
                title:"Status",
                dataIndex:'Status',
                render:(text,record) =>{return <span>
                    {record.Status}
                    </span>
                    
                }
            },
           
            {
                title:'Actions',
                dataIndex:'actions',
                render:(text,record)=>{
                    return   <div className='d-flex'>
                        {record.Status === 'pending' && (
                            <div className='d-flex'>
                                <button className='btn btn-success m-3' onClick={()=>handleStatus(record,'approved')}>Approve</button>
                                <button className='btn btn-danger m-3' onClick={()=>handleStatus(record,'rejected')}>Reject</button>
                            </div>
                        )}
                    </div>
                }
            }
            
        ]
        console.log(appointments)
  return (
    <Layout>
        <h1 className='p-3 text-center' style={{
    color: "#061e54",
    
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)",
  }}>Appointments list </h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default AppointementsDoctor