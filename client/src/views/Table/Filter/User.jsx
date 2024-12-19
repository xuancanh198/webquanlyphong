import React, { useState, useEffect } from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseDecode } from "../../../redux/accction/listTable"
function User() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listRoomAll = useSelector((state) => state.listTable.listRoomAll);
    const [filterEmail, setFilterEmail] = useState(null);
    const [filterBanAt, setFilterBanAt] = useState(null);
    const [filterRoom, setFilterRoom] = useState(null);
    const [arrayFilter, setArrayFilter] = useState([]);
    
    const arrayAuthentic = [
        {
            value: 1,
            text: t('messageText.verifyValue.authenticated'),
        },
        {
            value: 0,
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
            value: 1,
            text: t('messageText.statusValueUser.active'),
        },
        {
            value: 0,
            text: t('messageText.statusValueUser.notActive'),
        },
        {
            value: 2,
            text: t('messageText.statusValueUser.ban'),
        }
    ]
    useEffect(() => {
        arrayFilter?.length > 0 && dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter))))
    }, [arrayFilter])
    const changeRoomFilter = (value) => {
        setFilterRoom(
            {
                type: "method",
                column: "findUsersByRoomId",
                value: value
            }
        )
    }
    const changeEmailFilter = (value) => {
        setFilterEmail(
            {
                type: "checkStatus",
                column: "status",
                value: value
            }
        )
    }
    const changeBanTimeFilter = (value) => {
        setFilterBanAt(
            {
                type: "checkStatus",
                column: "isVerifiedInfor",
                value: value
            }
        )
    }
    useEffect(() => {
        if (filterEmail !== null && filterEmail?.value !== null) {
            addFilter(filterEmail)
        }
    }, [filterEmail])
    useEffect(() => {
        if (filterBanAt !== null && filterBanAt?.value !== null) {
            addFilter(filterBanAt)
        }
    }, [filterBanAt])
    useEffect(() => {
        if (filterRoom !== null && filterRoom?.value !== null) {
            addFilter(filterRoom)
        }
    }, [filterRoom])
    return (
        <>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeRoomFilter(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('page.room') })}</option>
                    {listRoomAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeEmailFilter(e.target.value)}>
                    <option>{t('messageText.verifyText', { attribute: t('messageText.account') })}</option>
                    {arrayAuthentic?.map((item, index) => {
                        return (
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

export default User
