import React, { useState, useEffect } from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseDecode } from "../../../redux/accction/listTable"
function PermisstionDetail() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
   const listPermisstionAll = useSelector((state) => state.listTable.listPermisstionAll);
     const listAcctionAll = useSelector((state) => state.listTable.listAcctionAll);
    const [filterAcction, setFilterAcction] = useState(null);
    const [filterPermmisstion, setFilterPermmisstion] = useState(null);
    const [filterActive, setFilterActive] = useState(null)
    const [arrayFilter, setArrayFilter] = useState([]);

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
    const arrayActivePermisstionDetail = [
        {
            value: 1,
            text: t('messageText.statusValue.active'),
        },
        {
            value: 0,
            text: t('messageText.statusValue.ban'),
        },
    ]

 
    const changePerrmisston = (value) => {
        setFilterPermmisstion(
            {
                type: "filterColumn",
                column: "permissionId",
                value: value
            }
        )
    }
    const changeAcction = (value) => {
        setFilterAcction(
            {
                type: "filterColumn",
                column: "acctionId",
                value: value
            }
        )
    }

    const changeActiveFilter = (value) => {
        setFilterActive(
            {
                type: "filterColumn",
                column: "status",
                value: value
            }
        )
    }
    useEffect(() => {
        arrayFilter?.length > 0 && dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter))))
    }, [arrayFilter])
    useEffect(() => {
        if (filterAcction !== null && filterAcction?.value !== null) {
            addFilter(filterAcction)
        }
    }, [filterAcction])
    useEffect(() => {
        if (filterPermmisstion !== null && filterPermmisstion?.value !== null) {
            addFilter(filterPermmisstion)
        }
    }, [filterPermmisstion])
    useEffect(() => {
        if (filterActive !== null && filterActive?.value !== null) {
            addFilter(filterActive)
        }
    }, [filterActive])

    return (
        <>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changePerrmisston(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('page.permisstion') })}</option>
                    {listPermisstionAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeAcction(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('page.acction') })}</option>
                    {listAcctionAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeActiveFilter(e.target.value)}>
                    <option>{t('messageText.statusTextAttribute', { attribute: t('page.permisstionDetail') })}</option>
                    {arrayActivePermisstionDetail?.map((item, index) => {
                        return (
                            <option key={index} value={item?.value}>{item?.text}</option>
                        )
                    })}

                </CFormSelect>
            </div>
        </>
    )
}

export default PermisstionDetail
