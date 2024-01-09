import React, { useEffect, useState,lazy} from 'react'
import { axiospath } from '../../Config/axiosConfig'
import { toast } from 'react-toastify';
const Animaldetailspopup =lazy(()=>import('../../Components/UserComponents/Animaldetailspopup'))
const Pagination=lazy(()=>import('../../Components/ForEveryone/Pagination'))
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading'))

function UserAdopted() {
    const [search,setSearch]=useState('')
    const [data,setData]=useState([])
    const [display,setDisplsy]=useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [Load,setLoading]=useState(true)
    useEffect(()=>{
        adoptedAnimalsDetails()

    },[])

const adoptedAnimalsDetails =async()=>{
try{
    const userEmail=localStorage.getItem('useremail')
    console.log(userEmail)
    const animalData=await axiospath.post("/user/UserAdopted",{email:userEmail})
    const Result=animalData.data
    if(Result){
        setData(Result)
        setDisplsy(true)
        setLoading(false)
    }else{
        toast.error("No Data is Available")
    }

}catch(error){
    toast.error("No Data is Available")
}
}
const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts =  data.filter((item)=>{return search.toLowerCase()=="" ? item : item.animal.toLowerCase().includes(search)}).slice(firstPostIndex, lastPostIndex);
return (
  (Load ? (
    <Loading />
  ) :(
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
    <div>
    {display === true ? (
  currentPosts.length > 0 ? (
    <div className="flex flex-wrap ">
      {currentPosts.map((item, index) => (
        <div className='pl-16' key={index}>
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
          <div className='flex items-center'>
            <Animaldetailspopup
              name={item.animal}
              image={item.image.url}
              district={item.district}
              vaccination={item.vaccination}
              rescuer={item.email}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="p-28">No animals available</p>
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
))
  )
}

export default UserAdopted
