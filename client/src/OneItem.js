import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Button, ButtonGroup, useToast  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Divider } from '@chakra-ui/react'

function OneItem({user, userData}) {
    const [singleItem, setSingleItem] = useState({tags:[], images_urls:[]})
    const [displayImage, setDisplayImage] = useState()
    const [form, setForm] = useState({
      user_id: "",
      item_id: ""
    })
    const { id } = useParams()
    const toast = useToast()

    // console.log(user.id)
    // console.log(displayImage)

    useEffect(() =>{
        fetch(`/items/${id}`)
        .then(resp => resp.json())
        .then((data) => {
          setSingleItem(data)
          setForm({...form, user_id: 1, item_id: data.id})
          setDisplayImage(data.images_urls[0])
        })
      }, []);

    function handleClick(){
      // setForm({...form, user_id: 1, item_id: singleItem.id})
          // setForm({...form, item_id: singleItem.id})
      // const form ={
      //   item_id: singleItem.id,
      //   user_id: user.id
      // }
      fetch("/carts",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).then(res => {
        if(res.ok){
          toast({
            title: 'Added To Cart',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })
        }else {
          res.json()
          .then(data => {
            toast({
              title: data.error,
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: 'top'
            })
          })

        }
      })
    }

    function handleClickWish(){
      fetch("/likes",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).then(res => {
        if(res.ok){
          toast({
            title: 'Added To Wishlist',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          })
        }else {
          res.json()
          .then(data => {
            toast({
              title: data.error,
              status: 'warning',
              duration: 3000,
              isClosable: true,
              position: 'top'
            })
          })

        }
      })
    }

    const tags = singleItem.tags.map(tag => <p key={tag.hashtag} className='item-focus-tags'>#{tag.hashtag}</p>)
    // console.log(singleItem.tags)

    let button;
    if(userData.id === singleItem.user_id){
      button = null
    } else if(singleItem.sold){
      button = <p>ITEM SOLD</p>
    }else{
      button = <Button onClick={handleClick} colorScheme='teal'>ADD TO CART</Button>
    }
    
    let buttonWishlist;
    if(userData.id === singleItem.user_id){
      buttonWishlist = null
    } else if(singleItem.sold){
      buttonWishlist = null
    }else{
      buttonWishlist = <Button style={{marginLeft:"30px"}} onClick={handleClickWish} colorScheme='blue'>ADD TO WISHLIST</Button>
    }

    const imageThumb = singleItem.images_urls.map(image => {
      return(
        <img 
        key={image}
        onClick={() => handleImageClick(image)}
        className='thumbnail-image-left' 
        src={image}
        ></img>
      )
    })

    function handleImageClick(image){
      setDisplayImage(image)
    }



  return (
    <div style={{width: "85%", marginTop:"40px"}}>
       <div className='item-focus-container'>
        <div className='thumbnail-image-container'>
          {imageThumb}
        </div>
        <div className="item-focus-image">
          <img src={displayImage} style={{width: "600px", height:"650px", objectFit:"contain"}}/>
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
          {buttonWishlist}
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