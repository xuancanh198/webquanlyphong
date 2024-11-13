import moment from 'moment';
import 'moment/locale/vi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
};
export const formatDateTime = (dateTime) => {
  moment.locale('vi');
  return moment(dateTime).fromNow();
};

export const convertDateTime = (dateTime) => {
  return moment(dateTime).format('DD/MM/YYYY');
};
export const convertDateTimeFull = (dateTime) => {
  return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
};
export const convertDateTimePost = (dateTime) => {
  return moment(dateTime).format('DD-MM-YYYY');
};


export const checkAccount = (navigate) => {
  const user_id = localStorage.getItem('user_id');
  if (user_id&& user_id === null && user_id > 0) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện tiếp");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
};

export  const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export const convertDateTimeUS = (dateTime) => {
  return moment(dateTime).format('MM/DD/YYYY HH:mm:ss');
};