import ReactDOM from 'react-dom'
import './Loader.css'

const Loader=({isLoading})=>{
if(!isLoading) return;
return ReactDOM.createPortal(
    <div className="fullscreen-loader">
      <div className="spinner" />
    </div>,
    document.getElementById('loading')
)
}
export default Loader;