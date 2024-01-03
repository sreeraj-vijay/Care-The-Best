import React from 'react'
import Swal from 'sweetalert2';

    const  Animaldetailspopup= (props) => {
        const {name,image,district,vaccination,rescuer,adopted}=props
        console.log(vaccination)
    
        const showAlert = (props) => {
          Swal.fire({
            title: name,
            text: rescuer,
            imageUrl: image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            html: `
        <p>Rescuer Contact: ${rescuer}</p>
        <p>Vaccination: ${vaccination}</p>
        <p>District: ${district}</p>
        <p>Adopted: ${adopted}</p>
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
      
      export default  Animaldetailspopup;