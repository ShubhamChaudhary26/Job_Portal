// import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQueryText } from '@/redux/jobSlice'


const FilterData = [
    {
        filterType:"Location",
        array:[ "Pune","vapi","Bhusawal","Mumbai", "Delhi NCR"]
    },
    {
        filterType:"Industry",
        array:["Frontend developer","Backend developer","Mern Stack Developer","Graphic designer"]
    }
    // ,{
    // filterType:"Salary",
    // array:['12']
    // }
]
const FilterCard = () => {
    const [selectedValue, SetSelectedValue] = useState('')
    const dispatch = useDispatch()
    const HandleChange = (value)=>{
        SetSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchQueryText(selectedValue))
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'>
    <h1 className='font-bold text-lg'>Filter Jobs</h1>
    <hr className='mt-3' />
        <RadioGroup onValueChange={HandleChange} value={selectedValue} >
        {
                    FilterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>

    </div>
  )
}

export default FilterCard