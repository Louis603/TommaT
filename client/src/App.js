import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom"
import ItemList from './ItemList';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import NewItemForm from './NewItemForm';
import OneItem from './OneItem';
import UserSelf from './UserSelf';
import Cart from './Cart';
import MakeReview from './MakeReview';
import UserOther from './UserOther';
import SearchResults from './SearchResults';
import Test from './Test';
import {theme} from './Theme';

function App() {
  const [soldBoolean, setSoldBoolean] = useState(null)
  // console.log(soldBoolean)
  const [itemsArr, setItemsArr] = useState([]);
  const [searchItemsArr, setSearchItemsArr] = useState([]);
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({ 
    items:[], 
    order_numbers:[], 
    reviews:[]})
  // console.log(user.cart)
  let history = useHistory()

  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((data) => {
          setUser(data)
          setUserData(data)
          console.log(data)
          // console.log("user check fetch")
        });
      }});
  }, [soldBoolean]);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => setItemsArr(data));
  }, [soldBoolean]);

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null)
      setUserData({ items:[],order_numbers:[],reviews:[] })
      });
      history.push('/')
  }

  function newItem(data){
    setItemsArr([...itemsArr, data])
  }

  function handleBought(data){
    const boughtItem = itemsArr.filter(item => item.id !== data)
    console.log(boughtItem)
    setItemsArr(boughtItem)
  }

  function handleSearch(data){
    setSearchItemsArr(data)
    console.log(searchItemsArr)
  }
  return (
    <ChakraProvider 
    theme={theme}
    // resetCSS={false}
    >
    
      <div className="App">
        <Header user={user} handleLogout={handleLogout} handleSearch={handleSearch}/>
        {/* {user ? <h2>{user.username}</h2> : <h1>Not logged in</h1>} */}
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
            <Cart user={user} userData={userData} setSoldBoolean={setSoldBoolean} handleBought={handleBought}/>
          </Route>

          
          <Route exact path="/">
            <ItemList itemsArr={itemsArr} user={user} userData={userData}/>
          </Route>
          
          <Route path="/new_item">
            <NewItemForm user={user} newItem={newItem}/>
          </Route>
          
          <Route path="/items/:id">
            <OneItem user={user} userData={userData}/>
          </Route>
          
          <Route path="/new_review/:id">
            <MakeReview user={user} userData={userData}/>
          </Route>
          
          <Route path="/user_profile/:id">
            <UserOther user={user} userData={userData}/>
          </Route>
          
          <Route path="/search_results">
            <SearchResults user={user} userData={userData} searchItemsArr={searchItemsArr}/>
          </Route>
          
          <Route path="/test">
            <Test user={user} userData={userData} searchItemsArr={searchItemsArr}/>
          </Route>

        </Switch>
          
      </div>
    </ChakraProvider>
  );
}

export default App;