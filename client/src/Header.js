import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import './tags.css'
import './App.css';
import { Button, Avatar } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'



let link = {
  textDecoration: "none",
  color: "white"
}

function Header({user, userData, handleLogout, handleSearch }) {
  const [ searchNameForm, setSearchNameForm] = useState("")
  const [ searchTagForm, setSearchTagForm] = useState("")
  const [tags, setTags] = useState([])
  const [tagForm, setTagForm] = useState([])
  const [categoryArr, setCategoryArr] = useState([])

  let history = useHistory()

  useEffect(() => {
    fetch("/tags")
    .then(res => res.json())
    .then(data => setTags(data))
  },[])
  useEffect(() => {
    fetch("/categories")
    .then(res => res.json())
    .then(data => setCategoryArr(data))
  },[])


  const tagSuggestions = tags.map(tag => {
    return <option key={tag.id} value={tag.hashtag} />
  })

  const categoryList = categoryArr.map(cat => {
    return (
      <NavLink to='/search_results' onClick={() => handleCategory(cat)} key={cat.id}>
        <h4 key={cat.id} className='category-links'>{cat.name}</h4>
      </NavLink>
      
      )
  })

  function handleCategory(cat){
    fetch("/category_items",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({category_id: cat.id})
  }).then(res => res.json())
    .then(data => {
      handleSearch(data)
    })
  }


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
      history.push('/search_results')
    })
  }

  function handleAddTag(e){
    e.preventDefault()
    if(tagForm.includes(searchTagForm)){
    }else{
        setTagForm([...tagForm, searchTagForm])}
    setSearchTagForm("")
  }

  function handleDelete(tag){
    const deleteTag = tagForm.filter(t => t !== tag)
    setTagForm(deleteTag)
  }

  function handleTagSubmit(e){
    e.preventDefault()
    fetch("/search_tags",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tagSearch: tagForm})
    }).then(res => res.json())
      .then(data => {
        handleSearch(data)
        setTagForm([])
        history.push('/search_results')
    })
  }


  return (
    <div>
      <div id='header'>
        <NavLink to='/' style={link}>
          <h1 style={{marginLeft:"5px"}}>TommaT</h1>
        </NavLink>
        <div style={{display:"flex", position:"absolute", right:"25px"}}>
          <ul className='header-link'>
              <NavLink to='/' style={link}><b>Buy</b></NavLink>
          </ul>
          <ul className='header-link'>
              <NavLink to='/new_item' style={link}><b>List an Item</b></NavLink>
          </ul>
          <ul className='header-link'>
              <NavLink to='/cart' style={link}><b>Cart</b></NavLink>
          </ul>
        
          {user ? (
            <NavLink to='/self' style={link}>
              <Avatar name={userData.username} src={userData.avatar_url}/>
            </NavLink>
            ):( 
            <ul className='header-link'>
              <NavLink to='/login'style={link}><b>Login</b></NavLink> /
              <NavLink to='/signup'style={link}><b>Signup</b></NavLink>
            </ul> 
          )}
        </div>
      </div>
      
      <Tabs colorScheme="teal">
        <TabList>
          <Tab>Categories</Tab>
          <Tab>Search by name</Tab>
          <Tab>Search by tag</Tab>
          {user? (<Button style={{marginLeft: "74%", height:"25px", marginTop:"7px"}} colorScheme='teal'
            onClick={handleLogout}>Logout</Button>
            ) : null}
        </TabList>

        <TabPanels>
          <TabPanel>
              <div style={{display:"flex", marginBottom:"5px"}}>
                {categoryList}
              </div>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleNameSubmit}>
              <label>
                <Input htmlSize={45} width='auto' type="text" name="searchName" value={searchNameForm} onChange={handleSearchName}></Input>
              </label>
              <Button style={{margin: "auto", height:"38px"}} colorScheme='teal' size='sm' type='submit'><SearchIcon /> </Button>
            </form>
          </TabPanel>
          
          <TabPanel>
            <form onSubmit={handleAddTag}>
              
              {/* TAGS INPUT FORM */}
              <label>
                <div className='tags-input'>
                  <ul id='tags'>
                    {tagForm.map(tag => {
                      return (
                        <li className='tag'>
                          <span className='tag-title' >{tag} </span>
                          <span className='tag-close-icon' onClick={(e) => handleDelete(tag)}>x</span>
                        </li>)
                    })}
                  </ul>
                  <input className='tags-input-form' type="text" name="searchTag" list="data" value={searchTagForm} onChange={handleSearchTag}></input>
                </div>
                <Button style={{marginTop: '3px'}} colorScheme='teal' size='sm' onClick={handleAddTag}>Add Tag</Button>
              </label>
                <datalist id="data">
                  {tagSuggestions}
                </datalist>
           
            </form>
            <Button onClick={handleTagSubmit}  style={{marginTop: '-32px',marginLeft:"100px", display:"flex"}} colorScheme='teal' size='sm' type='submit'><SearchIcon /></Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
export default Header