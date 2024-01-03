import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import { axiospath } from '../../Config/axiosConfig'
import Pagination from '../../Components/ForEveryone/Pagination'

function AdoptionStatus() {
    const [data,setData]=useState([])
    const [search,setSearch]=useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    useEffect(()=>{
        adoptonDetails()
    },[])

    const adoptonDetails=async()=>{
        try{
            const res=await axiospath.get("/admin/adoptedDetails")
            const result=res.data
            console.log(result)
            setData(result)

        }catch(error){
            toast.error("No Adoption Details available")
        }
    }
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =data.filter((item)=>{return search.toLowerCase()=="" ? item : item.customerEmail.toLowerCase().includes(search)}).slice(firstPostIndex, lastPostIndex);
  
  return (
    <div>
          <div className="relative mt-10 mb-4 flex flex-wrap items-stretch justify-end pt-8 ">
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  p-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Animal Type
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Payment Status
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            ADPTED
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Customer Email
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map((item) => (
          <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.animaltype}
            </td>
            <td className="px-4 py-4 sm:px-6 text-green-800 font-bold">
              {item.paymentStatus}
            </td>
            <td className="px-4 py-4 sm:px-6">
             True
            </td>
            <td className="px-4 py-4 sm:px-6">
              {item.customerEmail}
            </td>
            <td className="px-4 py-4 sm:px-6">
              200
            </td>

    
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <Pagination
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
  </div>
  )
}

export default AdoptionStatus
