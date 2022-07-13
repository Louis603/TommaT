import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function UserOther({user, userData}) {
    const [profile, setProfile] = useState({
        items:[], 
        reviews:[], 
        images_urls:[]
    })

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
                
                <img src={item.images_urls[0]} className='single-item-profile-img'/>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <Button 
                    style={{marginTop: "5px"}}
                    colorScheme='teal' size='sm'
                    >See more
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
  
  return (
    <div style={{width: "85%"}}>
            <div style={{marginLeft: "20px"}}>
            <div style={{display:"flex"}}>
            <h2 className='welcome'>{profile.username}'s Profile</h2>
                <div className='image-profile-container' >
                <img className='image-profile' src={profile.avatar_url}></img>
                </div>
            </div>
            <h3>Seller Rating</h3>
            <div style={{display:"flex"}}>
        <div style={{marginTop:"11px"}}>
            <Rating ratingValue={profile.average_score} readonly="true" fillColor='teal'/>
            <p>{profile.average_score} /100</p>
        </div>
        <div className='user-stats'>
            <div className='stat-div1'>
            <h2>Sold items
            <h3>{profile.sold_count}</h3>
            </h2>
            </div>
            <div className='stat-div2'>
            <h2>User Reviews
                <h3>{profile.review_count}</h3>
            </h2>
            </div>
            <div className='stat-div3'>
            <h2>Latest Review
                {profile.latest_review ? <h3>{profile.latest_review}</h3> : <h3>None</h3>}
                
            </h2>
            </div>
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
        </div>
  )
}

export default UserOther