import React, {useState, useEffect} from 'react'

function NewItemForm({user, newItem}) {
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

    const [tagForm, setTagForm] = useState({
        tag1:"",
        tag2:"",
        tag3:"",
    })

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
        setTagForm({...tagForm, [e.target.name]:e.target.value})
        // console.log(tagForm)
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
                    tags: [ 
                        tagForm.tag1, 
                        tagForm.tag2, 
                        tagForm.tag3
                    ]
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
        
        //   fetch("/tags",{
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         tags: [ 
        //             tagForm.tag1, 
        //             tagForm.tag2, 
        //             tagForm.tag3
        //         ]
        //     })
        // }).then(res => res.json())
        //   .then(data => {
        //     data.map(d => {
        //         fetch("/item_tags",{
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({
        //                 item_id: newItemId,
        //                 tag_id: d.id
        //             })
        //         })
        //     })
        //   })
    }
 
    const dropdownCat = categories.map(cat => {
        return <option key={cat.id} value={cat.id} >{cat.name}</option>
    })

    const tagSuggestions = tags.map(tag => {
        return <option key={tag.id} value={tag.hashtag} />
    })

    
    
  return (
    <div>
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
                <input type="text" name="tag1" value={tagForm.tag1} list="data" onChange={handleTagChange}/>
                <input type="text" name="tag2" value={tagForm.tag2} list="data" onChange={handleTagChange}/>
                <input type="text" name="tag3" value={tagForm.tag3} list="data" onChange={handleTagChange}/>
                    <datalist id="data">
                        {tagSuggestions}
                    </datalist>
            </label>

            <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default NewItemForm