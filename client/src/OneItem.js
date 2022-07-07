import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function OneItem({user}) {
    const [singleItem, setSingleItem] = useState({})
    const { id } = useParams()

    useEffect(() =>{
        fetch(`/items/${id}`)
        .then(resp => resp.json())
        .then((data) => setSingleItem(data))
      }, []);

    function handleClick(){
      const form ={
        item_id: singleItem.id,
        user_id: user.id
      }
      fetch("/carts",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).then(res => res.json())
        .then(data => console.log(data))
    }




  return (
    <div>
        <h4>SELLER: {singleItem.seller}</h4>
        {singleItem.name}
        {singleItem.price}
        <img src={singleItem.image} style={{width: "20%"}}/>
        <button onClick={handleClick}>BUY</button>
    </div>
  )
}

export default OneItem