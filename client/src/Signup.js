import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import { Input, Container, Button, Avatar } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'


function Signup({setUser, setUserData}) {
    const [imageDisplay, setImageDisplay] = useState()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    let history = useHistory()

    // function handleSubmit(e){
    //     e.preventDefault()
    //     console.log(e)
    //     fetch("/users",{
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(form)
    //     }).then(res => {
    //         if(res.ok){
    //             res.json()
    //             .then(user =>{
    //                 setUser(user)
    //                 setUserData(user)
    //                 history.push('/')
    //             })
    //         } else {
    //             res.json()
    //             .then(json => console.log(json.error))
    //         }
    //     })
    // }

    function handleFile(e) {
        let file = e.target.files[0];
        // console.log(img)
        // setSelectedImage(img);
        let img = (URL.createObjectURL(file));
        setImageDisplay(img)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log("hello")
        const formData = new FormData() 
        formData.append('user[username]' , e.target.username.value)
        formData.append('user[password]' , e.target.password.value)
        formData.append('user[avatar]', e.target.avatar.files[0], e.target.avatar.value)
        
        
        fetch('/users', {
            method: 'post',
            body: formData,
        }).then(res => res.json())
          .then(data => {
            setUser(data)
            setUserData(data)
            history.push('/')
        })
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <Container style={{marginTop:"50px", width:"400px"}}> 
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <Input type="text" name="username" value={form.username} onChange={handleChange}/>
            </label>
            <label>
                Password
                <Input type="password"  name="password" value={form.password} onChange={handleChange}/>
            </label>
            <Container>
            <label>
                
            <h4 style={{marginLeft:"25%", padding:"10px"}}>Upload Profile Image</h4>
                    <AttachmentIcon w={8} h={8} color='gray'style={{marginLeft:"45%"}}/>
                <Input type="file" name="avatar" placeholder="avatar" display='none' onChange={handleFile} ></Input>
            </label>
            </Container>
            <Avatar  src={imageDisplay} style={{marginTop:"20px", marginBottom:"20px"}}></Avatar>
            <Container>
            <Button type="submit" colorScheme='teal'>Signup</Button>
            </Container>
        </form>
        
    </Container>
  )
}

export default Signup