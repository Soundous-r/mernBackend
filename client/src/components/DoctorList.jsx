import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
       <div className="card p-2 m-2 " onClick={()=>{navigate(`/doctor/book-appointement/${doctor._id}`)}} style={{cursor:'pointer', boxShadow:"0 0 2px grey" ,
    animation: "fadeSlideIn 1s ease forwards",
    opacity: 0,
    transform: "translateY(20px)"}}  onMouseEnter={(e) => {
    e.currentTarget.classList.add('shadow', 'border-primary');
  }}
  onMouseLeave={(e) => {
    e.currentTarget.classList.remove('shadow', 'border-primary');
  }} >
        <div className="card-header   text-center fw-bold" style={{color:"#061e54"}}>
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
            <div className="card-text p-2">
             <p><b>Specialization:</b> {doctor.specialization}</p>   
              <p><b>Experience:</b> {doctor.experience} years</p>   
               <p><b>Fees:</b> {doctor.feesPerConsultation} da</p>  
                <p><b>Timing:</b> {doctor.timings[0]} - {doctor.timings[1]}</p>    
                <p><b>Address:</b> {doctor.address}</p>
                <p><b>Phone:</b> {doctor.phone}</p>
            </div>

        </div>
        </div> 
    </>
  )
}

export default DoctorList