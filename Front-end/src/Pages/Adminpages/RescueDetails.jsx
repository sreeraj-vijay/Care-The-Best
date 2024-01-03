import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { axiospath } from '../../Config/axiosConfig'
import { toast } from 'react-toastify'
import Pagination from '../../Components/ForEveryone/Pagination'


function RescueDetails() {
    const [data,setData]=useState([])
    const [status,setStatus]=useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [search,setSearch]=useState("")
  
    const Navigate=useNavigate()
    useEffect(()=>{
     try{
        const listanimals=async()=>{
            const details=await axiospath.get("/admin/ListRescuedAnimals")
            setData(details.data.animaldata)
        }
        listanimals()
    }catch(error){
    console.log(error.message)
   }
       
    },[status])

    const animalstauts=async(id)=>{
  
      const res=await axiospath.post("/admin/rescuerApproval",{id:id})
     
      if(res.data.animal){
        toast.success(" Animal Approved For Adoption")
        setStatus(res.data.animal)
      }else{
        toast.error("Updation not completed")
      }

    }
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =  data.filter((item)=>{return search.toLowerCase()=="" ? item : item.district.toLowerCase().includes(search)}).slice(firstPostIndex, lastPostIndex);
    
  
   
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

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg  p-4 ">
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
          Certificate
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Vaccination details
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          RescuerEmail
        </th>
        <th scope="col" className="px-4 py-3 sm:px-6">
          Approval Status
        </th>
      </tr>
    </thead>
    <tbody>
      { currentPosts.map((item) => (
        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.district}
          </td>
          <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           <img src={item.image.url}  className="w-10 h-10 object-cover rounded-full" />
        </td>

        <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           <img src={item.certificate.url}  className="w-10 h-10 object-cover rounded-full" />
        </td>
          <td className="px-4 py-4 sm:px-6">
            {item.vaccination}
          </td>
          <td className="px-4 py-4 sm:px-6">
            {item.email}
          </td>
          {item.approve === false ?
          <td className="px-4 py-4 sm:px-6">
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => animalstauts(item._id)}>
             Approve
            </button>
            
          </td>
          :
          <td className="px-4 py-4 sm:px-6">
            <button className="font-medium text-green-500 dark:text-blue-500 hover:underline" >
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
  )
}

export default RescueDetails
