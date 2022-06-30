import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemList from './ItemList';
import Header from './Header';
import Login from './Login';

function App() {
  const [itemsArr, setItemsArr] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    fetch("/me")
      .then((r) => r.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => setItemsArr(data));
  }, []);

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setUser(null));
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} handleLogout={handleLogout}/>
        <Login setUser={setUser}/>
        {user? <h1>{user.username}</h1> : <h1>NOt logged in</h1>}
        <Switch>
          <ItemList itemsArr={itemsArr}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;