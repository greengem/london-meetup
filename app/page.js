"use client";
import GoogleMapView from '@/components/GoogleMapView';
import { useContext, useEffect, useState } from 'react';
import GlobalApi from '@/utils/GlobalApi';
import CategoryList from '@/components/Form/CategoryList';
import RangeSelect from '@/components/Form/RangeSelect';
import SelectRating from '@/components/Form/SelectRating';
import BusinessList from '@/components/BusinessList';
import { UserLocationContext } from '@/context/UserLocationContext';
import SkeletonLoading from '@/components/SkeletonLoading';

export default function Home() {
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg,setBusinessListOrg]=useState([])
  const [loading, setLoading] = useState(true);
  const {userLocation, setUserLocation} = useContext(UserLocationContext);

  useEffect(() => {
    getGooglePlace();
  },[category, radius])

  const getGooglePlace = () => {
    setLoading(true)
    GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng).then(resp => {
      setBusinessList(resp.data.product.results);
      setLoading(false)
    })
  }

  const onRatingChange=(rating)=>{
    if(rating.length==0)
    {
      setBusinessList(businessListOrg);
    }
   const result= businessList.filter(item=>{
   for(let i=0;i<rating.length;i++)
   {
      if(item.rating>=rating[i])
      {
        return true;

      }
      return false
   }
   })

    console.log(result)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 '>
        <div className='p-3 bg-white'>
           <CategoryList onCategoryChange={(value)=>setCategory(value)}/>
           <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>
           <SelectRating onRatingChange={(value)=>onRatingChange(value)}/>
        </div>
        <div className=' col-span-3'>
          <GoogleMapView  businessList={businessList}/>
          <div className='md:absolute mx-2 w-[90%] md:w-[74%]
           bottom-36 relative md:bottom-3'>
        {!loading?  <BusinessList businessList={businessList} />
          :
          <div className='flex gap-3'>
          {[1,2,3,4,5].map((item,index)=>(
              <SkeletonLoading key={index} />
          ))}
          </div>
          }
          </div>
        </div>
    </div>
  )
}