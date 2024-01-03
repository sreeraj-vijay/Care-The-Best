import React, { useState, useEffect, useRef,lazy } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
const Loading =lazy(()=>import('../../Components/ForEveryone/Loading')) 
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { axiospath } from '../../Config/axiosConfig';


function RescueReport() {
    
  var errors = [];
  const [errordis,setDiserror]=useState("")
  const [errorimg,setImgerror]=useState("")
  const [errorcer,setCererror]=useState("")
  const [errorami,setAnimalerror]=useState("")
  const [errorvacci,setVaccierror]=useState("")
  const [errordate,setDateerror]=useState("")
 
  const [district, setDistrict] = useState('');
  const [image, setImage] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [animal, setAnimal] = useState('');
  const [vaccination, setVaccination] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [districts, setDistricts] = useState([]);
  const [dis, setDis] = useState(false);
  const [Load, setLoading] = useState(false);
  const navigate = useNavigate();

  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const emailOfUser = localStorage.getItem('rescueremail');
    setEmail(emailOfUser);
    display();
  }, []);

  const display = async () => {
    try {
      const districtData = await axiospath.get('/rescuer/districtdata');
      const result = districtData.data;
      const districtNames = result.map((item) => item.district);
      setDistricts(districtNames);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching district data:', error.message);
    }
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const isImageFile = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };

  const imageHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !isImageFile(selectedFile)) {
      toast.error('Please select a valid image file (e.g., JPEG, PNG, GIF).');
      e.target.value = '';
      return;
    }
    setFileToBase(selectedFile);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const imageHandler1 = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !isImageFile(selectedFile)) {
      toast.error('Please select a valid image file (e.g., JPEG, PNG, GIF).');
      e.target.value = '';
      return;
    }
    setFileToBase1(selectedFile);
  };

  const setFileToBase1 = (file) => {
    if (file && !isImageFile(file)) {
      toast.error('Please select a valid image file (e.g., JPEG, PNG, GIF).');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCertificate(reader.result);
    };
  };

  const handlerescuedetails = async (e) => {
    e.preventDefault();
    
    if (!district.trim()) {
      setDiserror('Please  Select a valid District name')
      errors.push("hai")
    }
    if (!image) {
      setImgerror('Please Upload The Animal image')
      errors.push("hai")
    }
    if (!certificate) {
      setCererror('Please Upload The Certificate');
      errors.push("hai")
    }
    if (!animal.trim()) {
      setAnimalerror('Please enter the animal type');
      errors.push("hai")
    }
    if (!vaccination.trim()) {
      setVaccierror('Please enter the vaccination Details');
      errors.push("hai")
    }
    if (!date.trim()) {
      setDateerror('Fill the Rescue date');
      errors.push("hai")
    }

    if (errors.length > 0) {
      return;
    }


    try {
      const data = {
        district: district,
        image: image,
        certificate: certificate,
        animal: animal,
        vaccination: vaccination,
        date: date,
        email: email,
      };
      setLoading(true)
      const res = await axiospath.post('/rescuer/RescueDetails', data);

      if (res.status === 201) {
        setLoading(false)
        navigate('/Rescuer/Rescuerprofile');
        toast.success('Rescue Details Added Successfully');
      } else {
        toast.error('Adding rescue Details Failed');
      }
    } catch (error) {
      toast.error('Adding rescue Details Failed');
    }
  };

  const onSelectFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (imageRef.current && reader.result) {
        imageRef.current.src = reader.result;

        if (cropperRef.current) {
          cropperRef.current.destroy();
        }

        cropperRef.current = new Cropper(imageRef.current, {
          aspectRatio: 4 / 5,
          crop: () => {
            const canvas = cropperRef.current.getCroppedCanvas();
            setImage(canvas.toDataURL('image/jpeg'));
          },
        });
      }
    };

    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
    }
    setDis(true);
    onOpen(); // Open the modal
  };

  useEffect(() => {
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, []);
 
  
  
  console.log(errors)
  return (
    (Load ? (
      <Loading />
    ) : (
      <div>
        <form
          onSubmit={handlerescuedetails}
          encType="multipart/form-data"
          className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-gray-100"
        >
          {/* Left Column */}
          <div className="md:w-1/2 max-w-md">
            <div className="text-center md:text-left">
              <label className="text-lg font-semibold text-gray-800">Add Rescue Details</label>
              <label htmlFor="districtDropdown" className="block text-sm font-medium text-gray-700 mt-4">
                District
              </label>
            </div>
            <div>
              <label htmlFor="districtDropdown" className="block text-sm font-medium text-gray-700 mt-4">
                Select District
              </label>
              <select
                id="districtDropdown"
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={district}
                onChange={handleDistrictChange}
              >
                <option value="" disabled>
                  Select a district
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            
           { !district ? <p className='text-red-500'>{errordis}</p> : <p>{null}</p>}
            </div>

            <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700 mt-4">
              Image
            </label>
            <input
              id="imageInput"
              type="file"
              onChange={onSelectFile}
              className="mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
             { !image ? <p className='text-red-500'>{errorimg}</p> : <p>{null}</p>}

            <label htmlFor="certificateInput" className="block text-sm font-medium text-gray-700 mt-4">
              Certificate Given by Store
            </label>
            <input
              id="certificateInput"
              type="file"
              onChange={(e) => imageHandler1(e)}
              className="mt-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
             { !certificate ? <p className='text-red-500'>{errorcer}</p> : <p>{null}</p>}
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 max-w-md">
            <label htmlFor="animalInput" className="block text-sm font-medium text-gray-700 mt-4">
              Animal Type
            </label>
            <input
              id="animalInput"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Enter the Animal Type"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
            />
             { !animal ? <p className='text-red-500'>{errorami}</p> : <p>{null}</p>}

            <label htmlFor="vaccinationInput" className="block text-sm font-medium text-gray-700 mt-4">
              Vaccination Details
            </label>
            <input
              id="vaccinationInput"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="text"
              placeholder="Enter the Vaccination Details"
              value={vaccination}
              onChange={(e) => setVaccination(e.target.value)}
            />
             { !vaccination ? <p className='text-red-500'>{errorvacci}</p> : <p>{null}</p>}

            <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700 mt-4">
              Rescue Date
            </label>
            <input
              id="dateInput"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            { !date ? <p className='text-red-500'>{errordate}</p> : <p>{null}</p>}

            <div className="text-center md:text-left">
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-full uppercase text-sm font-semibold tracking-wide"
                type="submit"
              >
                Add Store
              </button>
            </div>
          </div>
        </form>

        {dis && (
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => setDis(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crop Image</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <div className="w-full mx-auto p-4">
                  <div className="w-1/2 h-auto mx-auto">
                    <img ref={imageRef} alt="Crop" className="max-w-full" />
                  </div>
                  <div className="w-1/2 mx-auto mt-4">
                    {image && (
                      <div>
                        <img src={image} alt="Cropped" className="max-w-full" />
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    if (cropperRef.current) {
                      const canvas = cropperRef.current.getCroppedCanvas();
                      setImage(canvas.toDataURL('image/jpeg'));
                      setDis(false);
                    }
                  }}
                  colorScheme="blue"
                  mr={3}
                >
                  Save
                </Button>
                <Button onClick={() => setDis(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </div>
    ))
  );
}

export default RescueReport;
