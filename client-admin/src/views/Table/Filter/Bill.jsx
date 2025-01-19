import React, { useState, useEffect } from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseDecode } from "../../../redux/accction/listTable"
function Bill() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listRoomAll = useSelector((state) => state.listTable.listRoomAll);
    const listUserAll = useSelector((state) => state.listTable.listUserAll);
    const listStaffAll = useSelector((state) => state.listTable.listStaffAll);
    const listBuildingAll = useSelector((state) => state.listTable.listBuildingAll);
    const [filterRoom, setFilterRoom] = useState(null);
    const [filterUser, setFilterUser] = useState(null);
    const [filterActive, setFilterActive] = useState(null);
    const [filterBuilding, setFilterBuilding] = useState(null);
    const [filterStaff, setFilterStaff] = useState(null);
    const [filterBillPayMethod, setFilterBillPayMethod] = useState(null);
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
    const arrayActiveBill = [
        {
            value: "null",
            text: t('messageText.BillStatus.notPaid'),
        },
        {
            value: "notNull",
            text: t('messageText.BillStatus.payed'),
        },
    ]
    const arrayPayMethod = [
        {
            value: 0,
            text: t('messageText.BillPayMethod.cashPayment'),
        },
        {
            value: 1,
            text: t('messageText.BillPayMethod.bankTransfer'),
        },
        {
            value: 2,
            text: t('messageText.BillPayMethod.paymentViaWallet'),
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
                type: "filterColumn",
                column: "userId",
                value: value
            }
        )
    }
    const changeBuildingFilter = (value) => {
        setFilterBuilding(
            {
                type: "method",
                column: "queryBuilding",
                value: value
            }
        )
    }
    const changeStaffFilter = (value) => {
        setFilterStaff(
            {
                type: "filterColumn",
                column: "staffId",
                value: value
            }
        )
    }
    const changeBillPayMethod = (value) => {
        setFilterBillPayMethod(
            {
                type: "filterColumn",
                column: "formPayment",
                value: value
            }
        )
    }
    const changeActiveFilter = (value) => {
        setFilterActive(
            {
                type: "checkNull",
                column: "pay_at",
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

    useEffect(() => {
        if (filterBuilding !== null && filterBuilding?.value !== null) {
            addFilter(filterBuilding)
        }
    }, [filterBuilding])
    useEffect(() => {
        if (filterStaff !== null && filterStaff?.value !== null) {
            addFilter(filterStaff)
        }
    }, [filterStaff])
    useEffect(() => {
        if (filterBillPayMethod !== null && filterBillPayMethod?.value !== null) {
            addFilter(filterBillPayMethod)
        }
    }, [filterBillPayMethod])
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
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeStaffFilter(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('messageText.staffCreate') })}</option>
                    {listStaffAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.fullname}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeBuildingFilter(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('page.building') })}</option>
                    {listBuildingAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeActiveFilter(e.target.value)}>
                    <option>{t('messageText.statusTextAttribute', { attribute: t('page.bill') })}</option>
                    {arrayActiveBill?.map((item, index) => {
                        return (
                            <option key={index} value={item?.value}>{item?.text}</option>
                        )
                    })}

                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeBillPayMethod(e.target.value)}>
                    <option>{t('messageText.BillPayMethodText')}</option>
                    {arrayPayMethod?.map((item, index) => {
                        return (
                            <option key={index} value={item?.value}>{item?.text}</option>
                        )
                    })}

                </CFormSelect>
            </div>
        </>
    )
}

export default Bill
