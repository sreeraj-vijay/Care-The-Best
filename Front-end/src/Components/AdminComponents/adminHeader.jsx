import React, { useState } from 'react';
import {  Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import logoImage from '../../assets/logo1.jpg'
import { Link } from 'react-router-dom';


const adminHeader = () => {
 
    let Links =[
        {name:"HOME",link:"/Admin/Home"},
        {name:"USERS",link:"/Admin/Userdetails"},
        {name:"RESCUER",link:"/Admin/ListRescuer"},
        {name:"LIST STORE",link:"/Admin/ListStore"},
        {name:"RESCUE STATUS",link:"/Admin/AnimalList"},
        {name:"ADOPTION STATUS",link:"/Admin/AdoptedAnimals"},
      ];
      let [open, setOpen] =useState(false);

    return (
        <div className=' w-full fixed top-0 left-0  z-10'>
           <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
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
                    <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                     <Link to={link.link} className='text-gray-800 hover:text-blue-400 duration-500 '>{link.name}</Link>
                    </li>))
                }


            </ul>
            {/* button */}
           </div>
        </div>
    );
};

export default adminHeader;