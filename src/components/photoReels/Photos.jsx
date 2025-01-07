import React,{useState} from 'react'
import photos from '../../utils/photos.json'
const Photos = () => {
  const [viewAll, setViewAll] = useState(false)
  return (
    <>
    <div className='grid grid-cols-12 gap-4 mx-32 max-xl:mx-16 max-md:mx-8 max-sm:mx-16'>
      {(photos.length <=6 || viewAll)? photos.map((photo)=>(
        <>
          <img src={photo.img} className='col-span-4 max-lg:col-span-6 max-sm:col-span-12 h-96 w-96'/>
        </>
      )): photos.slice(0,6).map((photo)=>(
        <>
          <img src={photo.img} className='col-span-4 max-lg:col-span-6 max-sm:col-span-12 h-96 w-96'/>
        </>
      ))}
    </div>
      {(!viewAll && photos.length>6)?(
        <>
        <div className="text-center mt-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            onClick={()=>setViewAll(true)}>View All</button>
        </div>
        </>
      ):viewAll && 
        <>
          <div className="text-center mt-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            onClick={()=>setViewAll(false)}>View Less</button>
          </div>
        </>
      }
    
    </>
  )
}

export default Photos