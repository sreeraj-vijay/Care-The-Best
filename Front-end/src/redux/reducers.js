// reducers.js

const initialState = {
  user: [],
  userlogin: [],
  rescuer: [],
};

const rootReducer = (state = initialState, action) => {
  let userdata;
  let userLogin;
  let userLogout;
  let rescuerdata;

  switch (action.type) {
    case 'REGISTER_USER':
      userdata = { ...state, user: action.payload };
      return userdata;
    case 'USER_LOGIN':
      userLogin = { ...state, userlogin: action.payload };
      return userLogin;
    case 'USER_LOGOUT':
      userLogout = { userlogin: [] };
      return userLogout;
    case 'USER_REGISTER':
      rescuerdata = { ...state, rescuer: action.payload };
      return rescuerdata;
    default:
      return state;
  }
};

export { rootReducer };
