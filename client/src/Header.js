import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { useHistory } from "react-router-dom"



let link = {
  textDecoration: "none",
  color: "white"
}

function Header({user, handleLogout, handleSearch }) {
  const [ searchNameForm, setSearchNameForm] = useState("")
  const [ searchTagForm, setSearchTagForm] = useState("")
  const [tags, setTags] = useState([])
  const [tagForm, setTagForm] = useState([])

  let history = useHistory()

  useEffect(() => {
    fetch("/tags")
    .then(res => res.json())
    .then(data => setTags(data))
  },[])

  const tagSuggestions = tags.map(tag => {
    return <option key={tag.id} value={tag.hashtag} />
  })


  function handleSearchName(e){
    setSearchNameForm(e.target.value)
  }

  function handleSearchTag(e){
    setSearchTagForm(e.target.value)
  }

  function handleNameSubmit(e){
    e.preventDefault()
    fetch("/search_name",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nameSearch: searchNameForm})
  }).then(res => res.json())
    .then(data => {
      handleSearch(data)
      console.log(data)
      history.push('/search_results')
    })
  }

  function handleAddTag(){
    if(tagForm.includes(searchTagForm)){
        console.log("exists")
    }else{
        setTagForm([...tagForm, searchTagForm])}
    console.log(tagForm)
    setSearchTagForm("")
  }

  function handleDelete(tag){
    console.log(tag)
    const deleteTag = tagForm.filter(t => t !== tag)
    setTagForm(deleteTag)
  }

  function handleTagSubmit(e){
    e.preventDefault()
    console.log(tagForm)
    fetch("/search_tags",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tagSearch: tagForm})
  }).then(res => res.json())
    .then(data => {
      // handleSearch(data)
      console.log(data)
      setTagForm([])
      
      // history.push('/search_results')
    })

  }


  return (
    <div>
    <div style={{display: "flex", backgroundColor: "#004643"}}>
        <ul>
            <NavLink to='/' style={link}><b>Home</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/new_item' style={link}><b>Add New</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/self' style={link}><b>Profile</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/cart' style={link}><b>Cart</b></NavLink>
        </ul>
        {user? (
          null
          ):( 
        <ul style={link}>
            <NavLink to='/login'style={link}><b>Login</b></NavLink> /
            <NavLink to='/signup'style={link}><b>Signup</b></NavLink>
        </ul> 
        )}
        {user? (<button style={{marginLeft: "15%", height:"25px", marginTop: "13px"}}
        onClick={handleLogout}>Logout</button>
        ) : null}
        
    </div>
      <form onSubmit={handleNameSubmit}>
        <label>Search Name
          <input type="text" name="searchName" value={searchNameForm} onChange={handleSearchName}></input>
        </label>
        <button>Submit</button>
      </form>
      <form onSubmit={handleTagSubmit}>
        <label>Search Tag
          <div>
        <ul>
          {tagForm.map(tag => {
              return (
                <li>
                  <span onClick={(e) => handleDelete(tag)}>{tag} </span>
                </li>)
           })}
           </ul>
          <input type="text" name="searchTag" list="data" value={searchTagForm} onChange={handleSearchTag}></input>
          </div>
        </label>
        <button type="button" onClick={handleAddTag}>Add Tag</button>
        <button>Submit</button>
        

        <datalist id="data">
          {tagSuggestions}
        </datalist>
      </form>
    </div>
  )
}
export default Header