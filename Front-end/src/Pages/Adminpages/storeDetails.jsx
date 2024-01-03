import React from 'react'
import { useState,useEffect } from 'react'
import { STORE_IMAGE } from '../../../public/storeimage'
import { Link } from 'react-router-dom'
import { axiospath } from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../Components/ForEveryone/Pagination'

function storeDetails() {
    const [data,setData]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [search,setSearch]=useState("")
    const Navigate=useNavigate()
    useEffect(()=>{
     try{
        const liststore=async()=>{
            const details=await axiospath.get("/admin/ListStore")
            setData(details.data.Storedata)
        }
        liststore()
    }catch(error){
    console.log(error.message)
   }
       
    },[])
    const EditStore=async(storeid)=>{
    localStorage.setItem('id', storeid);
    }
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =data.filter((item)=>{return search.toLowerCase()=="" ? item : item.district.toLowerCase().includes(search)}).slice(firstPostIndex, lastPostIndex);
  
  return (
    <>
     <div className="">
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
    </div>
    <div></div>
 <div className="flex justify-end">
  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline  pr-28" onClick={()=>{Navigate("/Admin/Addstore")}}>Add Store</button>
</div>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  p-9">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3 sm:px-6">
          District
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Image
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Address
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Mobile
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Edit
        </th>
      </tr>
    </thead>
    <tbody>
      {currentPosts .map((item) => (
        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.district}
          </td>
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           <img src={STORE_IMAGE + item.image}  className="w-10 h-10 object-cover rounded-full" />
        </td>

          <td className="px-4 py-4 sm:px-6">
            {item.address}
          </td>
          <td className="px-4 py-4 sm:px-6">
            {item.mobile}
          </td>
          <td className="px-4 py-4 sm:px-6">
          <Link to="/Admin/EditStore"> <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => EditStore(item._id)}> 
             Edit
            </button>
            </Link>
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

    </>
  )
}

export default storeDetails
