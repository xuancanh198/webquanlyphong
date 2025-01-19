import Cookies from 'js-cookie';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  lang: "vi",
  loadding: false,
  isLogin: Cookies.get('token') !== null, 
  isAdmin: false,
  infoStaff: null,
  isModalUpdate: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETINFOSTAFF':
      return {
        ...state,
        infoStaff: action.payload,
      };
    case 'SETLANG':
      return {
        ...state,
        lang: action.payload,
      };
    case 'SETLOADDING':
      return {
        ...state,
        loadding: action.payload, 
      };
    case "SETISLOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SETISMODALUPDATE":
      return {
        ...state,
        isModalUpdate: action.payload,
      };
    case "SETISADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
