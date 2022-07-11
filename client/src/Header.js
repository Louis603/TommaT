import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import './tags.css'
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



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
      handleSearch(data)
      console.log(data)
      setTagForm([])
      history.push('/search_results')
      
      // history.push('/search_results')
    })

  }


  return (
    <div>
    <div id='header'>
        <ul className='header-link'>
            <NavLink to='/' style={link}><b>Home</b></NavLink>
        </ul>
        <ul className='header-link'>
            <NavLink to='/new_item' style={link}><b>Add New</b></NavLink>
        </ul>
        <ul className='header-link'>
            <NavLink to='/self' style={link}><b>Profile</b></NavLink>
        </ul>
        <ul className='header-link'>
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
        {user? (<Button style={{marginLeft: "15%", height:"25px", marginTop: "13px"}}
        onClick={handleLogout}>Logout</Button>
        ) : null}
        
    </div>
      
      <Tabs>
        <TabList>
          <Tab>Categories</Tab>
          <Tab>Search by name</Tab>
          <Tab>Search by tag</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Category nav</p>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleNameSubmit}>
              <label>
                <Input htmlSize={45} width='auto' type="text" name="searchName" value={searchNameForm} onChange={handleSearchName}></Input>
              </label>
              <Button style={{margin: "auto"}} colorScheme='teal' size='sm'>Submit</Button>
            </form>
          </TabPanel>
          
          <TabPanel>
            <form onSubmit={handleTagSubmit}>
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
                <Button style={{marginTop: '3px'}} colorScheme='teal' size='sm' onClick={handleAddTag}>Add Tag</Button>
                </div>
              </label>
                <Button style={{marginTop: '3px'}} colorScheme='teal' size='sm'>Submit</Button>
              
                <datalist id="data">
                  {tagSuggestions}
                </datalist>
            </form>

          </TabPanel>
        </TabPanels>
      </Tabs>
      
      {/* <form onSubmit={handleNameSubmit}>
        <label>Search Name
          <Input htmlSize={45} width='auto' type="text" name="searchName" value={searchNameForm} onChange={handleSearchName}></Input>
        </label>
        <Button style={{margin: "auto"}} colorScheme='teal' size='sm'>Submit</Button>
      </form>
      
      
      
      <form onSubmit={handleTagSubmit}>
        <label>Search Tag
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
          <Button style={{marginTop: '3px'}} colorScheme='teal' size='sm' onClick={handleAddTag}>Add Tag</Button>
          </div>
        </label>
          <Button style={{marginTop: '3px'}} colorScheme='teal' size='sm'>Submit</Button>
        
        <datalist id="data">
          {tagSuggestions}
        </datalist>
      </form> */}
    </div>
  )
}
export default Header