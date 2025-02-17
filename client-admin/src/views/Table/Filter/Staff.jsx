import React ,{useState, useEffect} from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseDecode } from "../../../redux/accction/listTable"
function Staff() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listRole = useSelector((state) => state.listTable.listRoleAll);
    const [filterEmail, setFilterEmail] = useState(null);
    const [filterBanAt, setFilterBanAt] = useState(null);
    const [filterRole, setFilterRole] = useState(null);
    const [arrayFilter, setArrayFilter] = useState([]);
    const arrayAuthentic =[
        {
            value: "null",
            text: t('messageText.verifyValue.authenticated'),
        },
        {
            value: "notNull",
            text: t('messageText.verifyValue.notAuthenticated'),
        }
    ]
    const addFilter = (newFilter) => {
        setArrayFilter((prevArray) => {
            const exists = prevArray.some((filter) => filter.column === newFilter.column);
            if (exists) {
                return prevArray.map((filter) =>
                    filter.column === newFilter.column ? { ...filter, value: newFilter.value } : filter
                );
            } 

                return [...prevArray, newFilter];
            
        });
    };
    const arrayActiveStaff = [
        {
            value: "null",
            text: t('messageText.statusValue.active'),
        },
        {
            value: "notNull",
            text: t('messageText.statusValue.ban'),
        }
    ]
    useEffect(()=>{
        arrayFilter?.length > 0 && dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter))))
    },[arrayFilter])
    const changeRoleFilter =(value) =>{
        setFilterRole(
            {
                type: "filterColumn",
                column : "role_id",
                value : value
            }
        )
    }
    const changeEmailFilter = (value) => {
        setFilterEmail(
            {
                type: "checkNull",
                column: "email",
                value: value
            }
        )
    }
    const changeBanTimeFilter = (value) => {
        setFilterBanAt(
            {
                type: "checkNull",
                column: "ban_at",
                value: value
            }
        )
    }
    useEffect(()=>{
        if (filterEmail !== null && filterEmail?.value !== null) {
            addFilter(filterEmail)
        }
    }, [filterEmail])
    useEffect(() => {
        if (filterBanAt !== null && filterBanAt?.value !== null) {
             addFilter( filterBanAt)
        }
    }, [filterBanAt])
    useEffect(() => {
        if (filterRole !== null && filterRole?.value !== null) {
          addFilter( filterRole)}
    }, [filterRole])
  return (
    <>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeRoleFilter(e.target.value)}>
                  <option>{t('messageText.changeValue', { attribute  : t('page.role')} )}</option>
                  {listRole?.map((item, index)=>{
                    return(
                        <option key={index} value={item?.id}>{item?.name}</option>
                    )
                  })}
              </CFormSelect>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeEmailFilter(e.target.value)}>
                  <option>{t('messageText.verifyText', { attribute: t('lableView.staff.email') })}</option>
                  {arrayAuthentic?.map((item, index)=>{
                    return(
                        <option key={index} value={item?.value}>{item?.text}</option>
                    )
                  })}

              </CFormSelect>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeBanTimeFilter(e.target.value)}>
                  <option>{t('messageText.statusText')}</option>
                  {arrayActiveStaff?.map((item, index) => {
                      return (
                          <option key={index} value={item?.value}>{item?.text}</option>
                      )
                  })}

              </CFormSelect>
          </div>
    </>
  )
}

export default Staff
