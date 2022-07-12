import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

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
            <div key={item.id} className="single-item-div"> 
                <p>{item.name}</p>
                <p>{item.price}</p>
                <img src={item.image} style={{width:"300px"}}/>
                <Link to={`/items/${item.id}`}>
                    <Button 
                        style={{marginTop: "5px"}}
                        colorScheme='teal' size='sm'
                        >See more
                    </Button>
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
                        >See more
                    </Button>
                </Link>
            </div>
        )
    })
  
  return (
    <div style={{marginLeft: "20px"}}>
            <h2 className='welcome'>{profile.username}'s Profile</h2>
            <h3>Seller Rating</h3>
            <div style={{display:"flex"}}>
        <div style={{marginTop:"11px"}}>
            <Rating ratingValue={profile.average_score} readonly="true" />
            <p>{profile.average_score} /100</p>
        </div>
        <div className='user-stats'>
            <h2>Sold items
            <h3>{profile.sold_count}</h3>
            </h2>
            
            <h2>User Reviews
                <h3>{profile.review_count}</h3>
            </h2>
            <h2>Latest Review
                <h3>{profile.latest_review}</h3>
            </h2>

        </div>
        </div>

        <Tabs colorScheme="teal">
            <TabList>
                <Tab>Selling</Tab>
                <Tab>Sold</Tab>
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
            </TabPanels>
        </Tabs>
        
        </div>
  )
}

export default UserOther