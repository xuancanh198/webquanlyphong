import APILink from "../API";
import {
  getListData, setpage, setLimit, setTotal, setEcelDowload, setModalAdd, setModalUpdate,
  setRoleAll, setPrevQuery
} from "../../redux/accction/listTable";
import { setLoading} from "../../redux/accction/reducers";
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

export const getListFunService = (objectGet) => {
  return (dispatch) => {
    dispatch(setTotal(1))
    dispatch(getListData([]))
    dispatch(setLoading(true));
    const searchParam = objectGet.search !== null && objectGet.search.statusToggle === true && objectGet.search.value !== null && typeof objectGet.search.value === 'string' ? `&search=${objectGet.search.value}` : '';

    const fitterParam = objectGet.fitler && objectGet.fitler !== null && objectGet.fitler.statusToggle === true ? `&typeTime=${objectGet.fitler.typeTime}&start=${objectGet.fitler.start}&end=${objectGet.fitler.end}` : '';

    const excelParam = objectGet.exportExcel === true && typeof objectGet.exportExcel === 'boolean' ? `&excel=${objectGet.exportExcel}` : '';

    const filtersBase64Param = objectGet.filtersBase64 !== null && objectGet.filtersBase64.length > 0 ? `&filtersBase64=${objectGet.filtersBase64}` : '';

    const apiUrl = `admin/${objectGet.routerLink}?page=${objectGet.page}&limit=${objectGet.limit}${searchParam}${fitterParam}${excelParam}${filtersBase64Param}`;
    APILink.get(apiUrl)
      .then((response) => {
        if (response.data.status === "success" && response.data.type === "normal") {
          dispatch(getListData(response.data.result.data));
          dispatch(setTotal(response.data.result.total));
        }
        else if (response.data.status === "success" && response.data.type === "excel" && objectGet.exportExcel === true) {
          const dataExcel = response.data.result.map((user, index) => {
            const rowData = objectGet.columExcel.map((item) => user[item]);
            return [index + 1, ...rowData];
          });
          const objectGetExcel = {
            dataExcel: dataExcel,
            titelnameExcel: objectGet.titelnameExcel,
            titelExcel: objectGet.titelExcel
          };
          exportExcelFun(objectGetExcel);
          dispatch(setEcelDowload(false))
        } else if (response.data.status === "errorValidate") {
          toast.error(response.data.mess);
          response.data.errors.map((item) => {
            toast.error(item);
          })
        }
      })
      .catch((error) => {
        console.error(error);
      }) .finally(() => {
        dispatch(setOldUrl());
        dispatch(setLoading(false));
      });;
  };
};

export const exportExcelFun = (objectGetExcel) => {
  objectGetExcel.dataExcel.unshift(objectGetExcel.titelnameExcel);
  const worksheet = XLSX.utils.aoa_to_sheet(objectGetExcel.dataExcel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, objectGetExcel.titelExcel + '.xlsx');
  toast.success('Xuất file thành công')
};

export const getAllData = (objectGet) => {
  return (dispatch) => {
    const searchParam = objectGet.search && typeof objectGet.search === 'string' && objectGet.search.trim().length > 0
      ? `search=${objectGet.search.trim()}`
      : null;
    const exportExcelParam =  objectGet.exportExcel && objectGet.exportExcel === true
      ? 'excel=true' 
      : `page=${objectGet.page}&limit=${objectGet.limit}`;
      const isSelectParam = objectGet.isSelect === true
      ? 'isSelect=true' 
      : null;

    let apiUrl = `admin/${objectGet.routerLink}?`;
    const params = objectGet.typeIsQuery && objectGet.typeIsQuery === true ? ""  :  [searchParam, exportExcelParam, isSelectParam].filter(param => param).join('&');
    apiUrl += params;
    APILink.get(apiUrl)
      .then((response) => {
      
        if (response.data.status === "success") {
          dispatch(objectGet.getList(response.data.result.data || response.data.result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};


export const addFunService = (objectCreate) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post(`admin/${objectCreate.routerLink}`, objectCreate.data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(objectCreate.getList());
          toast.success(response.data.message);
          dispatch(setModalAdd(false))
          objectCreate.resetForm();
        }
       else if (response.data.status === "errorValidate") {
          toast.error(response.data.message);
          Object.keys(response.data.errors).forEach((field) => {
            const fieldErrors = response.data.errors[field];
            fieldErrors.forEach((error) => {
              toast.error(` ${error}`);
            });
          });
        } else {
          toast.error(response.data.message);
        }

      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
    });
  };
};
export const updateFunService = (objectUpdate, configStatus = false) => {
  const data = objectUpdate.data;
  const config = configStatus ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : null;
  return (dispatch) => {
    dispatch(setLoading(true));
    const url = `admin/${objectUpdate.routerLink}/${objectUpdate.id}`;

    const request = configStatus
      ? APILink.post(`${url}?_method=PUT`, data, config)
      : APILink.put(url, data, config);

    request
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(objectUpdate.getList());
          toast.success(response.data.message);
          dispatch(setModalUpdate(false));
          objectUpdate.resetForm();
        }  else if (response.data.status === "errorValidate") {
          toast.error(response.data.message);
          Object.keys(response.data.errors).forEach((field) => {
            const fieldErrors = response.data.errors[field];
            fieldErrors.forEach((error) => {
              toast.error(` ${error}`);
            });
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
    });
  };
};

export const deleteFunService = (routerLink, id, listFun) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.delete(`admin/${routerLink}/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(listFun());
          toast.success(response.data.message);
          dispatch(setModalUpdate(false));
        }
        else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        dispatch(setLoading(false));
    });
  };
}

export const setOldUrl = () =>{
  const searchParams = new URLSearchParams(location.search);
  const roleParam = searchParams.get('query');
  return (dispatch) => {
    dispatch(setPrevQuery(roleParam))
  }
}
