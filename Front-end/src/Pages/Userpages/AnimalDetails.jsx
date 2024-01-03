
import React, { lazy, useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { axiospath } from '../../Config/axiosConfig'
const Pagination=lazy(()=>import('../../Components/ForEveryone/Pagination'))
const Animaldetailspopup =lazy(()=>import( '../../Components/UserComponents/Animaldetailspopup'))
const PayButton =lazy(()=>import('../../Components/UserComponents/PayButton'))
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))


function AnimalDetails() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [display, setDisplsy] = useState(false)
  const [search, setSearch] = useState("")
  const [Load, setLoading] = useState(true)
  useEffect(() => {
    displaydata()
  }, [])
  const displaydata = async () => {
    const id = localStorage.getItem("storeid");

    try {
      const response = await axiospath.post("/user/animaldisplay", { district: id });
      const value = response.data;

      if (response.status === 201) {
        setData(value)
        setDisplsy(true)
        setLoading(false)

      } if (response.status == 401) {
        toast.error("No Animals available");
      }
    } catch (error) {
      console.error("Error making the POST request:", error);
      // Handle the error appropriately, e.g., display an error message
      toast.error("Error fetching animal data");
    }
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.filter((item) => { return search.toLowerCase() == "" ? item : item.animal.toLowerCase().includes(search) }).slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {Load ? (
        <Loading />
      ) : (
        <>
           <div className="mb-3">
            <div className="mt-10 mb-4 flex flex-wrap items-stretch justify-end pt-8">
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
                className="m-4 px-4 py-2 text-xs font-medium uppercase bg-primary text-white hover:bg-black focus:outline-none focus:ring focus:border-primary rounded-r"
                type="button"
                data-te-ripple-init
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {display === true ? (
              currentPosts.length > 0 ? (
                currentPosts.map((item, index) => (
                  <div className="m-4 ml-16 md:ml-8 lg:ml-20 xl:ml-36" key={index}>
                    <h2>Lets Give A New Life</h2>
                    <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 ">
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
                            Vaccination: {item.vaccination} <br />
                            District: {item.district}
                          </p>
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
                      <PayButton id={item._id} />
                    </div>
                  </div>
                ))
              ) : (
                <p className='ml-28 mt-20 mb-20 text-red-600'>No Details available</p>
              )
            ) : null}
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

export default AnimalDetails
