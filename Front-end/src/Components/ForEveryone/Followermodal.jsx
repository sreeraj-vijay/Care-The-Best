import React from 'react';
import Swal from 'sweetalert2';
import { renderToString } from 'react-dom/server';

const Followermodal = (props) => {
  const { follower } = props;

  // Check if follower is an array before mapping
  const followersNames = Array.isArray(follower)
    ? follower.map((follower, index) => (
        <p key={index} className="follower-name text-white">
          {follower.name}
        </p>
      ))
    : null;

  const htmlString = renderToString(
    <div className="followers-container">
      {followersNames}
    </div>
  );

  const showAlert = () => {
    Swal.fire({
      title: 'Followers Information',
      html: htmlString,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: 'follower-modal-popup',
        closeButton: 'follower-modal-close-button',
        content: 'follower-modal-content',
      },
      background: '#1a1a1a',
      timer: 10000,
      timerProgressBar: true,
    });
  };

  return (
    <button className='bg-blue-600 hover:bg-blue-950 text-white py-2 px-4 sm:px-8 rounded mt-3 sm:mt-6' onClick={showAlert}>
      Connections
    </button>
  );
};

export default Followermodal;
