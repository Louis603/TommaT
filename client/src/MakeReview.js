import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

function MakeReview() {
    const [singleItem, setSingleItem] = useState({})
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState()
    // console.log(rating)
    // console.log(review)
    // console.log(singleItem)

    const { id } = useParams()

    useEffect(() =>{
        fetch(`/items/${id}`)
        .then(resp => resp.json())
        .then((data) => setSingleItem(data))
      }, []);

      function handleRating(rate){
        setRating(rate)
        console.log(rate)
      }

      function handleChange(e){
        setReview(e.target.value)
      }

      function handleSubmit(e){
        e.preventDefault()
        const form = {
            score: rating,
            comment: review,
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
        <h4>Leave A Review</h4>
        <img src={singleItem.image} style={{width: "20%"}}/>
        <form onSubmit={handleSubmit}>
            <label>Leave A Review
                <Rating onClick={handleRating} ratingValue={rating} />
                {/* RATING RATING RATING */}
                <textarea rows="4" cols="50" name="comment" value={review} onChange={handleChange}/>
            </label>
            <input type="submit" value="submit" />
        </form>
    </div>
  )
}

export default MakeReview