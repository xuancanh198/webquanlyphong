import { setFilter
   } from "../../redux/accction/listTable";
export const chaneFtiler=(data, filters)=>{
  return (dispatch) => {
    if (!Array.isArray(filters)) {
      filters = [];
    }

    let found = false;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].colum === data.colum) {
        found = true;
        if (filters[i].order_by !== data.order_by) {
          filters[i].order_by = data.order_by;
        }
        break;
      }
    }
    if (!found) {
      filters.push(data);
    }    dispatch(setFilter(btoa(JSON.stringify(filters))));
    }
}