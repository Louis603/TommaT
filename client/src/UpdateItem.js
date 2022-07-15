import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function UpdateItem({user, userData, setListedItem, handleUpdatedItem, listedItem}) {
  const [singleItem, setSingleItem] = useState({tags:[], images_urls:[]})
  const [form, setForm] = useState({
    name:"",
    price:"",
    description:""
  })

  const { id } = useParams()
  let history = useHistory()

  useEffect(() =>{
    fetch(`/items/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      setSingleItem(data)
      setForm(data)
    })
  }, []);

  function handleChange(e){
    setForm({...form, [e.target.name]:e.target.value})
    }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      }).then(res => res.json())
        .then(data => {
            handleUpdatedItem(data)
            setListedItem(!listedItem)
            console.log(data)
            history.push('/self')
        })
  }

  return (
    <div style={{width: "85%", marginTop:"40px"}}>
        <div className='item-focus-container'>
            <div className="item-focus-image">
                <img src={singleItem.images_urls[0]} style={{width: "600px", height:"650px", objectFit:"contain"}}/>
            </div>
            <div style={{width:"500px"}}>
                <form onSubmit={handleSubmit}>
                    <label>Title
                        <Input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                        ></Input>
                    </label>
                    <label>Description
                        <Textarea
                            resize='vertical'
                            rows="12"
                            type="text" 
                            name="description" 
                            value={form.description} 
                            onChange={handleChange}
                        ></Textarea>
                    </label>
                    <label>price
                        <Input
                            type='number'
                            name='price'
                            value={form.price}
                            onChange={handleChange}
                        ></Input>
                    </label>
                    <Button type='submit'style={{marginTop:"10px"}} colorScheme='teal'>Update Item</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateItem