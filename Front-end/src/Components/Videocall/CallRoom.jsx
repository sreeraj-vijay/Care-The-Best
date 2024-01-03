import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function CallRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      try {
        const appID = 2001483667;
        const serverSecret = '028d8650d37107fe59dff913acbccc24';
        const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          id,
          Date.now().toString(),
          'Name'
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
          container: containerRef.current,
          sharedLinks: [
            {
              name: 'Copy Link',
              url: `http://localhost:5173/VideoCall/Callroom/${id}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: false,
        });
      } catch (error) {
        console.error('Error joining room:', error);
      }
    };

    myMeeting();
  }, [id]);

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="mt-28" ref={containerRef} />
      <div className="flex items-center justify-center mt-8">
        <button
          onClick={() => {
            handleNavigate();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default CallRoom;
