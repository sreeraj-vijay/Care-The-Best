import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { FETCH_BASE_URL } from '../../Config/fetchConfig'
import { Link } from 'react-router-dom'
import rescueimage from '../../assets/adminhome.jpg';
import Graph from '../../Components/ForEveryone/Graph'
import { axiospath } from '../../Config/axiosConfig'


function adminHome() {
  const [userCount,setUserCount]=useState(null)
  const [recuerCount,setRescuerCount]=useState(null)
  const [adoptionCount,setAdoptionCount]=useState(null)
  const [rescueCount,setRescueCount]=useState(null)
  const [startdate,setStartDate]=useState(null)
  const [enddate,setEnddate]=useState(null)
const [adoptionRescueData,setadoptionRescueData]=useState([])
  useEffect(() => {
    graphdata()
    graphAddionaldata()

  }, [enddate])

  const graphdata = async () => {
    try {
      const res = await axiospath.post("/admin/graphdata",{start:startdate,end:enddate})
      const result = res.data
      if (result) {
        setadoptionRescueData(res.data)
        console.log("Graph Data Successfully Accessed")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const graphAddionaldata=async()=>{
    try{ 
      const res=await axiospath.post("/admin/graphaditionaldata")
     setUserCount(res.data.user)
     setRescuerCount(res.data.recuer)
     setRescueCount(res.data.rescued)
     setAdoptionCount(res.data.adopted)
     
    }catch(error){
      toast.error('No data is available')
    }
  }


  
  const Navigate = useNavigate()
  const adminlogoutsection = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch(`${FETCH_BASE_URL}/admin/adminlogout`, {
        method: "get",
        headers: {
          "Content-Type": "application/json()"
        },
      })
      if (res.ok) {
        const deletelocal = localStorage.removeItem("adminemail")
        Navigate("/Admin/Login")
        toast.success("Admin loged out successfully")

      } else {
        toast.error("logout not completed")
      }

    } catch (error) {
      console.log(error.message)
    }

  }
console.log(startdate)
console.log(enddate)
  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-24">
        <div className="md:w-2/4 text-center md:text-left">
          <h2 className="text-4xl font-bold leading-tight pr-8 text-darkText">
            The One Who Help <span className="text-brightGreen">Animals</span>
          </h2>
          <p className="text-lightText mt-5 text-lg pr-6">

            Rescuer Side Admin is a vital command hub for emergency response teams, facilitating real-time coordination, location tracking, and resource management. This user-friendly platform empowers rescuers with data analytics, secure communication, and intuitive controls, optimizing their ability to make informed decisions and execute effective rescue missions.
          </p>

          <Link to="/">
            <button className="bg-brightGreen text-white py-2 px-4 rounded-full mt-8 hover:bg-darkGreen transition duration-300 focus:outline-none" title="Contact Us">
              Contact Us
            </button>
          </Link>
        </div>

        <div className="w-full md:w-2/4 mt-6 md:mt-0">
          <img className="w-full h-auto rounded-lg" src={rescueimage} alt="img" />
        </div>
      </div>
      <div class="container mx-auto px-4 py-8 max-w-md">
    <div class="grid grid-cols-2 gap-6">
      
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-lg text-white">
        <h2 class="text-xl font-semibold mb-2">User Count</h2>
        <p class="text-gray-200">{userCount}</p>
      </div>

      
      <div class="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-6 shadow-lg text-white">
        <h2 class="text-xl font-semibold mb-2">Rescuer Count</h2>
        <p class="text-gray-200">{rescueCount}</p>
      </div>

        
      <div class="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg p-6 shadow-lg text-white">
        <h2 class="text-xl font-semibold mb-2">Recue Count</h2>
        <p class="text-gray-200">{rescueCount}</p>
      </div>

      
      <div class="bg-gradient-to-r from-green-500 to-lime-500 rounded-lg p-6 shadow-lg text-white">
        <h2 class="text-xl font-semibold mb-2">Adopted Count</h2>
        <p class="text-gray-200">{adoptionCount}</p>
      </div>

    </div>
  </div>
  <div className="flex">
  <input
    type="date"
    onChange={(e) => {
      setStartDate(e.target.value);
    }}
    className="p-2 m-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <input
    type="date"
    onChange={(e) => {
      setEnddate(e.target.value);
    }}
    className="p-2 m-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

      <Graph data={adoptionRescueData} />
      
      <form onClick={adminlogoutsection} className="flex justify-end  mt-4 mr-8">
  <button
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
    type="submit"
  >
    Logout
  </button>
</form>

    </div>
  )
}

export default adminHome
