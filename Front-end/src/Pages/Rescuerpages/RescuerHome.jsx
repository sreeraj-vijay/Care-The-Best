import React,{lazy} from 'react'
import rescueimage from '../../assets/rescue1.avif';
import rescueTeam from '../../assets/rescueteam.avif';
import adoptionCenter from '../../assets/adoptioncenter.avif';
import animalChat from '../../assets/animalchat.avif';
import review1 from '../../assets/review1.jpg';
import review2 from '../../assets/review2.avif';
import review3 from '../../assets/review3.avif';
import animalVideocall from '../../assets/animalvideocall.jpg';
const Service = lazy(() => import('../../Components/ForEveryone/Service'));
const  Review  = lazy(() => import('../../Components/ForEveryone/Review'));
import { Link } from 'react-router-dom';

function RescuerHome() {

  return (
    <>
    
    <div className="min-h-screen flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-24">
  <div className="md:w-2/4 text-center md:text-left">
    <h2 className="text-4xl font-bold leading-tight pr-8 text-darkText">
      The One Who Help <span className="text-brightGreen">Animals</span>
    </h2>
    <p className="text-lightText mt-5 text-lg pr-6">
    Animal rescuers are selfless individuals committed to saving and rehabilitating distressed animals. They tirelessly provide medical care, love, and support, ensuring these creatures have a chance for a renewed life, free from suffering. Their compassion and dedication make a profound impact on countless lives.
    </p>

    <Link to="/">
      <button className="bg-brightGreen text-white py-2 px-4 rounded-full mt-8 hover:bg-darkGreen transition duration-300 focus:outline-none" title="Contact Us">
        Contact Us
      </button>
    </Link>
  </div>

  <div className="w-full md:w-2/4 mt-6 md:mt-0">
    <img className="w-full h-auto rounded-lg" src={rescueimage} alt="img" />
  </div>
</div>

    <div className=" min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <div className=" flex flex-wrap justify-center gap-6 mt-6">
        <Service img={rescueTeam} title="Our Rescue Team" discreption="Animal rescue teams passionately save and rehabilitate distressed animals, providing medical care and securing loving homes for a brighter future." />
        <Service img={adoptionCenter} title="Our Adoption Centers" discreption="Animal adoption involves providing homes for abandoned pets, offering them love and care. It fosters responsible ownership and creates fulfilling connections"/>
        <Service img={animalChat} title="Live Chat Session"discreption="Live chat with rescuers facilitates instant communication for reporting emergencies, seeking advice, and collaborating to save and protect animals in distress." />
        <Service img={animalVideocall} title="Video Call Session" discreption="Video calls with rescuers enhance animal aid, allowing visual assessment and collaborative decision-making to ensure swift and effective rescue efforts."/>
      </div>
    </div>
    <div className=" min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5">
      

      <div className=" flex flex-col md:flex-row gap-5 mt-5">
        <Review img={review1} comment="Adopted my furry friend, life transformed! Grateful for the rescue team's dedication to pairing pets with loving homes." />
        <Review img={review2} comment="Exceptional adoption experience! Rescuer's support made our new pet's transition seamless. A joyous addition to our family." />
        <Review img={review3} comment="Rescuer ensured a perfect match.Our companion brings endless joy.Gratitude for their commitment to animal welfare." />
        <Review img={animalChat} comment="Satisfied adopter here! Rescuer's guidance made the process smooth. Our furry family member brings daily happiness and warmth." />
      </div>
    </div>

    </>
  )
}

export default RescuerHome
