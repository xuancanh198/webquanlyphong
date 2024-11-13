import Cookies from 'js-cookie';
const initialState = {
  sidebarShow: true,
  theme: 'light',
  lang: "vi",
  loadding: false,
  isLogin : Cookies.get('token') === null ? false : true,
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETLANG':
      return {
        ...state,
        lang: action.payload,
      };
    case 'SETLOADING':
      return {
        ...state,
        loadding: action.payload,
      };
    case  "SETISLOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
