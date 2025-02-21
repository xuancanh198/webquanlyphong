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
export const getTotalTime = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date input");
  }

  let diffMs = endDate - startDate;
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = Math.floor(totalDays / 365);
  totalDays %= 365;
  let months = Math.floor(totalDays / 30);
  let days = totalDays % 30;

  let result = "";
  if (years > 0) result += `${years} năm `;
  if (months > 0) result += `${months} tháng `;
  if (days > 0) result += `${days} ngày`;

  return result.trim();
};

export const getRemainingTime = (endTime) => {
  const now = new Date();
  const endDate = new Date(endTime);

  if (isNaN(endDate.getTime())) {
    throw new Error("Invalid date input");
  }

  if (endDate <= now) {
    return "Hết hạn";
  }

  let diffMs = endDate - now;
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = Math.floor(totalDays / 365);
  totalDays %= 365;
  let months = Math.floor(totalDays / 30);
  let days = totalDays % 30;

  let result = "";
  if (years > 0) result += `${years} năm `;
  if (months > 0) result += `${months} tháng `;
  if (days > 0) result += `${days} ngày`;

  return result.trim();
};

export const getElapsedTime = (startAt) => {
  const startDate = new Date(startAt);
  const now = new Date();

  if (isNaN(startDate.getTime())) {
    throw new Error("Invalid date input");
  }

  if (startDate > now) {
    return "Chưa thuê";
  }

  let diffMs = now - startDate;
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let years = Math.floor(totalDays / 365);
  totalDays %= 365;
  let months = Math.floor(totalDays / 30);
  let days = totalDays % 30;

  let result = "";
  if (years > 0) result += `${years} năm `;
  if (months > 0) result += `${months} tháng `;
  if (days > 0) result += `${days} ngày`;

  return result.trim();
};

export const formatToDateTime = (input) => {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const pad = (num) => String(num).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); 
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};