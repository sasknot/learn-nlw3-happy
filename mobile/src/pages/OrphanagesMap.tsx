import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import mapMarker from '../images/map-marker.png'
import api from '../services/api'

interface NavigationParams {
  id?: number
}

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

export default function OrphanagesMap () {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useFocusEffect(() => {
    api.get('/orphanages').then(({ data }) => {
      setOrphanages(data)
    })
  })

  function navigateTo (route: string, options?: NavigationParams) {
    navigation.navigate(route, options)
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.5657212,
          longitude: -46.6534179,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        {
          orphanages.map((item) => {
            return (
              <Marker
                key={item.id}
                icon={mapMarker}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude
                }}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8
                }}
              >
                <Callout tooltip onPress={() => navigateTo('OrphanageDetails', { id: item.id }) }>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{item.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })
        }
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={() => navigateTo('SelectMapPosition') }>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: '100%',
    height: '100%'
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
