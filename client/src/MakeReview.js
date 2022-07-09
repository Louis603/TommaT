import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

function MakeReview() {
    const [singleItem, setSingleItem] = useState({})
    const [rating, setRating] = useState(0)
    const [reviewForm, setReviewForm] = useState()
    const [hasReview, setHasReview] = useState(null)
    // console.log(rating)
    // console.log(review)
    console.log(singleItem.review)
    console.log(singleItem)

    const { id } = useParams()

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
            item_id: singleItem.id
        }
        console.log(form)
        fetch("/reviews",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(res => res.json())
          .then(data => console.log(data))
      }
    
  return (
    <div>
      
      {hasReview ? 
      <>
      <h4>Your Review</h4>
      <Rating readonly="true" ratingValue={hasReview.score} />
      <p><b>{hasReview.buyer}</b>: "{hasReview.comment}"</p>
      </>
      : 
      <form onSubmit={handleSubmit}>
            <label>Leave A Review
                <Rating onClick={handleRating} ratingValue={rating} />
                {/* RATING RATING RATING */}
                <textarea rows="4" cols="50" name="comment" value={reviewForm} onChange={handleChange}/>
            </label>
            <input type="submit" value="submit" />
        </form>
      }
      <p>Sold by: {singleItem.seller_name}</p>
      <img src={singleItem.image} style={{width: "20%"}}/>
    </div>
  )
}

export default MakeReview