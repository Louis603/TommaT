import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

function UserSelf({user, userData}) {
    const [rating, setRating] = useState(0)

    // console.log(userData.order_numbers)
    // console.log(userData.items)
    const soldFilter = userData.items.filter(item => item.sold === true)
    const sellingFilter = userData.items.filter(item => item.sold !== true)
    // console.log(soldFilter.length)
    const selling = sellingFilter.map(item => {
        return (
            <div key={item.id}> 
                <p>{item.name}</p>
                <p>{item.price}</p>
                <img src={item.image} style={{width:"10%"}}/>
                <Link to={`/items/${item.id}`}>
                    <button>See more</button>
                </Link>
            </div>
        )
    })
    const sold = soldFilter.map(item => {
        return (
            <div key={item.id}> 
                <p>{item.name}</p>
                <p>{item.price}</p>
                <img src={item.image} style={{width:"10%"}}/>
                <Link to={`/items/${item.id}`}>
                    <button>See more</button>
                </Link>
            </div>
        )
    })

    const bought = userData.order_numbers.map(order => {
        return(
            <div key={order.id}>
                <img src={order.item_details.image} style={{width:"10%"}}></img>
                <Link to={`/new_review/${order.item_details.id}`}>
                    <button>Review Item</button>
                </Link>
            </div>
        )
    })


  return (
    <div>
    {user ? (
        <div>
        <h2>PROFILE PAGE</h2>
        <h4>Your Seller Rating</h4>
        <div>
        <Rating style={{display: "flex"}}ratingValue={userData.average_score} readonly="true" />
        </div>
        {sellingFilter.length === 0 ? ( null) : (
            <div>
                <h3>SELLING</h3>
                {selling}
            </div>
        )}
        
        {soldFilter.length === 0 ? ( null) : (
            <div>
                <h3>SOLD </h3> 
                {sold}
            </div>
        )}
        
        {bought.length === 0 ? ( null) : (
            <div>
                <h3>BOUGHT</h3> 
                {bought}
            </div>
        )}
        
        {/* <h3>BOUGHT
            {bought}
        </h3> */}
        </div>) 
    : null }
    </div>
    
  )
}

export default UserSelf