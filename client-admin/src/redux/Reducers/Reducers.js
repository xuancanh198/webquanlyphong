import Cookies from 'js-cookie';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  lang: "vi",
  loadding: false,
  isLoginUser: Cookies.get('token_user') &&  Cookies.get('token_user') !== null, 
  isLoginAdmin: Cookies.get('token_admin') && Cookies.get('token_admin') !== null, 
  isAdmin: location.pathname.includes("admin") ? true : false,
  isOpenModalOTPUser: Cookies.get('token_otp_user') && Cookies.get('token_otp_user') !== null,
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
    case "SETISLOGINUSER":
      return {
        ...state,
        isLoginUser: action.payload,
      };
    case "SETISLOGINADMIN":
      return {
        ...state,
        isLoginAdmin: action.payload,
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
    case "SETISOPENMODALOTPUSER":
      return {
        ...state,
        isOpenModalOTPUser: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
