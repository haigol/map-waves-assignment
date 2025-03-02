import { MapComponent } from '../components'

const Home = () => {
  return (
    <div className='m-4 mx-auto flex-row'>
      <h1 className='text-4xl font-extrabold mb-2'>Map app</h1>
      <h2 className='text-xl mb-2'>
        Click anywhere on map to find heighest wave height of that given location
      </h2>
      <MapComponent />
    </div>
  )
}

export default Home
