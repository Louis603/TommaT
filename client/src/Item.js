import React from 'react'

function Item({item}) {
  const { price, name, description, image, condition, sold } = item

  return (
    <div>
      {price}
      {name}
      {description}
      <img src={image} style={{width:"10%"}}></img>
    </div>
  )
}

export default Item