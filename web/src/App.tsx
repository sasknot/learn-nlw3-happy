import React from 'react'

import 'leaflet/dist/leaflet.css'
import './styles/global.css'
import Routes from './routes'

navigator.geolocation.getCurrentPosition((position: Position) => {
  const { latitude, longitude } = position.coords
  console.log('position', position, latitude, longitude)
}, (error: PositionError) => {
  console.log('error', error)
  // put default location
})

navigator.geolocation.getCurrentPosition((() => {}), () => {})

export default function App() {
  return (
    <Routes />
  )
}
