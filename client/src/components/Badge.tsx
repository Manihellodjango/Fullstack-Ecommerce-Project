import React from 'react'


const Badge: React.FC<{ quantity: number, sold: number }> = ({quantity,sold}) => {
  return (
    <div>
        <span className='badge1'>{sold} sold</span>
        <span className='badge2'>{sold === quantity ? "out of stock" : `${quantity-sold} In stock`}</span>
    </div>
  )
}

export default Badge