import React from 'react'
import Swal from 'sweetalert2';

    const  Rescuerdetails= (props) => {
        const {name,image,district,mobile,email}=props
      
    
        const showAlert = (props) => {
          Swal.fire({
            title: name,
            text: name,
            imageUrl: image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            html: `
        <p>Rescuer Email: ${email}</p>
        <p>Mob: ${mobile}</p>
        <p>District: ${district}</p>
      `,
          });
        };
      
        return (
            <div className="mt-4">
  <button
    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
    border-blue-600
    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mr-3"
    style={{ minWidth: '120px', height: '40px' }}
    onClick={showAlert}
  >
    Details
  </button>
</div>

        );
      };
 
 
export default  Rescuerdetails;