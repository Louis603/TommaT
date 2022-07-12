import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function UserSelf({user, userData}) {
    const [rating, setRating] = useState(0)

    // console.log(userData.order_numbers)
    // console.log(userData.items)
    const soldFilter = userData.items.filter(item => item.sold === true)
    const sellingFilter = userData.items.filter(item => item.sold !== true)
    // console.log(soldFilter.length)
    const selling = sellingFilter.map(item => {
        return (
            <div key={item.id} className="single-item-div"> 
                
                <img src={item.image} style={{width:"300px"}}/>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <Link to={`/items/${item.id}`}>
                    <Button colorScheme='teal' size='sm'>See more</Button>
                </Link>
            </div>
        )
    })
    const sold = soldFilter.map(item => {
        return (
            <div key={item.id} className="single-item-div"> 
                <p>{item.name}</p>
                <p>{item.price}</p>
                <img src={item.image} style={{width:"300px"}}/>
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
                <img src={order.item_details.image} style={{width:"300px"}}></img>
                <Link to={`/new_review/${order.item_details.id}`}>
                    <Button colorScheme='teal' size='sm'>Review Item</Button>
                </Link>
            </div>
        )
    })


  return (
    <div style={{width: "85%"}}>
    {user ? (
        <div style={{marginLeft: "20px"}}>
            <h2 className='welcome'>Welcome Back {userData.username}</h2>
            <h3>Your Seller Rating</h3>
            <div style={{display:"flex"}}>
                <div style={{marginTop:"11px"}}>
                    <Rating ratingValue={userData.average_score} readonly="true" />
                    <p>{userData.average_score} /100</p>
                </div>
                <div className='user-stats'>
                    <h2>Sold items
                    <h3>{userData.sold_count}</h3>
                    </h2>
                    
                    <h2>Money Earned
                        <h3>{userData.sold_money}</h3>
                    </h2>
                    <h2>Latest Review
                        <h3>{userData.latest_review}</h3>
                    </h2>
                </div>
            </div>

        <Tabs colorScheme="teal">
            <TabList>
                <Tab>Selling</Tab>
                <Tab>Sold</Tab>
                <Tab>Bought</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>SELLING</h3>
                    {sellingFilter.length === 0 ? ( null) : (
                        <div className="user-profile-item">
                            {selling}
                        </div>
                    )}
                </div>
                </TabPanel>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>SOLD</h3>
                    {soldFilter.length === 0 ? ( null) : (
                        <div className="user-profile-item">
                            {sold}
                        </div>
                    )}
                </div>
                </TabPanel>
                <TabPanel>
                <div style={{marginLeft: "10%", marginTop:"30px"}}>
                    <h3>Bought</h3>
                    {bought.length === 0 ? ( null) : (
                        <div className="user-profile-item">
                            {bought}
                        </div>
                    )}
                </div>
                </TabPanel>

            </TabPanels>
        </Tabs>







        {/* <div style={{marginLeft: "10%", marginTop:"30px"}}>
        <h3>SELLING</h3>
        {sellingFilter.length === 0 ? ( null) : (
            <div className="user-profile-item">
                
                {selling}
            </div>
        )}
        </div> */}
        
        {/* {soldFilter.length === 0 ? ( null) : (
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
         */}
        {/* <h3>BOUGHT
            {bought}
        </h3> */}
        
        </div>) 
    : null }
    </div>
    
  )
}

export default UserSelf