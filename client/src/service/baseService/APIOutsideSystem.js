import APIProvince from "../api/apiProvince";
import { setProvince, setDistrict, setWard, setProvinceFirst, setDistrictFirst} from "../../redux/accction/listTable";
export const getListProvince = () => {
  return (dispatch) => {
    APIProvince.get('')
      .then((response) => {
          dispatch(setProvince(response.data.results));
          dispatch(setProvinceFirst(response.data.results[0].province_id));
          dispatch(getListDistrict(response.data.results[0].province_id));

      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getListDistrict= (provinceFirst) => {
  return (dispatch) => {
    APIProvince.get(`district/${provinceFirst}`)
      .then((response) => {
          dispatch(setDistrict(response.data.results));
          dispatch(setDistrictFirst(response.data.results[0].district_id));
          dispatch(getListward(response.data.results[0].district_id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getListward= (districtFirst) => {
  return (dispatch) => {
    APIProvince.get(`ward/${districtFirst}`)
      .then((response) => {
          dispatch(setWard(response.data.results));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};