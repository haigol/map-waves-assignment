import { useCallback, useState } from 'react'
import Map, { Popup } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMutation } from '@tanstack/react-query'
import axiosClient from '../data/axiosClient'

export const MapComponent = () => {
  const [clickedCoords, setClickedCoords] = useState<{
    longitude: number
    latitude: number
  } | null>(null)

  const { mutate, data, isError } = useMutation({
    mutationFn: async ({ lon, lat }: { lon: number; lat: number }) => {
      const response = await axiosClient.post('/hmaxByCoords', { lon, lat })
      return response.data
    },
  })

  const handleMapClick = useCallback(
    (event: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = event.lngLat
      setClickedCoords({ longitude: lng, latitude: lat })
      setClickedCoords({ longitude: lng, latitude: lat })
      mutate({ lon: lng, lat })
    },
    [mutate]
  )

  return (
    <Map
      initialViewState={{
        latitude: 60.39299,
        longitude: 5.1241,
        zoom: 10,
      }}
      style={{ width: '90vw', height: '80vh' }}
      onClick={handleMapClick}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={'mapbox://styles/mapbox/streets-v11'}
      doubleClickZoom={false}
    >
      {clickedCoords && (
        <Popup
          longitude={clickedCoords.longitude}
          latitude={clickedCoords.latitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setClickedCoords(null)}
          anchor='top'
        >
          <p>Longitude: {clickedCoords.longitude.toFixed(1)}</p>
          <p>Latitude: {clickedCoords.latitude.toFixed(1)}</p>
          {isError ? (
            <p className='text-red-500'>Failed to fetch wave height</p>
          ) : data !== 'nan' ? (
            <p>Highest wave height (max hmax): {data}</p>
          ) : (
            <p>No wave height recorded at location</p>
          )}
        </Popup>
      )}
    </Map>
  )
}
