import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import { Input, Container, Button } from '@chakra-ui/react'


function Login({setUser, setUserData}) {
    const [handleError, setHandleError]= useState()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    let history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        fetch("/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(res => {
            if(res.ok){
                res.json()
                .then(user =>{
                    setUser(user)
                    setUserData(user)
                    history.push('/')
                })
            } else {
                res.json()
                .then(json => setHandleError(json.error))
            }
        })
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <Container style={{marginTop:"50px", width:"400px"}}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <Input type="text" name="username" value={form.username} onChange={handleChange}/>
            </label>
            <label>
                Password
                <Input type="password"  name="password" value={form.password} onChange={handleChange}/>
            </label>
            <Button type="submit" value="Login"  colorScheme='teal'>Login</Button>
        </form>
        <h3>{handleError}</h3>
    </Container>
  )
}

export default Login