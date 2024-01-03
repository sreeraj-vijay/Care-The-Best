import React, { useState, useEffect } from 'react';
import Pagination from '../../Components/ForEveryone/Pagination';

import { toast } from 'react-toastify';
import { IMAGE } from '../../../public/projectimages';
import { axiospath } from '../../Config/axiosConfig';
import { FETCH_BASE_URL } from '../../Config/fetchConfig';

function rescuerList() {
  const [data, setData] = useState([]);
  const [block,SetBlock]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [search,setSearch]=useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const Details = await axiospath.get("/admin/RescuerDetails")
        setData(Details.data.Rescuerdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [block]);

  const showAlert = (id) => {
    Swal.fire({
      title: "Are You Sure?",
      showCancelButton: true, // Display the cancel button
      confirmButtonText: "Okay",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        blockrescuer(id);
      } else {
        console.log("Operation canceled");
      }
    });
  };
  const blockrescuer=async(rescuerId)=>{
  const res = await fetch(`${FETCH_BASE_URL}/admin/BlockRescuer`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({
      rescuerId
    }),
})
if(res.ok){
   SetBlock(res)
    toast.success("Blocked / UnBlocked Successfully")
}else{
    toast.error("blocked/unblock is not comopleted")
}
  }  
  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =data.filter((item)=>{return search.toLowerCase()=="" ? item : item.district.toLowerCase().includes(search)}).slice(firstPostIndex, lastPostIndex);
 



  const approverescuer=async(rescuerId)=>{
    const res = await fetch(`${FETCH_BASE_URL}/admin/ApproveRescuer`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
  
      body: JSON.stringify({
        rescuerId
      }),
  })
  if(res.ok){
     SetBlock(res)
      toast.success(" Rescuer Approved")
  }else{
      toast.error("Approving not comopleted")
  }
    }

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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  p-4">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Rescuer Name
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Image
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Email
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Mobile
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Block/Unblock
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Approval Status
        </th>
      </tr>
    </thead>
    <tbody>
      {currentPosts.map((item) => (
        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.name}
          </td>
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           <img src={IMAGE  + item.Certificate}  className="w-10 h-10 object-cover rounded-full" />
        </td>
          <td className="px-4 py-4 sm:px-6">
            {item.email}
          </td>
          {item.mobile ?
          <td className="px-4 py-4 sm:px-6">
            {item.mobile}
          </td>
         :  <td className="px-4 py-4 sm:px-6">
         Google sign-in
       </td>}
          <td className="px-4 py-4 sm:px-6">
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() =>showAlert(item._id)}>
              {item.isListed === false ? "BLOCK" : "UNBLOCK" }
            </button>
          </td>
          {item.approve === false ?
          <td className="px-4 py-4 sm:px-6">
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => approverescuer(item._id)}>
              Approve
            </button>
          </td>
          :
          <td className="px-4 py-4 sm:px-6">
            <button className="font-medium text-green-600 dark:text-blue-500 hover:underline" >
             Approved
            </button>
          </td>
}
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
  );
}

export default rescuerList;
