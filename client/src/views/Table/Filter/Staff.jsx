import React from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
function Staff() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listRole = useSelector((state) => state.listTable.listRoleAll);
    const arrayAuthentic =[
        {
            value: "authentic",
            text: t('messageText.verifyValue.authenticated'),
        },
        {
            value: "notAuthenticated",
            text: t('messageText.verifyValue.notAuthenticated'),
        }
    ]
    const arrayActiveStaff = [
        {
            value: "active",
            text: t('messageText.statusValue.active'),
        },
        {
            value: "ban",
            text: t('messageText.statusValue.ban'),
        }
    ]
  return (
    <>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => dispatch(setLimit(e.target.value))}>
                  <option>{t('messageText.changeValue', { attribute  : t('page.role')} )}</option>
                  {listRole?.map((item, index)=>{
                    return(
                        <option key={index} value={item?.id}>{item?.name}</option>
                    )
                  })}
              </CFormSelect>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => dispatch(setLimit(e.target.value))}>
                  <option>{t('messageText.verifyText', { attribute: t('lableView.staff.email') })}</option>
                  {arrayAuthentic?.map((item, index)=>{
                    return(
                        <option key={index} value={item?.value}>{item?.text}</option>
                    )
                  })}

              </CFormSelect>
          </div>
          <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => dispatch(setLimit(e.target.value))}>
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
