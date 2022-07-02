import React, {useState, useEffect} from 'react'

function Cart({user, userData}) {
    const [userCart, setUserCart] = useState([])
    console.log(userCart)
    
    // useEffect(() => {
    //     fetch("/me")
    //     .then((response) => {
    //       if (response.ok) {
    //         response.json()
    //         .then((user) => {
    //           console.log(user)
    //           // console.log("user check fetch")
    //         });
    //       }});
    //   }, []);

    useEffect(() => {
        fetch(`/carts/${userData.id}`)
        .then(resp => resp.json())
        .then((data) => setUserCart(data))
      }, [userData]);

      function handleBuy(){
        console.log()
        userCart.map(user => {
          console.log(user.user_id + "buyer")
          console.log(user.item.user_id + "seller id")
        })
      }

      const cartItems = userCart.map(i => {
        return(
            <div key={i.item_id}>
                <img src={i.item.image} style={{width: "10%"}}/>
                <p>{i.item.price}</p>
            </div>
        )
      })

  return (
    <div>
        {user? <p>true</p> : <p>false</p>}
        {cartItems}
        <button onClick={handleBuy}>BUY</button>
    </div>
  )
}

export default Cart