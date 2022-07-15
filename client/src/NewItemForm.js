import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import './tags.css'
import './App.css';
import { Button, Input, Textarea, Select, Stack, Kbd } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import Login from './Login';


function NewItemForm({user, newItem, setListedItem, listedItem, setUser, setUserData}) {
    const [handleError, setHandleError] = useState()
    const [selectedImage, setSelectedImage] = useState(null);
    const [testTag, setTestTag] = useState()
    const [newItemId, setNewItemId] = useState(null)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        price:"",
        name:"",
        description:"",
        // image:"",
        condition:"",
        user_id: "",
        category_id: ""
    })
    const [tagForm, setTagForm] = useState([])
    const [imageDisplay, setImageDisplay] = useState([])

    let history = useHistory()

    // useEffect(() => {
    //     console.log(imageDisplay)
    // },[imageDisplay])
    // console.log(imageDisplay)

    useEffect(() => {
        fetch("/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
    },[])
    
    useEffect(() => {
        fetch("/tags")
        .then(res => res.json())
        .then(data => setTags(data))
    },[])

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }

    function handleTagChange(e){
        setTestTag(e.target.value)
    }

    function handleAddTag(){
        if(tagForm.includes(testTag)){
            console.log("exists")
        }else{
            setTagForm([...tagForm, testTag])}
        console.log(tagForm)
        setTestTag("")
    }

    function handleDelete(tag){
        console.log(tag)
        const deleteTag = tagForm.filter(t => t !== tag)
        setTagForm(deleteTag)
    }

    function handleFile(e) {
        // let img = e.target.files[0];
        // console.log(img)
        // setSelectedImage(img);
        // console.log(URL.createObjectURL(img));
        let imageArray= []
        for (let i = 0; i<e.target.files.length; i++){
            // setImageDisplay([...imageDisplay, e.target.files[i]])
            imageArray.push(e.target.files[i])
        }
        let imageLinks = imageArray.map(image => URL.createObjectURL(image))
        setImageDisplay(imageLinks)
    }

    const imageUploadDisplay = imageDisplay.map(image => {
        return (
            <img key={image} className='thumbnail-image-upload' src={image}></img>
        )
    })


    function handleSubmit(e){
        e.preventDefault()
        // const tagArr = 
        // const itemForm = {
        //     price: form.price,
        //     name:form.name,
        //     description:form.description,
        //     // image: form.image,
        //     condition: form.condition,
        //     user_id: user.id,
        //     category_id: form.category_id 
        // }

        const formData = new FormData()
        formData.append('item[name]', e.target.name.value)
        formData.append('item[price]', e.target.price.value)
        formData.append('item[description]', e.target.description.value)
        formData.append('item[condition]', e.target.condition.value)
        formData.append('item[category_id]', form.category_id)
        formData.append('item[user_id]', user.id)
        for (let i = 0; i < e.target.images.files.length; i++) {
            formData.append(
              'item[images][]',
              e.target.images.files[i],
              e.target.images.files[i].name
            )
          }

        fetch("/items",{
            method: 'POST',
            body: formData
        }).then(res => res.json())
          .then(item => {
            if(item.error){
                setHandleError(item.error)
            } else {
                newItem(item)
                console.log(item)
                setListedItem(!listedItem)
                history.push('/')
            }



            // newItem(data)
            // console.log(data)
            // setListedItem(true)
            // setNewItemId(item.id)
            
            
        fetch("/tags",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tags: tagForm
            })
        }).then(res => res.json())
          .then(data => {
                data.map(d => {
                    fetch("/item_tags",{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            item_id: item.id,
                            tag_id: d.id
                        })
                    })
                })
              })

        })
        
    }

 
    const dropdownCat = categories.map(cat => {
        return <option key={cat.id} value={cat.id} >{cat.name}</option>
    })

    const tagSuggestions = tags.map(tag => {
        return <option key={tag.id} value={tag.hashtag} />
    })

    
  if(!user) return <Login setUser={setUser} setUserData={setUserData}></Login>
  return (
    <div style={{display:"flex"}}>
        {/* {imageUploadDisplay} */}
    <div className='form-container'>
        {/* {selectedImage? <img src={URL.createObjectURL(selectedImage)}></img> : null} */}
        {/* {imageUploadDisplay} */}
        <form onSubmit={handleSubmit}>
            
            <div style={{border:"solid 1.5px teal"}}>
                
                <label>
                    <h4 style={{marginLeft:"40%", padding:"10px"}}>Upload Image</h4>
                    <AttachmentIcon w={8} h={8} color='gray'style={{marginLeft:"45%"}}/>
                    <h4 style={{marginLeft:"22%", padding:"10px"}}> Hold <Kbd>ctrl</Kbd> or <Kbd>⌘</Kbd> + <Kbd>mouse click</Kbd> to select more than one image</h4>

                    <Input type="file" name="images" multiple display='none'
                    onChange={(e)=>handleFile(e)}
                    />
                </label>
            
            </div>
            
            
            <div>
            <h3>Product Details</h3>
                <label > Title
                    <Input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange}
                        placeholder="Name of your item"
                    ></Input>
                </label>
                </div>
                
                <div>
                <label>Description
                    <Textarea 
                        resize='vertical'
                        rows="12"
                        type="text" 
                        name="description" 
                        value={form.description} 
                        onChange={handleChange}
                        placeholder="Describe your item"
                    ></Textarea>
                </label>
            </div>
            <div>
            <label>Price
                <Input type="number" name="price" placeholder='Enter Price in $' step="any" value={form.price} onChange={handleChange}></Input>
            </label>
            </div>

            <label>
                <Stack spacing={6}>
                    <h3>Condition/Category</h3>
                <Select style={{marginTop:"0px"}}  name="condition" value={form.condition} onChange={handleChange}>
                    <option>Condition</option>
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Used</option>
                </Select>
                <Select  name="category_id"  value={form.category_id} onChange={handleChange}>
                    <option>Category</option>
                    {dropdownCat}
                </Select>
                </Stack>
            </label>
            {/* <label>Category
                <Select  name="category_id"  value={form.category_id} onChange={handleChange}>
                    <option>Category</option>
                    {dropdownCat}
                </Select>
            </label><br/>
             */}
            <label>
                {/* <Input type="text" name="tag" list="data" value={testTag} onChange={handleTagChange}/>
                <Button type="Button" onClick={handleAddTag}>Add Tag</Button> */}
                <div>
                <h3>Tags</h3>
                </div>
                <section className='tags-input'>
                <ul id='tags'>
                    {tagForm.map(tag => {
                        return (
                        <li className='tag' key={tag}>
                            <span className='tag-title' >{tag} </span>
                            <span className='tag-close-icon' onClick={(e) => handleDelete(tag)}>x</span>
                        </li>)
                    })}
                </ul>
                <input 
                    className='tags-input-form' 
                    placeholder='Click Add Tag Button To Add Tags' 
                    type="text" 
                    name="tag" 
                    list="data" 
                    value={testTag} 
                    onChange={handleTagChange} 
                />
                <Button 
                    style={{marginTop: '3px'}} 
                    colorScheme='teal' size='sm' 
                    onClick={handleAddTag}
                >Add Tag
                </Button>
                
                </section>
                    
                    <datalist id="data">
                        {tagSuggestions}
                    </datalist>
            </label>
                <Button 
                style={{marginTop: '5px'}}
                type="submit" 
                value="Submit"
                colorScheme='teal'
                >Submit</Button>
        </form>
        <h4>{handleError}</h4>
        {/* <Input onChange={handleImage} type="file" id="image" /> */}
        </div>
        <div className='thumbnail-upload-container'>
            {imageUploadDisplay}
        </div>
        
    </div>
  )
}

export default NewItemForm