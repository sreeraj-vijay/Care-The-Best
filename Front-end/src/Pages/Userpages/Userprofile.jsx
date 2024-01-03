import React, { lazy, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FETCH_BASE_URL } from '../../Config/fetchConfig'
import { axiospath } from '../../Config/axiosConfig'
import { toast } from 'react-toastify'
import { IMAGE } from '../../../public/projectimages'
import { useDispatch } from 'react-redux'
const Followermodal =lazy(()=>import ('../../Components/ForEveryone/Followermodal'))
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))

function Userprofile() {
  const email = localStorage.getItem("useremail")

  const [info, setInfo] = useState([])
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [mobile, setMobile] = useState("")
  const [state, setState] = useState(null)
  const [follower, setFollower] = useState(null)
  const [Load, setLoading] = useState(true)
  const Navigate = useNavigate()
  const disptch = useDispatch()
  useEffect(() => {

    display()
    Followers()
  }, [state])

  const isImageFile = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };
  const imageHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !isImageFile(selectedFile)) {
      toast.error('Please select a valid image file (e.g., JPEG, PNG, GIF).');
      e.target.value = '';
      return;
    }
    setImage(selectedFile);
  };

  const display = async () => {
    const useremail = localStorage.getItem("useremail")

    const res = await axiospath.post("/user/Userdetails", { email: useremail })

    if (res.data.userdata) {
      setInfo(res.data.userdata)
      setLoading(false)


    } else {
      toast.error("User Details not Avialable")
    }

  }

  const userlogoutsection = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch(`${FETCH_BASE_URL}/user/Userlogout`, {
        method: "get",
        headers: {
          "Content-Type": "application/json()"
        },
      })
      if (res.ok) {
        localStorage.removeItem("username");
        localStorage.removeItem("storeid");
        Navigate("/Users/Login")
        toast.success("User loged out successfully")

      } else {
        toast.error("logout not completed")
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const updateuserdata = async (event) => {
    const rescueremail = localStorage.getItem('useremail')
    event.preventDefault();

    try {
      const formdataToSend = new FormData();
      formdataToSend.append('profileImage', image);
      formdataToSend.append('name', name);
      formdataToSend.append('mobile', mobile);
      formdataToSend.append("email", rescueremail)

      const result = await axiospath.put("/user/updateuserprofile", formdataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (result.data.userdata) {
        setState(result.data.userdata)
        toast.success("Details updated Successfully")

      } else {
        toast.error("Updation Failed")
      }

    } catch (error) {
      toast.error("User Details Updation is not completed")

    }


  }
  const Followers = async () => {
    try {

      const res = await axiospath.post("/user/Followelist", { email: email })
      const result = res.data
      if (result) {
        setFollower(result)
        console.log("Followers")
      }

    } catch {
      toast.error("Network Problem")
    }
  }

  return (
    Load ? (
      <Loading />
    ): (

    <>
      <div className='bg-white mt-8 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28'>
        <div className='container mx-auto py-8 flex flex-col md:flex-row gap-6'>
          {/* Existing Profile Section */}
          <div className='shadow rounded-lg p-6 bg-white flex-grow'>
            <div className='flex flex-col items-center'>
              <img
                src={IMAGE + info[0]?.profileImageName}
                className='w-32 h-32 bg-slate-400 rounded-full mb-4'
                alt='Rescuer'
              />
              <h1 className='text-xl font-bold'>{info[0]?.name}</h1>
              <p className='text-gray-500'>Search for Lovely One</p>
              <div className='mt-6 flex flex-wrap gap-4 justify-center'>
                <button onClick={userlogoutsection} className='bg-black hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                  LogOut
                </button>
                <Link to="/Users/UserReortrescue">
                  <button className='bg-green-500 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                    Report
                  </button>
                </Link>
                <Link to="/Users/UserAdopted">
                  <button className='bg-blue-600 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                    Adopted
                  </button>
                </Link>
                <Link to="/Users/UserRescued">
                  <button className='bg-yellow-500 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                    Rescued
                  </button>
                </Link>
                <Followermodal follower={follower} />
              </div>
            </div>
          </div>

          {/* New Form Section */}
          <div className='shadow rounded-lg p-6 bg-white flex-grow'>
            <form onSubmit={updateuserdata} encType="multipart/form-data" className='flex flex-col items-center'>
              {/* Update User Name Field */}
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Update User Name
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder={info[0]?.name}
                  className='mt-1 p-2 border rounded-md w-full md:w-96'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Update User Mobile
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder={info[0]?.mobile}
                  className='mt-1 p-2 border rounded-md w-full md:w-96'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              {/* Profile Image Upload Field */}
              <div className='mb-4'>
                <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                  Profile Image
                </label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={(e) => imageHandler(e)}
                  className='mt-1 p-2 border rounded-md w-full md:w-96'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full md:w-auto'
              >
                Update Profile
              </button>

            </form>
          </div>
        </div>
      </div>
    
    </>
    )
  )
}

export default Userprofile
