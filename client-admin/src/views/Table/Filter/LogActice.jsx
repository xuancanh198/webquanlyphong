import React, { useState, useEffect } from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setBaseDecode } from "../../../redux/accction/listTable";
import {
    ROLE,
    STAFF,
    ROOM,
    TYPE_ROOM,
    FLOOR,
    BUILDING,
    SERVICE,
    FURNITURE,
    USER,
    CONTRACT,
    BILL,
    PERMISSTION,
    ACCTION,
    SYSTEM,
    PERMISSTION_DETAIL,
    SETTING,
} from "../../../Constants/Page";
import {
    LOGTYPEADMIN, LOGTYPEUSER, CREATED, UPDATED, DELETED
}  from "../../../Constants/LogActive";
function User() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [subjectType, setSubjectType] = useState(null);
    const [logName, setLogName] = useState(null);
    const [event, setEvent] = useState(null)
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
    useEffect(() => {
        arrayFilter?.length > 0 && dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter))))
    }, [arrayFilter])
    const changeSubjectType = (value) => {
        setSubjectType(
            {
                type: "filterColumn",
                column: "subject_type",
                value: value
            }
        )
    }
    const changeLogName = (value) => {
        setLogName(
            {
                type: "filterColumn",
                column: "log_name",
                value: value
            }
        )
    }
    const changeEvent = (value) => {
        setEvent(
            {
                type: "filterColumn",
                column: "event",
                value: value
            }
        )
    }
    useEffect(() => {
        if (subjectType !== null && subjectType?.value !== null) {
            addFilter(subjectType)
        }
    }, [subjectType])
    useEffect(() => {
        if (logName !== null && logName?.value !== null) {
            addFilter(logName)
        }
    }, [logName])
    useEffect(() => {
        if (event !== null && event?.value !== null) {
            addFilter(event)
        }
    }, [event])
    const arraySubject = [
        {
            name: t('page.role'),
            code: ROLE
        },
        {
            name: t('page.staff'),
            code: STAFF
        },
        {
            name: t('page.room'),
            code: ROOM
        },
        {
            name: t('page.typeRoom'),
            code: TYPE_ROOM
        },
        {
            name: t('page.floor'),
            code: FLOOR
        },
        {
            name: t('page.building'),
            code: BUILDING
        },
        {
            name: t('page.service'),
            code: SERVICE
        },
        {
            name: t('page.furniture'),
            code: FURNITURE
        },
        {
            name: t('page.user'),
            code: USER
        },
        {
            name: t('page.contract'),
            code: CONTRACT
        },
        {
            name: t('page.bill'),
            code: BILL
        },
        {
            name: t('page.permisstion'),
            code: PERMISSTION
        },
        {
            name: t('page.acction'),
            code: ACCTION
        },
        {
            name: t('page.system'),
            code: SYSTEM
        },
        {
            name: t('page.permisstionDetail'),
            code: PERMISSTION_DETAIL
        },
        {
            name: t('page.setting'),
            code: SETTING
        },
    ];
    const arrayLogName = [
        {
            name: t('lableView.activeLog.log_type.adminAction'),
            code: LOGTYPEADMIN
        },
        {
            name: t('lableView.activeLog.log_type.userAction'),
            code: LOGTYPEUSER
        },
    ]
    const arrayEvent = [
        {
            name: t('actionView.created'),
            code: CREATED
        },
        {
            name: t('actionView.updated'),
            code: UPDATED
        },
        {
            name: t('actionView.deleted'),
            code: DELETED
        },
    ]
    return (
        <>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeSubjectType(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('lableView.activeLog.subject_type') })}</option>
                    {arraySubject?.map((item, index) => {
                        return (
                            <option key={index} value={item?.code}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeLogName(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('lableView.activeLog.log_name') })}</option>
                    {arrayLogName?.map((item, index) => {
                        return (
                            <option key={index} value={item?.code}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeEvent(e.target.value)}>
                    <option>{t('messageText.changeValue', { attribute: t('lableView.activeLog.event') })}</option>
                    {arrayEvent?.map((item, index) => {
                        return (
                            <option key={index} value={item?.code}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
        </>
    )
}

export default User
