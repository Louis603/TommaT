import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function OneItem({user, userData}) {
    const [singleItem, setSingleItem] = useState({})
    const { id } = useParams()

    // console.log(user.id)
    console.log(singleItem)

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
    <div style={{width: "85%"}}>
       <div className='item-focus-container'>
        <div className="item-focus-image">
          <img src={singleItem.image} style={{width: "600px"}}/>
        </div>
        <div className='item-focus-description'>
          <h1>ITEM NAME NAME NAME NAME NAME NAME NAMENAMENAMENAMENAME</h1>
          <h2>$35</h2>
          <h2>DESCRIPTION 
          <p>description </p></h2>
          <h3 style={{marginBottom:"20px", width:"100px"}}>
            Sold By:
            {userData.id === singleItem.user_id ? 
              <Link to={`/self`}>
                <h4 className='links'>{singleItem.seller_name}</h4>
              </Link>
              :
              <Link to={`/user_profile/${singleItem.user_id}`}>
                <h4 className='links'>{singleItem.seller_name}</h4>
              </Link>
              }
          </h3>
          {userData.id === singleItem.user_id ? null : <Button onClick={handleClick} colorScheme='teal'>ADD TO CART</Button>}
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Condition</p>
            <p className='item-focus-small-right'>New</p>
          </div>
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Category</p>
            <p className='item-focus-small-right'>category</p>
          </div>
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Tags</p>
            <p className='item-focus-small-right'>#ps4</p>
          </div>
          <h3>Buyer Protection Guarantee
            <p>Money Back Guarantee</p>
            <p>Trust me</p>
          </h3>
      
        </div>
       </div>
    </div>
  )
}

export default OneItem