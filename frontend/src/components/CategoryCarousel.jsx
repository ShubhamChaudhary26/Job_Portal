import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchQueryText } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'



const category = [
    "Frontend Developer",
    "backend Developer",
    "FullStack Developer",
    "Graphics Designer",
    "Data Analytics",
    "Data Science",
]



const CategoryCarousel = () => {
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const searchJobhandle = (query) => {
        dispatch(setSearchQueryText(query));
        navigate("/browse")
      };
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((curElem,index)=>(
                        <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                            <Button onClick={()=>searchJobhandle(curElem)} key={index} variant="outline" className="rounded-full">{curElem}</Button>
                        </CarouselItem>
                    ))
                }
              
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel