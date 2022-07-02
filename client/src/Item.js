import React from 'react'
import { Link } from 'react-router-dom'

function Item({item}) {
  const {id, price, name, description, image, condition, sold, tags, seller } = item
  const allTags= tags.map(tag => <p key={tag.hashtag}>Tags: {tag.hashtag}</p>)

  return (
    <div>
      <h4>SELLER: {seller}</h4>
      <p>Price: {price}</p>
      <p>Title: {name}</p>
      <p>Description: {description}</p>
      {allTags}
      <img src={image} style={{width:"10%"}}></img>
      <Link to={`/items/${id}`}>
        <button>See more</button>
      </Link>
    </div>
  )
}

export default Item