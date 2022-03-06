import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import L from 'leaflet'
import { useData } from 'utils/data'
import { KIND_COLORS } from 'theme'
import 'leaflet/dist/leaflet.css'

const CENTER = [37.5207598,126.9209653]

const TILE_URL = 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  .marker {
    background: white;
    line-height: 30px;
    border-width: 2px;
    border-style: solid;
    text-align: center;
    width: 100px;
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
  }
`

const isInitialized = el => el && el._leaflet_id

const hasLocation = restaurant => restaurant.location?.lat && restaurant.location?.lng

const makeMarker = restaurant => {
  const color = KIND_COLORS[restaurant.kind] || KIND_COLORS['기타']

  const icon = L.divIcon({
    className: 'icon',
    html: `
      <div class="marker" style="border-color: ${color}">
        ${restaurant.name}
      </div>
    `
  })

  return L.marker([restaurant.location.lat, restaurant.location.lng], {
    icon,
  })
}

const JonmatMap = () => {
  const container = useRef(null)
  const map = useRef(null)
  const { restaurants } = useData()

  useEffect(() => {
    if (!container.current || isInitialized(container.current)) return

    map.current = L.map(container.current, {
      attributionControl: false,
      scrollWheelZoom: false,
      zoomControl: false
    })

    const zoom = L.control.zoom({
      position: 'bottomleft'
    })

    const tile = L.tileLayer(TILE_URL, {
      minZoom: 0,
      maxZoom: 20,
    })

    map.current.addControl(zoom)
    map.current.addLayer(tile)
    map.current.setView(CENTER, 13)

    return () => {
      map.current.off()
      map.current.remove()
    }
  }, [container.current])

  useEffect(() => {
    if (!isInitialized(map.current) || restaurants.length < 1) return

    const markers = restaurants
      .filter(hasLocation)
      .map(makeMarker)

    const group = L.layerGroup(markers)
    map.current.addLayer(group)

    return () => {
      map.current.removeLayer(group)
    }
  }, [restaurants])

  return (
    <Container ref={container} />
  )
}

export default JonmatMap
