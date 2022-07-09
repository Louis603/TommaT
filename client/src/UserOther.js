import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'

function UserOther({user, userData}) {
    const [profile, setProfile] = useState({items:[], reviews:[]})

    const { id } = useParams()

    useEffect(() =>{
        fetch(`/profile/${id}`)
        .then(resp => resp.json())
        .then((data) => {
            setProfile(data)
        })
    }, []);

    
    const soldFilter = profile.items.filter(item => item.sold === true)
    const sellingFilter = profile.items.filter(item => item.sold !== true)

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
  
  return (
    <div>
        <h2>{profile.username}'s Profile</h2>
        <h3>Selling</h3>
        {selling}
        <h3>Sold</h3>
        {sold}
    </div>
  )
}

export default UserOther