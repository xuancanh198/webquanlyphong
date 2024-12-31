import { useSelector } from 'react-redux';
function Loading() {
  const loadding = useSelector((state) => state.reducers.loadding);
  console.log(loadding)
  return loadding === true ? 
  (
  <div className='modal-fullscreen '> </div> )  : null
  ;
}

export default Loading;
