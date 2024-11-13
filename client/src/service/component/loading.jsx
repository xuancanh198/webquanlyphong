import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';

function Loading() {
  const { t } = useTranslation();
  const loadding = useSelector((state) => state.reducers.loadding);

  useEffect(() => {
    let toastId;

    if (loadding) {
      toastId = toast.info(
        <div className='d-flex align-items-center'>
          <ClipLoader color="#007bff" size={24} />
          <span style={{ marginLeft: '10px' }}>{t('loading')}</span>
        </div>,
        {
          autoClose: false, 
          closeOnClick: false,
          draggable: false,
        }
      );
    } else {
      if (toastId) {
        toast.dismiss(toastId);
      }
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [loadding, t]);

  return null;
}

export default Loading;
