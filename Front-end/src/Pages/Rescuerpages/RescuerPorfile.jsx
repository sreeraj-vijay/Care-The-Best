import React, { useEffect, useState,lazy } from 'react';
import { toast } from 'react-toastify';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';
import { IMAGE } from '../../../public/projectimages';
import { useNavigate, Link } from 'react-router-dom';
import { axiospath } from '../../Config/axiosConfig';
const Followermodal =lazy(()=>import ('../../Components/ForEveryone/Followermodal'))
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))

function RescuerProfile() {

  const rescuername = localStorage.getItem('rescuername');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [district, setDistict] = useState("")
  const [info, setInfo] = useState([])
  const [update, setUpdata] = useState(null)
  const [follower, setFollower] = useState([])
  const [Load,setLoading]=useState(true)
  const Navigate = useNavigate()
  const rescueremail = localStorage.getItem('rescueremail')

  useEffect(() => {
    displaydata()
    Followers()
  }, [update])
  const displaydata = async () => {
    try {
      const rescueremail = localStorage.getItem('rescueremail')
      const result = await axiospath.post(`/rescuer/rescuerDetails`, { email: rescueremail })
      setInfo(result.data.rescuerdata)
      setLoading(false)

    } catch (error) {
      toast.error("No user data is available")
    }
  }
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

  const changeDetails = async (event) => {
    event.preventDefault();

    try {

      //Create form data and append the updated details
      const formdataToSend = new FormData();
      formdataToSend.append('profileImage', image);
      formdataToSend.append('name', name);
      formdataToSend.append("email", rescueremail)
      formdataToSend.append("district", district)


      const res = await axiospath.post(`/rescuer/UpdateProfile`, formdataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (res.status === 201) {
        toast.success('Rescuer updated successfully');
        setUpdata(res.data)
        localStorage.setItem('rescuername', res.data.update.name)

      } else {
        toast.error('Updation not completed');
      }
    } catch (error) {
      console.error('Error during updation:', error);
      toast.error('Updation Failed');
    }
  };
  const rescuerlogoutsection = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch(`${FETCH_BASE_URL}/Rescuer/Rescuerlogout`, {
        method: "get",
        headers: {
          "Content-Type": "application/json()"
        },
      })
      if (res.ok) {
        const deletelocal = await localStorage.removeItem("rescuername")
        localStorage.removeItem("rescuername")
        localStorage.removeItem("rescueremail")
        Navigate("/Rescuer/Login")
        toast.success("Rescuer loged out successfully")

      } else {
        toast.error("logout not completed")
      }

    } catch (error) {
      console.log(error.message)
    }

  }
  const Followers = async () => {
    try {

      const res = await axiospath.post("/Rescuer/Followerlist", { email: rescueremail })
      const result = res.data
      if (result) {
        setFollower(result)
        console.log(follower)
      }

    } catch {
      toast.error("Network Problem")
    }
  }

  console.log(follower)
  return (
    (Load ? (<Loading />) :( 
    <>
      <div className='bg-white mt-8 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28'>
        <div className='container mx-auto py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4'>
            {/* Existing Profile Section */}
            <div className='col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3'>
              <div className='shadow rounded-lg p-6 bg-white'>
                <div className='flex flex-col items-center'>
                  <img
                    src={IMAGE + info.profileImage}
                    className='w-32 h-32 bg-slate-400 rounded-full mb-4'
                    alt='Rescuer'
                  />
                  <h1 className='text-xl font-bold'>{info.name}</h1>
                  <p className='text-gray-500'>Animal Rescuer</p>
                  <div className='mt-6 flex flex-wrap gap-4 justify-center'>
                    <button className='bg-black hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6' onClick={rescuerlogoutsection}>
                      LogOut
                    </button>
                    <Link to="/Rescuer/RescueReport"> <button className='bg-blue-500 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                      Report
                    </button>
                    </Link>
                    <Link to="/Rescuer/Chatpage"> <button className='bg-green-500 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6'>
                      Chat
                    </button>
                    </Link>
                    <Followermodal follower={follower} />
                  </div>
                </div>
              </div>
            </div>

            {/* New Form Section */}
            <div className='col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1'>
              <div className='shadow rounded-lg p-6 bg-white'>
                <form onSubmit={changeDetails} encType="multipart/form-data">
                  {/* Update User Name Field */}
                  <div className='mb-4'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                      Update User Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      placeholder={info.name}
                      className='mt-1 p-2 border rounded-md w-full'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                      Update District
                    </label>
                    <input
                      type='text'
                      id='district'
                      placeholder={info.district}
                      className='mt-1 p-2 border rounded-md w-full'
                      value={district}
                      onChange={(e) => setDistict(e.target.value)}
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
                      className='mt-1 p-2 border rounded-md w-full'
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded '
                  >
                    Update Profile Image
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
))
  );
}

export default RescuerProfile;
