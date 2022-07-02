import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemList from './ItemList';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import NewItemForm from './NewItemForm';
import OneItem from './OneItem';
import UserSelf from './UserSelf';
import Cart from './Cart';

function App() {
  const [itemsArr, setItemsArr] = useState([]);
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({ items:[]})
  // console.log(user.cart)

  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => {
          setUser(user)
          setUserData(user)
          // console.log("user check fetch")
        });
      }});
  }, []);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => setItemsArr(data));
  }, []);

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null)
      setUserData({ items:[]})
      });
  }

  function newItem(data){
    setItemsArr([...itemsArr, data])
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} handleLogout={handleLogout}/>
        {user ? <h1>{user.username}</h1> : <h1>Not logged in</h1>}
        <Switch>
          
          <Route path="/login">
            <Login setUser={setUser} setUserData={setUserData}/>
          </Route>
          
          <Route path="/signup">
            <Signup setUser={setUser} setUserData={setUserData}/>
          </Route>
          
          <Route path="/self">
            <UserSelf user={user} userData={userData}/>
          </Route>
          
          <Route path="/cart">
            <Cart user={user} userData={userData}/>
          </Route>

          
          <Route exact path="/">
            <ItemList itemsArr={itemsArr}/>
          </Route>
          
          <Route path="/new_item">
            <NewItemForm user={user} newItem={newItem}/>
          </Route>
          
          <Route path="/items/:id">
            <OneItem user={user}/>
          </Route>
        </Switch>
          
      </div>
    </BrowserRouter>
  );
}

export default App;