import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

function Signup({setUser, setUserData}) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    let history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        console.log(e)
        fetch("/users",{
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
                .then(json => console.log(json.error))
            }
        })
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <div> Signup
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" name="username" value={form.username} onChange={handleChange}/>
            </label>
            <label>
                Password
                <input type="password"  name="password" value={form.password} onChange={handleChange}/>
            </label>
            <input type="submit" value="Signup" />
        </form>
    </div>
  )
}

export default Signup