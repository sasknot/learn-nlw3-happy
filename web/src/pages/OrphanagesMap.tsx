import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/pages/orphanages-map.css'
import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

export default function OrphanagesMap () {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(({ data }) => {
      setOrphanages(data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        center={[-23.5657212, -46.6534179]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={process.env.REACT_APP_MAP_TILE_URL} />
        {
          orphanages.map((item) => {
            return (
              <Marker
                position={[item.latitude, item.longitude]}
                icon={mapIcon}
                key={item.id}
              >
                <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                  {item.name}
                  <Link to={`/orphanages/${item.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  )
}
