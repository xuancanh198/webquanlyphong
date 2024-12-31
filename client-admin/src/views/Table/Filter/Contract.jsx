    import React, { useState, useEffect } from 'react'
    import {
        CFormSelect,
    } from '@coreui/react'
    import { useTranslation } from 'react-i18next';
    import { useSelector, useDispatch } from 'react-redux';
    import { setBaseDecode } from "../../../redux/accction/listTable"
    function Contract() {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const listRoomAll = useSelector((state) => state.listTable.listRoomAll);
        const listUserAll = useSelector((state) => state.listTable.listUserAll);
        const [filterRoom, setFilterRoom] = useState(null);
        const [filterUser, setFilterUser] = useState(null);
        const [filterActive, setFilterActive] = useState(null);
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
        const arrayActiveContract = [
            {
                value: ">",
                text: t('messageText.contractStatus.active'),
            },
            {
                value: "<=",
                text: t('messageText.contractStatus.notActive'),
            },
        ]

        const changeRoomFilter = (value) => {
            setFilterRoom(
                {
                    type: "filterColumn",
                    column: "roomId",
                    value: value
                }
            )
        }
        const changeUserFilter = (value) => {
            setFilterUser(
                {
                    type: "method",
                    column: "queryUser",
                    value: value
                }
            )
        }
        const changeActiveFilter = (value) => {
            setFilterActive(
                {
                    type: "checkTimeNow",
                    column: "endTime",
                    value: value
                }
            )
        }
        useEffect(() => {
            arrayFilter?.length > 0 && dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter))))
        }, [arrayFilter])
        useEffect(() => {
            if (filterRoom !== null && filterRoom?.value !== null) {
                addFilter(filterRoom)
            }
        }, [filterRoom])
        useEffect(() => {
            if (filterUser !== null && filterUser?.value !== null) {
                addFilter(filterUser)
            }
        }, [filterUser])
        useEffect(() => {
            if (filterActive !== null && filterActive?.value !== null) {
                addFilter(filterActive)
            }
        }, [filterActive])
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
                    <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeUserFilter(e.target.value)}>
                        <option>{t('messageText.changeValue', { attribute: t('page.user') })}</option>
                        {listUserAll?.map((item, index) => {
                            return (
                                <option key={index} value={item?.id}>{item?.fullname}</option>
                            )
                        })}
                    </CFormSelect>
                </div>
                <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                    <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeActiveFilter(e.target.value)}>
                        <option>{t('messageText.statusTextAttribute', { attribute: t('page.contract') })}</option>
                        {arrayActiveContract?.map((item, index) => {
                            return (
                                <option key={index} value={item?.value}>{item?.text}</option>
                            )
                        })}

                    </CFormSelect>
                </div>
            </>
        )
    }

    export default Contract
