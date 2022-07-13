import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Item({item, user, userData}) {
  const [currentUserId, setCurrentUserId] = useState(1)
  const {id, price, name, description, image, condition, sold, tags, seller_name, user_id, images_urls } = item
  

  // const allTags= tags.map(tag => <p key={tag.hashtag}>Tags: {tag.hashtag}</p>)
  return (
   
    <div className="single-item-selling">
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
      
      {/* {allTags} */}

      <Link to={`/items/${id}`}>
      <img src={images_urls[0]} className='single-item-selling-img'></img>
      </Link>

      <h3>{name}</h3>
      <p>${price}</p>
    </div>

  )
}

export default Item