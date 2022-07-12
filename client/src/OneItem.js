import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Divider } from '@chakra-ui/react'

function OneItem({user, userData}) {
    const [singleItem, setSingleItem] = useState({tags:[]})
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

    const tags = singleItem.tags.map(tag => <p className='item-focus-tags'>#{tag.hashtag}</p>)
    console.log(singleItem.tags)

    let button;
    if(userData.id === singleItem.user_id){
      button = null
    } else if(singleItem.sold){
      button = <p>ITEM SOLD</p>
    }else{
      button = <Button onClick={handleClick} colorScheme='teal'>ADD TO CART</Button>
    }



  return (
    <div style={{width: "85%", marginTop:"40px"}}>
       <div className='item-focus-container'>
        <div className="item-focus-image">
          <img src={singleItem.image} style={{width: "600px"}}/>
        </div>
        <div className='item-focus-description'>
          <h1>{singleItem.name}</h1>
          <h2>${singleItem.price}</h2>
          <h2>DESCRIPTION 
          <p>{singleItem.description}</p></h2>
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
          {/* {userData.id === singleItem.user_id ? null : <Button onClick={handleClick} colorScheme='teal'>ADD TO CART</Button>} */}
          {button}
          <Divider style={{marginTop:"20px"}}/>
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Condition</p>
            <p className='item-focus-small-right'>{singleItem.condition}</p>
          </div>
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Category</p>
            <p className='item-focus-small-right'>{singleItem.category}</p>
          </div>
          <div className='item-focus-small'>
            <p className='item-focus-small-left'>Tags</p>
            <div className='item-focus-small-right'>
              {tags}
            </div>
          </div>
          <h3 style={{marginTop:"30px", fontWeight:"bold"}}>Buyer Protection Guarantee
            <p>Money Back Guarantee</p>
            <p>Trust me</p>
          </h3>
      
        </div>
       </div>
    </div>
  )
}

export default OneItem