import React, { useState } from 'react';
import {  Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import logoImage from '../../assets/logo1.jpg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {
const username=localStorage.getItem("username")
    let Links =[
        {name:"HOME",link:"/Users/Home"},
        {name:"ADOPT",link:"/Users/AdoptHome"},
        {name:"RESCUERS",link:"/Users/AvilableRescuers"},
        {name:"CONTACT",link:"/Users/Contact"},
      ];
      let [open, setOpen] =useState(false);

    return (
        <div className=' w-full fixed top-0 left-0  z-10'>
           <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7 '>
            {/* logo section */}
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
            <img className='w-10 h-10 mr-2 ' src={logoImage} alt="logo" />
               
                <span className='font-serif'>CARE THE BEST</span>
            </div>
            {/* Menu icon */}
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>
            {/* linke items */}
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                {
                    Links.map((link) => (
                    <li className='md:ml-8 md:my-0 my-7 font-semibold pr-4'>

                     <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500 '>{link.name}</Link>
                    
                    </li>))
                }
                                      
          {username ? (
                <p className="text-lg text-gray-800 font-semibold p-4 hover:text-blue-500 font-serif">{username }</p>

             ) : (
                   <>
     
                    </>
               )}
                <div>
                <Link to="/Users/UserProfile"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6  "  >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 </Link>
                 </div>
             </ul>
             {/* button */}
            </div>
         </div>
    )
};

export default Header;