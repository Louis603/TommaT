import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Button, Avatar } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function UserSelf({user, userData, handleDelete, handleDeleteWish}) {
    const [likeArr, setLikeArr] = useState([])
    
    useEffect(() =>{
        fetch(`/likes/${userData.id}`)
            .then(resp => {
                if(resp.ok){
                    resp.json()
                    .then(data => setLikeArr(data))
                }
            })
    },[userData, handleDeleteWish])


    const soldFilter = userData.items.filter(item => item.sold === true)
    const sellingFilter = userData.items.filter(item => item.sold !== true)

    const selling = sellingFilter.map(item => {
        return (
            <div key={item.id} className="single-item-div"> 
                <img src={item.images_urls[0]} className='single-item-profile-img'/>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <Link to={`update_item/${item.id}`}>
                    <Button 
                        style={{marginTop: "5px"}}
                        colorScheme='teal' size='sm'
                        >Update Item
                    </Button>
                </Link>
                <Button 
                    style={{marginTop: "5px"}}
                    colorScheme='red' 
                    size='sm'
                    onClick={()=>handleDelete(item)}
                    >Delete
                </Button>
            </div>
        )
    })
    const sold = soldFilter.map(item => {
        return (
            <div key={item.id} className="single-item-div"> 
                <img src={item.images_urls[0]} className='single-item-profile-img'/>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <Link to={`/items/${item.id}`}>
                    <Button 
                    style={{marginTop: "5px"}}
                    colorScheme='teal' size='sm'
                    >See more</Button>
                </Link>
            </div>
        )
    })

    const bought = userData.order_numbers.map(order => {
        return(
            <div key={order.id} className="single-item-div">
                <img src={order.images_urls} className='single-item-profile-img'></img>
                <Link to={`/new_review/${order.item_details.id}`}>
                    <Button colorScheme='teal' size='sm'>Review Item</Button>
                </Link>
            </div>
        )
    })

    const wishlist = likeArr.map(like => {
        return (
            <div key={like.id} className="single-item-div"> 
                <img src={like.item.images_urls[0]} className='single-item-profile-img'/>
                <h3>{like.item.name}</h3>
                <p>${like.item.price}</p>
                <Link to={`/items/${like.item.id}`}>
                    <Button 
                    style={{marginTop: "5px"}}
                    colorScheme='teal' size='sm'
                    >View Item</Button>
                </Link>
                <Button 
                    style={{marginTop: "5px"}}
                    colorScheme='red' 
                    size='sm'
                    onClick={()=>handleDeleteWish(like)}
                    >Remove From Wishlist
                </Button>
            </div>
        )
    })


  return (
    <div style={{width: "85%"}}>
    {user ? (
        <div style={{marginLeft: "20px"}}>
            
            <div style={{display:"flex"}}>
                <h2 className='welcome'>Welcome Back {userData.username}</h2>
            </div>
            <h3>Your Seller Rating</h3>
            
            <div style={{display:"flex"}}>
                
                <div style={{marginTop:"11px"}}>
                    <Rating ratingValue={userData.average_score} readonly="true" fillColor='teal'/>
                    <p>{userData.average_score} /100</p>
                </div>
                
                <Avatar 
                    size='xl' 
                    style={{ marginLeft:"40px", marginTop:"10px"}}
                    name={userData.username}
                    src={userData.avatar_url}
                ></Avatar>
                
                <div className='stat-container'>
                    <div className='stat-div1'>
                        <h2>Sold items</h2>
                        <h3>{userData.sold_count}</h3>
                    </div>
                    <div className='stat-div2'>
                        <h2>Money Earned</h2>
                        <h3>${userData.sold_money}</h3>
                    </div>
                    
                    <div className='stat-div3'>
                        <h2>Latest Review</h2>
                        {userData.latest_review ? <h3>{userData.latest_review}</h3> : <h3>No Reviews</h3>}
                    </div>
                </div>
            </div>

        <Tabs colorScheme="teal">
            <TabList>
                <Tab>Selling</Tab>
                <Tab>Sold</Tab>
                <Tab>Bought</Tab>
                <Tab>Wishlist</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>Selling</h3>
                    {sellingFilter.length === 0 ? <h3>No Items For Sale</h3> : (
                        <div className="user-profile-item">
                            {selling}
                        </div>
                    )}
                </div>
                </TabPanel>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>Sold</h3>
                    {soldFilter.length === 0 ? <h3>No Items Sold</h3> : (
                        <div className="user-profile-item">
                            {sold}
                        </div>
                    )}
                </div>
                </TabPanel>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>Bought</h3>
                    {bought.length === 0 ? <h3>No Items Bought</h3> : (
                        <div className="user-profile-item">
                            {bought}
                        </div>
                    )}
                </div>
                </TabPanel>
                <TabPanel>
                    <div style={{marginLeft: "10%", marginTop:"30px"}}>
                        <h3>Wishlist</h3>

                            <div className="user-profile-item">
                                {wishlist}
                            </div>

                    </div>

                </TabPanel>

            </TabPanels>
        </Tabs>
        </div>) 
    : null }
    </div>
    
  )
}

export default UserSelf