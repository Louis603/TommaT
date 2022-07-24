import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { useHistory } from "react-router-dom"
import { Button} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'

function MakeReview({user, userData}) {
    const [singleItem, setSingleItem] = useState({images_urls:[]})
    const [rating, setRating] = useState(0)
    const [reviewForm, setReviewForm] = useState()
    const [hasReview, setHasReview] = useState(null)

    const { id } = useParams()
    let history = useHistory()

    useEffect(() =>{
        fetch(`/items/${id}`)
        .then(resp => resp.json())
        .then((data) => {
          setSingleItem(data)
          setHasReview(data.review)
        })
      }, []);

      function handleRating(rate){
        setRating(rate)
        console.log(rate)
      }

      function handleChange(e){
        setReviewForm(e.target.value)
      }

      function handleSubmit(e){
        e.preventDefault()
        const form = {
            score: rating,
            comment: reviewForm,
            user_id: singleItem.user_id,
            item_id: singleItem.id,
            buyer_id: userData.id
        }
        console.log(form)
        fetch("/reviews",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            history.push('/self')
          })
      }
    
  return (
    <div className='review-container'>
      <div>
        <img src={singleItem.images_urls[0]} style={{width: "400px", height:"500px", objectFit:"fill"}}/>
      </div>
      {hasReview ? 
        <div style={{marginLeft:"30px"}}>
        <h4>Your Review</h4>
        <Rating readonly="true" ratingValue={hasReview.score} fillColor='teal'/>
        <p><b>{hasReview.buyer}</b>: "{hasReview.comment}"</p>
        </div>
        : 
        <div>
          <div className='review-form'>
            <form onSubmit={handleSubmit}>
              <label>Leave A Review
                <Rating onClick={handleRating} ratingValue={rating} fillColor='teal'/>
                  <Textarea rows="4" cols="50" name="comment" value={reviewForm} onChange={handleChange}/>
              </label>
              <Button type="submit" value="submit" colorScheme='teal'>Submit</Button>
            </form>
          </div>
          <div style={{marginLeft:"100px"}}>
            {/* {userData.id === singleItem.user_id ? 
              <Link to={`/self`}>
                <h4>SELLER: {singleItem.seller_name}</h4>
              </Link>
              :
              <Link to={`/user_profile/${singleItem.user_id}`}>
                <h4>SELLER: {singleItem.seller_name}</h4>
              </Link>
            } */}
          </div>
        </div>
        
      } 
      {userData.id === singleItem.user_id ? 
        <Link to={`/self`}>
          <h4>SELLER: {singleItem.seller_name}</h4>
        </Link>
        :
        <Link to={`/user_profile/${singleItem.user_id}`}>
          <h4>SELLER: {singleItem.seller_name}</h4>
        </Link>
      }
    </div>
  )
}

export default MakeReview