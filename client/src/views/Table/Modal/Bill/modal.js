import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addTypeRoom, getListServiceRoomContract } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setModalAdd } from "../../../../redux/accction/listTable";
import Select from 'react-select';
import { formatPrice } from "../../../../service/FunService/funweb"
function Example({ title }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd);
    const listRoomAll = useSelector((state) => state.listTable.listRoomAll);
    const listServiceRoom = useSelector((state) => state.listTable.listServiceRoom);
    const [roomId, setRoomId] = useState(null);
    const [listRoomId, setListRoomId] = useState([]);
    const [validated, setValidated] = useState(false);

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    const formik = useFormik({
        initialValues: {
            roomId: '',
        },
        validationSchema: Yup.object({
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addTypeRoom(values, resetForm))
        }
    });
    useEffect(() => {
        if (roomId) {
            dispatch(getListServiceRoomContract(roomId.value))
            formik.setFieldValue('roomId', `${roomId.value}`);
        }
    }, [roomId])
    useEffect(() => {
        if (listRoomAll !== null) {
            setListRoomId(
                listRoomAll.length > 0 && listRoomAll.map(item => ({
                    value: item.id,
                    label: item.name,
                    code: item.code
                }))
            );
        }
    }, [listRoomAll]);
    console.log(listServiceRoom)
    return (
        <>
            <div className='modal-button flex_center' onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('actionView.create')} {title}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Row className="mb-3 mt-3">
                            <Form.Group as={Col} md="12" className='mb-3 mt-3 '>
                                <Select
                                    value={roomId}
                                    onChange={(e) => setRoomId(e)}
                                    options={listRoomId}
                                    placeholder={t('messageText.searchTitel', { attribute: t('page.room') })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.roomId}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <table className="mb-3 mt-3">
                            {listServiceRoom?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <Form.Label className="m-0 p-0 flex-shrink-0">{item?.service?.name} :</Form.Label>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="px-2 py-1 text-input-quantity flex-grow-1"
                                                style={{ minWidth: "80px" }}
                                            />
                                        </td>
                                        <td className='ps-2'>
                                            <p className="m-0 p-0 flex-shrink-0">
                                                {(item?.service?.price && formatPrice(item?.service?.price)) + " / " + t(`lableView.service.unitValue.${item?.service?.unit}`)}
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {t('actionView.close')}
                        </Button>
                        <Button variant="primary" type="submit">
                            {t('actionView.create')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Example;
