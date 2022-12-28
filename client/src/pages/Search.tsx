import React from 'react'
import { useLocation } from 'react-router-dom'
import ProductList from '../components/ProductList'

export const Search = () => {
    const {state} = useLocation()
    console.log(state)
  return (
    <div>
        {state ? <ProductList products={state}/>: <p>No products found</p>}

    </div>
  )
}
