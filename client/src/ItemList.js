import React from 'react'
import Item from './Item'

function ItemList({itemsArr}) {

  const itemsMapped = itemsArr.map(item => {
    return (
      <Item
      key={item.id}
      item={item}
      // price={item.price}
      // name={item.name}
      // description={item.description}
      // image={item.image}
      />
    )
  })

  return (
    <div>
        {itemsMapped}
    </div>
  )
}

export default ItemList