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
import UpdateItem from './UpdateItem';
import Footer from './Footer';
import {theme} from './Theme';

function App() {
  const [soldBoolean, setSoldBoolean] = useState(null)
  const [listedItem, setListedItem] = useState(null)
  const [itemsArr, setItemsArr] = useState([]);
  const [searchItemsArr, setSearchItemsArr] = useState([]);
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({ 
    items:[], 
    order_numbers:[],
    images_urls:[], 
    reviews:[]})
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
        });
      }});
  }, [soldBoolean, listedItem]);

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

  //handles deleted item from userSelf
  function handleDelete(item){
    fetch(`/items/${item.id}`, {
      method: "DELETE",
    })
        // setListedItem(!listedItem)
        setSoldBoolean(!soldBoolean)
  }

  function handleDeleteWish(like){
    fetch(`/likes/${like.id}`, {
      method: "DELETE",
    })
        setSoldBoolean(!soldBoolean)
  }

  function newItem(data){
    setItemsArr([...itemsArr, data])
  }

  function handleBought(data){
    const boughtItem = itemsArr.filter(item => item.id !== data)
    setItemsArr(boughtItem)
  }

  function handleUpdatedItem(data){
    const updateItem = itemsArr.map(item => item.id === data.id ? data : item )
    setItemsArr(updateItem)
  }

  function handleSearch(data){
    setSearchItemsArr(data)
  }


  return (
    <ChakraProvider 
    theme={theme}
    // resetCSS={false}
    >
    
      <div className="App" >
        <Header user={user} handleLogout={handleLogout} handleSearch={handleSearch} userData={userData}/>
        <Switch>
          
          <Route path="/login">
            <Login setUser={setUser} setUserData={setUserData}/>
          </Route>
          
          <Route path="/signup">
            <Signup setUser={setUser} setUserData={setUserData}/>
          </Route>
          
          <Route path="/self">
            <UserSelf user={user} userData={userData} handleDelete={handleDelete} handleDeleteWish={handleDeleteWish}/>
          </Route>
          
          <Route path="/cart">
            <Cart user={user} userData={userData} setSoldBoolean={setSoldBoolean} handleBought={handleBought}/>
          </Route>

          
          <Route exact path="/">
            <ItemList itemsArr={itemsArr} user={user} userData={userData}/>
          </Route>
          
          <Route path="/new_item">
            <NewItemForm 
              user={user} 
              newItem={newItem} 
              setListedItem={setListedItem} 
              listedItem={listedItem}
              setUser={setUser} 
              setUserData={setUserData}/>
          </Route>
          
          <Route path="/items/:id">
            <OneItem user={user} userData={userData}/>
          </Route>
          
          <Route path="/new_review/:id">
            <MakeReview user={user} userData={userData}/>
          </Route>
          
          <Route path="/user_profile/:id">
            <UserOther user={user} userData={userData} />
          </Route>
          
          <Route path="/search_results">
            <SearchResults user={user} userData={userData} searchItemsArr={searchItemsArr}/>
          </Route>
          
          <Route path="/update_item/:id">
            <UpdateItem user={user} 
              userData={userData} 
              setListedItem={setListedItem} 
              handleUpdatedItem={handleUpdatedItem} 
              listedItem={listedItem}/>
          </Route>

        </Switch>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;