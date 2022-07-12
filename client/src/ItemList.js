import React from 'react'
import Item from './Item'

function ItemList({itemsArr, user, userData}) {
  const unSold = itemsArr.filter(item => item.sold !== true)
  const itemsMapped = unSold.map(item => {
    return (
      <Item
      
      key={item.id}
      item={item}
      user={user}
      userData={userData}
      // price={item.price}
      // name={item.name}
      // description={item.description}
      // image={item.image}
      />
    )
  })

  return (
    <div>
      <h1 style={{justifyContent:"start", marginLeft:"10%"}}>Shop Tommat</h1>
    <div className="selling-page">
        {itemsMapped}
    </div>
    </div>
  )
}

export default ItemList