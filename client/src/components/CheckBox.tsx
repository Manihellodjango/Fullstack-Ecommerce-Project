import React from 'react'

//@ts-ignore
const CheckBox = ({category,onHandleSelectedCategory}) => {

    const handleChange = (e:any) => {
        onHandleSelectedCategory(e.target.value)
        
    }
  return (
    <div>
        <input type="checkbox" name="category" value={category._id} onChange={handleChange}/>
        <label htmlFor='category'>{category.name}</label>
    </div>
  )
}

export default CheckBox