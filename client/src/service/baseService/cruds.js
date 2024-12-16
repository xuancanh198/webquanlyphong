import {
  setRoleAll,
  setFurnitureAll,
  setServiceAll,
  setTypeRoomAll,
  setBuildingAll,
  setFloorAll,
  setRoomAll,
  setUserAll,
  setListFurnitureRoom,
  setListServiceRoom,
  setAcctionAll,
  setPermisstionAll,
  setPermisstionDetailAll
} from "../../redux/accction/listTable";
import { setLoading } from "../../redux/accction/reducers";
import APILink from "../API";
import { toast } from "react-toastify";
import { getListFunService, getAllData, addFunService, updateFunService, deleteFunService } from "./baseFuntion";

export const getListRole = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'staff/role',
    titelnameExcel: ["STT", "ID", "Tên chức vụ", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'created_at', 'updated_at'],
    titelExcel: titel,
    filterBaseDecode: filterBaseDecode
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllRole = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setRoleAll,
    exportExcel: exportExcel,
    routerLink: 'staff/role',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addRole = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'staff/role',
    data: data,
    resetForm: resetForm,
    getList: getListRole
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateRole = (data, id, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'staff/role',
    data: data,
    resetForm: resetForm,
    getList: getListRole
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteRole = (id) => {
  const routerLink = "staff/role";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListRole));
  };
};

export const getListStaff = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'staff/staff',
    titelnameExcel: ["STT", "ID", "Tên chức vụ", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'code', 'created_at', 'updated_at'],
    titelExcel: titel,
    filterBaseDecode: filterBaseDecode,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const addStaff = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'staff/staff',
    data: data,
    resetForm: resetForm,
    getList: getListStaff
  }
  console.log(objectCreate);
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateStaff = (id, data, resetForm, configStatus = false) => {

  const objectUpdate = {
    id: id,
    routerLink: 'staff/staff',
    data: data,
    resetForm: resetForm,
    getList: getListStaff
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, configStatus));
  };
};
export const deleteStaff = (id) => {
  const routerLink = "staff/staff";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListStaff));
  };
};


export const getListTypeRoom = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/typeRoom',
    titelnameExcel: ["STT", "ID", "Tên loại phòng", "Mã loại phòng", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'code', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllTypeRoom = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setTypeRoomAll,
    exportExcel: exportExcel,
    routerLink: 'room/typeRoom',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addTypeRoom = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/typeRoom',
    data: data,
    resetForm: resetForm,
    getList: getListTypeRoom
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateTypeRoom = (data, id, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/typeRoom',
    data: data,
    resetForm: resetForm,
    getList: getListTypeRoom
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteTypeRoom = (id) => {
  const routerLink = "room/typeRoom";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListTypeRoom));
  };
};

export const getListFloor = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/floor',
    titelnameExcel: ["STT", "ID", "Tên tầng", "Mã tầng", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'code', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  }
};
export const getAllFloor = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setFloorAll,
    exportExcel: exportExcel,
    routerLink: 'room/floor',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addFloor = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/floor',
    data: data,
    resetForm: resetForm,
    getList: getListFloor
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateFloor = (data, id, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/floor',
    data: data,
    resetForm: resetForm,
    getList: getListFloor
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteFloor = (id) => {
  const routerLink = "room/floor";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListFloor));
  };
};

export const getListBuilding = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/building',
    titelnameExcel: ["STT", "ID", "Tên tầng", "Mã tầng", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'code', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  }
};

export const getAllBuilding = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setBuildingAll,
    exportExcel: exportExcel,
    routerLink: 'room/building',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addBuilding = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/building',
    data: data,
    resetForm: resetForm,
    getList: getListBuilding
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateBuilding = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/building',
    data: data,
    resetForm: resetForm,
    getList: getListBuilding
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteBuilding = (id) => {
  const routerLink = "room/building";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListBuilding));
  };
};

export const getListService = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/service',
    titelnameExcel: ['Stt', 'id dịch vụ', 'tên dịch vụ', 'mã dịch vụ', 'giá dịch vụ', 'đơn vị', 'số lượng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'unit', 'quantity', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllService = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setServiceAll,
    exportExcel: exportExcel,
    routerLink: 'room/service',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addService = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/service',
    data: data,
    resetForm: resetForm,
    getList: getListService
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateService = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/service',
    data: data,
    resetForm: resetForm,
    getList: getListService
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};

export const deleteService = (id) => {
  const routerLink = "room/building";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListService));
  };
};

export const getListFurniture = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/furniture',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllFurniture = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setFurnitureAll,
    exportExcel: exportExcel,
    routerLink: 'room/furniture',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addFurniture = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/furniture',
    data: data,
    resetForm: resetForm,
    getList: getListFurniture
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateFurniture = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/furniture',
    data: data,
    resetForm: resetForm,
    getList: getListFurniture
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};

export const deleteFurniture = (id) => {
  const routerLink = "room/furniture";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListFurniture));
  };
};

export const getListRoom = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'room/room',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
    filterBaseDecode: filterBaseDecode
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};

export const getAllRoom = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setRoomAll,
    exportExcel: exportExcel,
    routerLink: 'room/room',
    isSelect: isSelectAll,
    page: exportExcel === true ? null : page,
    limit: exportExcel === true ? null : limit,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addRoom = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'room/room',
    data: data,
    resetForm: resetForm,
    getList: getListRoom
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateRoom = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'room/room',
    data: data,
    resetForm: resetForm,
    getList: getListRoom
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, true));
  };
};

export const deleteRoom = (id) => {
  const routerLink = "room/room";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListRoom));
  };
};



export const getListUser = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'user/user',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
    filterBaseDecode: filterBaseDecode
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllUser = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setUserAll,
    exportExcel: exportExcel,
    routerLink: 'user/user',
    isSelect: isSelectAll,
    page: exportExcel === true ? null : page,
    limit: exportExcel === true ? null : limit,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addUser = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'user/user',
    data: data,
    resetForm: resetForm,
    getList: getListUser
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateUser = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'user/user',
    data: data,
    resetForm: resetForm,
    getList: getListUser
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, true));
  };
};

export const deleteUser = (id) => {
  const routerLink = 'user/user';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListUser));
  };
};



export const getListContract = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'user/contact',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllContract = (exportExcel = false) => {
  const objectGet = {
    getList: setFurnitureAll,
    exportExcel: exportExcel,
    routerLink: 'user/contact',

  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addContract = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'user/contact',
    data: data,
    resetForm: resetForm,
    getList: getListContract
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateContract = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'user/contact',
    data: data,
    resetForm: resetForm,
    getList: getListContract
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, true));
  };
};

export const deleteContract = (id) => {
  const routerLink = 'user/contact';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListContract));
  };
};
export const getListServiceRoom = (id) => {
  const objectGet = {
    getList: setListServiceRoom,
    routerLink: `user/contact/get-service/${id}`,
    typeIsQuery: true
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const getListFurnitureRoom = (id) => {
  const objectGet = {
    getList: setListFurnitureRoom,
    routerLink: `user/contact/get-furniture/${id}`,
    typeIsQuery: true
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const downloadFileContract = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    APILink.get(`admin/user/contact/export-docx/${id}`, {
      responseType: 'blob',
    })
      .then((response) => {
        if (response.status === 200) {
          // Lấy tên file từ headers nếu có
          const contentDisposition = response.headers['content-disposition'];
          let filename = 'contract.docx'; // Tên file mặc định
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (filenameMatch && filenameMatch.length > 1) {
              filename = filenameMatch[1];
            }
          }

          // Tạo URL từ blob và tạo link để tải file
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();

          // Xóa URL sau khi tải file xong
          window.URL.revokeObjectURL(url);
          link.remove();

          toast.success('Tải file DOC thành công');
        } else {
          toast.error('Tải file DOC thất bại');
        }
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
        toast.error('Đã xảy ra lỗi khi tải file');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
export const getListBill = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'user/bill',
    titelnameExcel: ["STT", "ID", "Tên chức vụ", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllBill = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: getListBill,
    exportExcel: exportExcel,
    routerLink: 'user/bill',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addBill = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'user/bill',
    data: data,
    resetForm: resetForm,
    getList: getListBill
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateBill = (data, id, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'user/bill',
    data: data,
    resetForm: resetForm,
    getList: getListBill
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteBill = (id) => {
  const routerLink = 'user/bill';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListBill));
  };
};
export const getListServiceRoomContract = (id) => {
  const objectGet = {
    getList: setListServiceRoom,
    routerLink: `user/bill/get-service-room-contract/${id}`,
    typeIsQuery: true
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const getListPermisstion = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'permission/permission',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllPermisstion = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setPermisstionAll,
    exportExcel: exportExcel,
    routerLink: 'permission/permission',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addPermisstion = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'permission/permission',
    data: data,
    resetForm: resetForm,
    getList: getListPermisstion
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updatePermisstion = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'permission/permission',
    data: data,
    resetForm: resetForm,
    getList: getListPermisstion
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, true));
  };
};

export const deletePermisstion = (id) => {
  const routerLink = 'permission/permission';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListPermisstion));
  };
};


export const getListPermisstionDetail = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'permission/permissionDetail',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};

export const getAllPermisstionDetail = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setPermisstionDetailAll,
    exportExcel: exportExcel,
    routerLink: 'permission/permissionDetail',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addPermisstionDetail = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'permission/permissionDetail',
    data: data,
    resetForm: resetForm,
    getList: getListPermisstionDetail
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updatePermisstionDetail = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'permission/permissionDetail',
    data: data,
    resetForm: resetForm,
    getList: getListPermisstionDetail
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, false));
  };
};

export const deletePermisstionDetail = (id) => {
  const routerLink = 'permission/permissionDetail';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListPermisstionDetail));
  };
};

export const getListAcction = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'permission/action',
    titelnameExcel: ['Stt', 'id đồ đạc vật dụng', 'tên đồ đạc vật dụng', 'mã đồ đạc vật dụng', 'giá mua đồ đạc vật dụng', 'thời gian tạo', ' thời gian cập nhật'],
    columExcel: ['id', 'name', 'code', 'price', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllAcction = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setAcctionAll,
    exportExcel: exportExcel,
    routerLink: 'permission/action',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addAcction = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'permission/action',
    data: data,
    resetForm: resetForm,
    getList: getListAcction
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateAcction = (id, data, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'permission/action',
    data: data,
    resetForm: resetForm,
    getList: getListAcction
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, true));
  };
};

export const deleteAcction = (id) => {
  const routerLink = 'permission/action';
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListAcction));
  };
};


export const getListSetting = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'system/setting',
    titelnameExcel: ["STT", "ID", "Tên chức vụ", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'created_at', 'updated_at'],
    titelExcel: titel,
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};
export const getAllSetting = (exportExcel = false, isSelectAll = false, page = 1, limit = 10, search = null) => {
  const objectGet = {
    getList: setRoleAll,
    exportExcel: exportExcel,
    routerLink: 'system/setting',
    isSelect: isSelectAll,
    page: exportExcel === true ? page : null,
    limit: exportExcel === true ? limit : null,
    search: (search !== null && search.trim().length > 0) ? search : null
  }
  return (dispatch) => {
    dispatch(getAllData(objectGet))
  };
};
export const addSetting = (data, resetForm) => {
  const objectCreate = {
    routerLink: 'system/setting',
    data: data,
    resetForm: resetForm,
    getList: getListSetting
  }
  return (dispatch) => {
    dispatch(addFunService(objectCreate));
  };
};
export const updateSetting = (data, id, resetForm) => {
  const objectUpdate = {
    id: id,
    routerLink: 'system/setting',
    data: data,
    resetForm: resetForm,
    getList: getListSetting
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate));
  };
};
export const deleteSetting = (id) => {
  const routerLink = "system/setting";
  return (dispatch) => {
    dispatch(deleteFunService(routerLink, id, getListSetting));
  };
};
