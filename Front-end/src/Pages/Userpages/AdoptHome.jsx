import React, { lazy, useEffect, useState } from 'react';
import { axiospath } from '../../Config/axiosConfig'
import { IMAGE } from '../../../public/projectimages';
import { useNavigate } from 'react-router-dom';
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))



function AdoptHome() {

  const [value, setValue] = useState([])
  const [currentpage, setCurrentpage] = useState(1)
  const [totalpage, setTotalpage] = useState(1)
  const [search, setSearch] = useState('')
  const [Load,setLoad]=useState(true)
  const Navigate = useNavigate()

  useEffect(() => {

    fetchData();
  }, [currentpage, search]);
  const fetchData = async () => {
    try {

      const response = await axiospath.post(`/user/Adopthome?page=${currentpage}&search=${search}`)
      const result = await response.data
      setValue(result.data)
      setTotalpage(result.totalpage);
      setLoad(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleNextPage = () => {
    setCurrentpage((prevPage) => Math.min(prevPage + 1, totalpage));
  };
  const handlePrevPage = () => {
    setCurrentpage((prevPage) => Math.max(prevPage - 1, 1));
  };


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
                className="m-4 block w-[400px] px-3 py-2 rounded-l border border-neutral-300 bg-transparent focus:outline-none focus:border-primary focus:shadow-outline-primary dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
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
  
          <div className="flex flex-wrap justify-evenly">
            {value.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <section className="p-4">
                  <div className="flex flex-col items-start transition duration-300 ease-in-out transform bg-white shadow-md rounded-xl hover:-translate-x-2 hover:-translate-y-2">
                    <img
                      className="object-cover w-full h-48 md:h-72 rounded-t-xl"
                      src={IMAGE + item.image}
                      alt="blog"
                      onClick={() => {
                        const data = localStorage.setItem("storeid", item.district);
                        Navigate("/Users/AnimalDetails");
                      }}
                    />
                    <div className="px-6 py-4 ">
                      <h4 className="text-lg font-semibold text-neutral-600 ">{item.district}</h4>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
  
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
  
            <button
              onClick={handleNextPage}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
                    }
export default AdoptHome
