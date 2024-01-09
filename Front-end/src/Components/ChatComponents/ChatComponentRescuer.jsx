import React, { useEffect, useState } from 'react';
import { axiospath } from '../../Config/axiosConfig';
import { toast } from "react-toastify"
import { IMAGE } from '../../../public/projectimages';
import io from 'socket.io-client'
import chatimage from "../../assets/chatimage.jpg";
import { useNavigate } from 'react-router-dom';


const ENDPOINT = "https://care-the-best.sreerajvijay.fyi"
var socket, selectedChatCompare;

const ChatcomponentRescuer = () => {
  const Navigate=useNavigate()
  const [message, setMessage] = useState("")
  const [rescuerInfo, setRescuerInfo] = useState("")
  const [displayMessage, setDisplaymessage] = useState([])
  const [chat, setChat] = useState(null)
  const [details, setDetails] = useState([])
  const [id, setId] = useState("")
  const [search, setSearch] = useState("")
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", rescuerInfo)
    socket.on('connection', () => setSocketConnected(true))

  }, [message])

  const email = localStorage.getItem("rescueremail")
  const fetchData = async () => {
    await chathistory();
    await getRescueretails();
    await getMessages();
  };
  useEffect(() => {

    fetchData()

    selectedChatCompare = chat
  }, [id])


  const chathistory = async () => {
    const res = await axiospath.post("/rescuer/chathistory", { email: email })
    const result = res.data
    if (result) {
      setDetails(result)
    } else {
      toast.error("No data is available")
    }

  }
  const getRescueretails = async () => {
    const res = await axiospath.post("/rescuer/chatrescuerdetails", { email: email })
    const result = res.data
    if (result) {
      setRescuerInfo(result)
      socket.emit("join chat", id)
    } else {
      toast.error("No Data available")
    }
  }
  const sendMessageHandler = async () => {


    if (message.trim().length <= 0) {
      return
    }
    const res = await axiospath.post("/rescuer/RescuersendMessage", { userid: id, rescuerid: rescuerInfo._id, content: message })
    const result = res.data
    if (result) {
      setChat(result.message)
      setMessage("")
      socket.emit("new message", result)

    } else {
      toast.error(" Senting Message is Failed ")
    }

  }
  const getMessages = async () => {
    const res = await axiospath.post("/rescuer/displayMessages", { userid: id, rescuerid: rescuerInfo._id })
    const result = res.data

    if (result) {
      setDisplaymessage(result)

    } else {
      toast.error("No Message Available")
    }
  }
  useEffect(() => {

    const handleNewMessageReceived = (newMessageReceived) => {
      const details = {
        senderType: newMessageReceived.senderType,
        content: newMessageReceived.content,
      };

      setDisplaymessage((prevMessages) => [...prevMessages, details]);
    };
    socket.on("message received", handleNewMessageReceived);

  }, []);

  const filteredDetails = details.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const VideoCall = async () => {
    Navigate(`/VideoCall/Callroom/${rescuerInfo._id}`)

  }

  return (
<section className="container flex flex-col md:flex-row h-5/6 mt-32">
  <div className="md:ml-10 flex flex-col md:flex-row h-4/5 w-full bg-gray-100 border-r-0 md:border-r-2 rounded-lg">
    {/* User List */}
    <div className="w-full md:w-1/3 p-4 overflow-y-auto">
      {/* Search Input */}
      <div className="mb-4">
      <input
            className="m-2 md:m-4 block md:w-[300px] px-3 py-2 rounded border border-neutral-300 bg-transparent focus:outline-none focus:border-primary focus:shadow-outline-primary dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            type="text"
            value={search}
            placeholder="Search Users"
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>

      {/* User Chat List */}
      {filteredDetails && (
          <div className="flex flex-col space-y-2 overflow-y-auto">
            {filteredDetails.map((item) => (
              <div key={item._id} className="flex items-center bg-blue-600 p-3 rounded-lg cursor-pointer">
                <button onClick={() => setId(item._id)} className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <img
                      id="avatarButton"
                      type="button"
                      data-dropdown-toggle="userDropdown"
                      data-dropdown-placement="bottom-start"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src={IMAGE + item.profileImageName}
                      alt="User dropdown"
                    />
                    <h3 className="font-bold text-white ml-2">{item.name}</h3>
                  </div>
  
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300" onClick={() => VideoCall(item._id)}>
                    Video Call
                  </button>
                </button>
              </div>
            ))}
        </div>
      )}
    </div>

    {/* Chat Window */}
    <div className="w-96 md:w-2/3 h-[500px] border-l-0 md:border-l-2 p-3 flex flex-col">
        <div className="bg-slate-300 flex-1 overflow-y-auto p-5">
        {/* Chat Messages Go Here */}
        <div className="w-full flex flex-col">
          {displayMessage.length > 0 ? (
            displayMessage.map((item, index) => (
              <div
                key={index}
                className={`${item.senderType === 'User' ? 'self-start' : 'self-end'}`}
              >
                <h1 className={`${item.senderType === 'Rescuer' ? 'bg-blue-600' : 'bg-green-600'} max-w-1/2 rounded-lg text-white p-2 mb-2`}>
                  {item.content}
                </h1>
              </div>
            ))
          ) : (
            <div className="w-full h-[350px]">
              <img className="w-full h-full " src={chatimage} alt="" />
            </div>
          )}
        </div>
      </div>

      {/* Input and Send Button */}
      <div className="flex mt-4">
        <input
          className="flex-1 p-3 border rounded focus:outline-none focus:ring focus:border-blue-300 "
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="ml-2 w-[100px] text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default ChatcomponentRescuer;
