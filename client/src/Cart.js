import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Cart({user, userData, setSoldBoolean, handleBought}) {
    const [userCart, setUserCart] = useState([])
    const [purchased, setPurchased] = useState(null)

    useEffect(() => {
        fetch(`/carts/${userData.id}`)
        .then(resp => resp.json())
        .then(data => {
          if(data.error){
            console.log(data.error)
          }else{
          setUserCart(data)
          }
        })
      }, [userData]);

      function handleBuy(){
        userCart.map(user => {
          fetch("/order_numbers",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user.user_id,
              item_id: user.item_id
            })
          }).then(res => res.json())
            .then(data => {
              fetch(`/items/${user.item_id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({ sold: true}),
              })
              handleBought(user.item_id)
              setSoldBoolean(user.item_id)
            })
        })
        
        fetch(`/empty_cart/${user.id}`, {
          method: "DELETE",
        })
        setUserCart([])
        setPurchased(true) 
      }

      function handleRemove(i){
        fetch(`/carts/${i.id}`, {
          method: "DELETE",
        })
        const filteredCart = userCart.filter(item => item.id !== i.id)
        setUserCart(filteredCart)
      }

      let totalPrice = 0
      const cartItems = userCart.map(i => {
        totalPrice = totalPrice + i.item.price
        return(
          <>
            <div key={i.item_id} className='cart-item'>
              <Link to={`/items/${i.item.id}`}>
                <img src={i.item.images_urls[0]} style={{width: "150px"}}/>
              </Link>
                <div style={{width:"275px", marginLeft:"20px"}}>
                  <h3>{i.item.name}</h3>
                  <p>${i.item.price}</p>
                </div>
                <div>
                  <Button className='cart-button' colorScheme='red' onClick={()=>handleRemove(i)}>Remove from cart</Button>
                </div>
            </div>
            <Divider></Divider>
          </>
        )
        
      })

      

  return (
    <div style={{
      // border: "solid 1px red", 
      width:"40%", marginLeft:"22%", marginTop:"30px"}}>
        {user? null: <p>SignUp To Buy </p>}
        {cartItems}
        {/* <div className='cart-total-right'>
          <h2>Total: ${totalPrice}</h2>
          <Button colorScheme="blue" onClick={handleBuy}>BUY</Button>
        </div> */}
        {purchased ? 
        <h3>Thank You For Your Purchase</h3> 
        : 
        <div className='cart-total-right'>
          <h2>Total: ${totalPrice}</h2>
          <Button colorScheme="blue" onClick={handleBuy}>BUY</Button>
        </div>}
    </div>
  )
}

export default Cart