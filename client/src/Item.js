import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Item({item, user, userData}) {
  const [currentUserId, setCurrentUserId] = useState(1)
  const {id, price, name, description, image, condition, sold, tags, seller_name, user_id } = item
  

  const allTags= tags.map(tag => <p key={tag.hashtag}>Tags: {tag.hashtag}</p>)
  return (
    <div>
      {userData.id === user_id ? 
      <Link to={`/self`}>
        <h4>SELLER: {seller_name}</h4>
      </Link>
      :
      <Link to={`/user_profile/${user_id}`}>
        <h4>SELLER: {seller_name}</h4>
      </Link>
      }

      {/* <Link to={`/user_profile/${user_id}`}>
        <h4>SELLER: {seller_name}</h4>
      </Link> */}
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