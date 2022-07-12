import React from 'react'
import Item from './Item'

function SearchResults({searchItemsArr, user, userData}) {
  console.log(searchItemsArr)
    const unSold = searchItemsArr.filter(item => item.sold !== true)
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

export default SearchResults