import React, { lazy, useEffect, useState } from 'react';
import { axiospath } from '../../Config/axiosConfig';
import { toast } from 'react-toastify';
const Animaldetailspopup =lazy(()=>import('../../Components/UserComponents/Animaldetailspopup'))
const Pagination =lazy(()=>import('../../Components/ForEveryone/Pagination')) 
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading')) 

function RescueAnimalDetails() {
  const [info, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [Load, setLoading] = useState(true);

  useEffect(() => {
    displaydetails();
  }, []);

  const displaydetails = async () => {
    const rescueremail = localStorage.getItem('rescueremail');
    try {
      const details = await axiospath.post('/rescuer/Animaldetails', { email: rescueremail });
      const value = details.data.animaldata;
      console.log(value);

      if (value) {
        setInfo(value);
        setLoading(false);
      } else {
        toast.error('No animal in the Rescue list');
        setLoading(false); // Set loading to false even when there are no animals
      }
    } catch (error) {
      toast.error('Something Went Wrong');
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = info.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {Load ? (
        <Loading />
      ) : currentPosts.length > 0 ? (
        <>
          <div className="flex flex-row flex-wrap gap-4">
            {currentPosts.map((item, index) => (
              <div className="pt-32 ml-20 md:ml-4 md:pl-28" key={index}>
                <h2>Please Give New Life</h2>
                <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 ">
                  <div>
                    <div className="group relative">
                      <img
                        src={item.image.url}
                        alt="Description"
                        className="w-full h-60 object-cover group-hover:scale-110 duration-500 bg-blue-400"
                      />
                      <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                        <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                        <span className="text-xl font-bold">{item.animal}</span>
                        <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                          Vaccination : {item.vaccination} <br />
                          District: {item.district} <br />{' '}
                        </p>
                        Adoption Status: {item.adopted ? 'Adopted' : 'Not Adopted'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Animaldetailspopup
                    name={item.animal}
                    image={item.image.url}
                    district={item.district}
                    vaccination={item.vaccination}
                    rescuer={item.email}
                    adopted={item.adopted}
                  />
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPosts={info.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <p className='ml-28 mt-60 mb-40 text-red-600'>No Details available</p>
      )}
    </>
  );
}

export default RescueAnimalDetails;
