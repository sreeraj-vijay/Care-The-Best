// actions.js

const registerUser = (userData) => ({
    type: 'REGISTER_USER',
    payload: userData,
  });
  const userlogin =(userData)=>({
    type:'USER_LOGIN',
    payload:userData
  })
  const userlogout=()=>({
    type:"USER_LOGOUT",
    payload:[]
    
  })
  const rescuerregister=(rescuerdata)=>({
    type:"USER_REGISTER",
    payload:rescuerdata
    
  })
  export{
    registerUser,
    userlogin,
    userlogout,
    rescuerregister
  }