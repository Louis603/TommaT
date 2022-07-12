import React, {useState} from 'react'
import { useHistory } from "react-router-dom"


function Login({setUser, setUserData}) {
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
                .then(json => console.log(json.error))
            }
        })
          
        // }).then(res => res.json())
        //   .then(data => {
        //     setUser(data)
        //     setUserData(data)
        //     setForm({
        //         username: "",
        //         password: ""
        //     })
        //     history.push('/')
        //   })
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <div> Login
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" name="username" value={form.username} onChange={handleChange}/>
            </label>
            <label>
                Password
                <input type="password"  name="password" value={form.password} onChange={handleChange}/>
            </label>
            <input type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login