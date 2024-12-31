import React, { useState, useEffect } from 'react'
import {
    CFormSelect,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setBaseDecode } from "../../../redux/accction/listTable"
function Room() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const listFurnituresAll = useSelector((state) => state.listTable.listFurnituresAll);
    const listServiceAll = useSelector((state) => state.listTable.listServiceAll);
    const listTypeRoomAll = useSelector((state) => state.listTable.listTypeRoomAll);
    const listBuildingAll = useSelector((state) => state.listTable.listBuildingAll);
    const listFloor = useSelector((state) => state.listTable.listFloorAll);
    const [filterFloor, setFilterFloor] = useState(null);
    const [filterBuilding, setFilterBuilding] = useState(null);
    const [filterTypeRoom, setFilterTypeRoom] = useState(null);
    const [filterFurniture, setFilterFurniture] = useState(null);
    const [filterService, setFilterService] = useState(null);
    const [arrayFurniture, setArrayFurniture] = useState([]);
    const [arrayService, setArrayService] = useState([]);
     const [arrayFilter, setArrayFilter] = useState([]);
    useEffect(() => {
        if (filterFloor !== null && filterFloor?.value !== null) {
            addFilter(filterFloor)
        }
    }, [filterFloor])
    useEffect(() => {
        if (arrayService?.length  > 0) {
            setFilterService(
                {
                    type: "filterRelationship",
                    relationship: "service_room",
                    column: "serviceId",
                    value: arrayService
                }
            )
        }
        else{
            removeFilter('serviceId')
        }
    }, [arrayService])
    useEffect(() => {
        if (arrayFurniture?.length > 0) {
            setFilterFurniture(
                {
                    type: "filterRelationship",
                    relationship: "furniture_room",
                    column: "furnitureId",
                    value: arrayFurniture
                }
            )
        }
        else {
            removeFilter('furnitureId')
        }
    }, [arrayFurniture])
    useEffect(() => {
        if (filterBuilding !== null && filterBuilding?.value !== null ) {
            addFilter(filterBuilding)
        }
    }, [filterBuilding])
    useEffect(() => {
        if (filterTypeRoom !== null && filterTypeRoom?.value !== null) {
            addFilter(filterTypeRoom)
        }
    }, [filterTypeRoom])

    useEffect(() => {
        if (filterFurniture !== null && filterFurniture?.value !== null && filterFurniture?.value?.length > 0) {
            addFilter(filterFurniture)
        }
    }, [filterFurniture])
    useEffect(() => {
        if (filterService !== null && filterService?.value !== null && filterService?.value?.length > 0) {
            addFilter(filterService)
        }
    }, [filterService]) 
    useEffect(() => {
        if (filterTypeRoom !== null && filterTypeRoom?.value !== null) {
            addFilter(filterTypeRoom)
        }
    }, [filterTypeRoom])
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
    const removeFilter = (column) => {
        setArrayFilter((prevArray) => {
            return prevArray.filter((filter) => filter?.column !== column);
        });
    };

    const changeFloor = (value) => {
        setFilterFloor(
            {
                type: "filterColumn",
                column: "floorId",
                value: value
            }
        )
    }
    const changeBuilding = (value) => {
        setFilterBuilding(
            {
                type: "filterColumn",
                column: "buildingId",
                value: value
            }
        )
    }
    const changeTypeRoom = (value) => {
        setFilterTypeRoom(
            {
                type: "filterColumn",
                column: "typeRoomId",
                value: value
            }
        )
    }
    const changeServices = (checked, id) => {
        if (checked === true) {
            const checkArray = arrayService?.some((serviceId) => serviceId === Number(id));
            if (checkArray !== true) {
                setArrayService((prev) => [...prev, id]);
            }
        } else {
            setArrayService((prev) => prev.filter((item) => item !== id));
        }
    }
    const changeFurniture = (checked, id) => {
        if (checked === true) {
            const checkArray = arrayFurniture?.some((FurnitureId) => FurnitureId === Number(id));
            if (checkArray !== true) {
                setArrayFurniture((prev) => [...prev, id]);
            }
        } else {
            setArrayFurniture((prev) => prev.filter((item) => item !== id));
        }
    }
  
    useEffect(()=>{
        arrayFilter?.length > 0 ? dispatch(setBaseDecode(btoa(JSON.stringify(arrayFilter)))) : dispatch(setBaseDecode(null))
        },[arrayFilter])
    return (
        <>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeTypeRoom(e.target.value)}>
                    <option selected disabled>{t('messageText.changeValue', { attribute: t('page.typeRoom') })}</option>
                    {listTypeRoomAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeBuilding(e.target.value)}>
                    <option selected disabled>{t('messageText.changeValue', { attribute: t('page.building') })}</option>
                    {listBuildingAll?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
                <CFormSelect aria-label="Default select example" className='w-full' onChange={(e) => changeFloor(e.target.value)}>
                    <option selected disabled>{t('messageText.changeValue', { attribute: t('page.floor') })}</option>
                    {listFloor?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>{item?.name}</option>
                        )
                    })}
                </CFormSelect>
            </div>
            <div class="col-12 d-block gap-3 mt-4 ">
                <Form.Label className='font-weight'> {t('lableView.room.service')} : </Form.Label> <br />
                <div className='d-flex flex-wrap'>
                    {listServiceAll && listServiceAll.map((item, index) => (
                        <div key={item.id} className={`${index === 0 ? "" : "ms-3"}`}>
                            <input type="checkbox"  value={item.id} onChange={(e) => changeServices(e.target.checked, item.id)} />
                            <label className='ms-1'>{item.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div class="col-12 d-block gap-3 mt-4">
                <Form.Label className='font-weight'> {t('lableView.room.furniture')} : </Form.Label> <br />
                <div className='d-flex flex-wrap'>
                    {listFurnituresAll && listFurnituresAll.map((item, index) => (
                        <div key={item.id} className={`${index === 0 ? "" : "ms-3"}`} onChange={(e) => changeFurniture(e.target.checked, item.id)}>
                            <input type="checkbox" value={item.id} />
                            <label className='ms-1'>{item.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Room
