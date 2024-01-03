import React, { useEffect, useState,lazy } from 'react'
import { axiospath } from '../../Config/axiosConfig'
import { toast } from 'react-toastify'
import { IMAGE } from '../../../public/projectimages'

const Rescuerdetails=lazy(()=>import('../../Components/UserComponents/Rescuerdetails'))
import { useNavigate, Link } from 'react-router-dom'
const Pagination=lazy(()=>import('../../Components/ForEveryone/Pagination'))
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))

function AvailableRescuers() {
  const email = localStorage.getItem("useremail")
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)
  const [search, setSearch] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [follow, setFollow] = useState("")
  const [Load, setLoading] = useState(true)
  useEffect(() => {
    displayrescuers()

  }, [follow])
  const displayrescuers = async () => {
    try {
      const res = await axiospath.get("/user/AvilableRescuers")
      const value = res.data.rescuer
      console.log(value)
      if (value) {
        setData(value)
        setLoading(false)
      } else {
        toast.error("No rescuers Available")
      }


    } catch (error) {
      toast.error("Somthing Went wrong")

    }

  }
  const createChatRoom = async (id) => {
    try {
      const email = localStorage.getItem("useremail")
      const res = await axiospath.post("/user/CreateRoom", { useremail: email, rescuerid: id })
      const result = res.data
      if (result) {
        navigate(`/Users/CreateChatroom/${result._id}`)
      }


    } catch (error) {
      toast.error("Notwork Problem")
    }
  }

  const districtsInKerala = [
    'All',
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod',
  ];

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.filter((item) => {
    const isDistrictMatch = selectedDistrict === '' || selectedDistrict === 'All' || item.district === selectedDistrict;
    const isSearchMatch = search.toLowerCase() === '' || item.name.toLowerCase().includes(search.toLowerCase());
    return isDistrictMatch && isSearchMatch;
  })
    .slice(firstPostIndex, lastPostIndex);

  const followRequest = async (id) => {

    const email = localStorage.getItem("useremail")
    try {

      const res = await axiospath.post("/user/follow", { rescuerid: id, email: email })
      const result = res.data

      if (result) {
        console.log("Started Following")
        setFollow(result)
      }
    } catch (error) {
      toast.error("NetWork Problem")
    }
  }
  const unfollowRequest = async (id) => {

    const email = localStorage.getItem("useremail")
    try {

      const res = await axiospath.post("/user/unfollow", { rescuerid: id, email: email })
      const result = res.data

      if (result) {
        console.log("Started Following")
        setFollow(result)
      }
    } catch (error) {
      toast.error("NetWork Problem")
    }
  }

  return (
    <>
      {Load ? (
        <Loading />
      ) : (
        <>
        <div className="mt-20 flex flex-col md:flex-row md:justify-between items-stretch ">
        {/* Left side - District Dropdown */}
        <div className=" text-left mt-4 md:mt-0 md:ml-4">
          <label htmlFor="district">Select a District </label>
          <select
            id="district"
            name="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="block w-full md:w-48 px-3 py-2 rounded border border-neutral-300 bg-transparent focus:outline-none focus:border-primary focus:shadow-outline-primary dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          >
            <option value="" disabled>
              Choose a District
            </option>
            {districtsInKerala.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Right side - Search Input */}
        <div className="relative mt-4 md:mt-0 md:mb-4 flex flex-wrap items-stretch justify-end pt-0 md:pl-4">
          <input
            type="search"
            className="m-2 md:m-4 block w-full md:w-[400px] px-3 py-2 rounded border border-neutral-300 bg-transparent focus:outline-none focus:border-primary focus:shadow-outline-primary dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button
            className="m-2 md:m-4 px-4 py-2 text-xs font-medium uppercase bg-primary text-black hover:bg-green-400 focus:outline-none focus:ring focus:border-primary rounded"
            type="button"
            data-te-ripple-init
          >
            Search
          </button>
        </div>
      </div>
          <div>
            <div className="flex flex-row flex-wrap gap-4 ">
              {currentPosts.map((item, index) => (
                <div className="mt-12 ml-16  md:ml-32" key={index}>
                  {item.follower && item.follower.includes(email) ? (
                    <button
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                      onClick={() => { unfollowRequest(item._id) }}
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                      onClick={() => { followRequest(item._id) }}
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                      Follow
                    </button>
                  )}

                  <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 mt-4">
                    <div>
                      <div className="group relative">
                        <img src={IMAGE + item.profileImage} alt="Description" className="w-full h-60 object-cover group-hover:scale-110 duration-500 bg-blue-400" />

                        <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                          <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                          <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                            Name : {item.name} <br />
                            District: {item.district}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Rescuerdetails
                      name={item.name}
                      image={IMAGE + item.profileImage}
                      district={item.district}
                      mobile={item.mobile}
                      email={item.email}
                    />
                    <div className="mt-4">
                      <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
      border-blue-600
      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" style={{ minWidth: '120px', height: '40px' }}
                        onClick={() => createChatRoom(item._id)}>Chat</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );

}

export default AvailableRescuers
