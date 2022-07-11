import React, {useState, useEffect} from 'react'
import './tags.css'


const tagStyle = {
	display: "flex",
	alignItems: "flex-start",
	flexWrap: "wrap",
	minHeight: "48px",
	width: "480px",
	padding: "0 8px",
	border:" 1px solid rgb(214, 216, 218)",
	borderRadius: "6px"
	}

function NewItemForm({user, newItem}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [testTag, setTestTag] = useState()
    const [newItemId, setNewItemId] = useState(null)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [form, setForm] = useState({
        price:"",
        name:"",
        description:"",
        image:"",
        condition:"",
        user_id: "",
        category_id: ""
    })
    const [tagForm, setTagForm] = useState([])

    // const [tagForm, setTagForm] = useState({
    //     tag1:"",
    //     tag2:"",
    //     tag3:"",
    // })

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
        // console.log(form)
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
        let img = e.target.files[0];
        console.log(img)
        setSelectedImage(img);
        console.log(URL.createObjectURL(img));

    }


    function handleSubmit(e){
        e.preventDefault()
        // const tagArr = 
        const itemForm = {
            price: form.price,
            name:form.name,
            description:form.description,
            image: form.image,
            condition: form.condition,
            user_id: user.id,
            category_id: form.category_id 
        }

        fetch("/items",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemForm)
        }).then(res => res.json())
          .then(item => {
            newItem(item)
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

    
    
  return (
    <div>
        {selectedImage? <img src={URL.createObjectURL(selectedImage)}></img> : null}
        
        <form onSubmit={handleSubmit}>
            <label>Price
                <input type="number" name="price" placeholder='Enter Price' step="any" value={form.price} onChange={handleChange}></input>
            </label>
            <label>Name
                <input type="text" name="name" value={form.name} onChange={handleChange}></input>
            </label>
            <label>Description
                <input type="text" name="description" value={form.description} onChange={handleChange}></input>
            </label>
            <label>Image
                <input type="text" name="image" value={form.image} onChange={handleChange}></input>
            </label>
            <label>Condition
                <select  name="condition" value={form.condition} onChange={handleChange}>
                    <option>Condition</option>
                    <option>New</option>
                    <option>Like New</option>
                    <option>Good</option>
                    <option>Used</option>
                </select>
            </label>
            <label>Category
                <select  name="category_id"  value={form.category_id} onChange={handleChange}>
                    <option>Category</option>
                    {dropdownCat}
                </select>
            </label><br/>
            
            <label> Tag
                {/* <input type="text" name="tag" list="data" value={testTag} onChange={handleTagChange}/>
                <button type="button" onClick={handleAddTag}>Add Tag</button> */}
                <div className='tags-input'>
                <ul id='tags'>
                    {tagForm.map(tag => {
                        return (
                        <li className='tag'>
                            <span className='tag-title' >{tag} </span>
                            <span className='tag-close-icon' onClick={(e) => handleDelete(tag)}>x</span>
                        </li>)
                    })}
                    {/* {tagForm.map(tag => {
                        return <button onClick={(e) => handleDelete(tag)}>{tag} <b>x</b></button>
                    })} */}
                </ul>
                <input className='tags-input-form' placeholder='Click Add Tag Button To Add Tags' type="text" name="tag" list="data" value={testTag} onChange={handleTagChange} />
                <button style={{marginTop: '10px'}}type="button" onClick={handleAddTag}>Add Tag</button>
                </div>
                
                {/* <input type="text" name="tag1" value={tagForm.tag1} list="data" onChange={handleTagChange}/>
                <input type="text" name="tag2" value={tagForm.tag2} list="data" onChange={handleTagChange}/>
                <input type="text" name="tag3" value={tagForm.tag3} list="data" onChange={handleTagChange}/> */}
                    <datalist id="data">
                        {tagSuggestions}
                    </datalist>
            </label>
            
            
            {/* <label>File
                <input type="file" name="file_upload" onChange={handleFile} />
            </label> */}
            <input type="submit" value="Submit" />
        </form>

        {/* <input onChange={handleImage} type="file" id="image" /> */}
    </div>
  )
}

export default NewItemForm