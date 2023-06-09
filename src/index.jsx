import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import '@aws-amplify/ui-react/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
