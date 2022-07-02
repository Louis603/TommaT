import React from 'react'
import { Link } from 'react-router-dom'

function UserSelf({user, userData}) {
    const profile = userData.items.map(item => {
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
  return (
    <div>
        <h2>PROFILE PAGE</h2>
        {profile}
    </div>
  )
}

export default UserSelf