import Leaflet from 'leaflet'
import mapMarkerImg from '../images/map-marker.svg'

export default Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 58],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})
