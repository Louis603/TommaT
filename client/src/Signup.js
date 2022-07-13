import React, {useState} from 'react'
import { useHistory } from "react-router-dom"

function Signup({setUser, setUserData}) {
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

    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData() 
        formData.append('user[username]' , e.target.username.value)
        formData.append('user[password]' , e.target.password.value)
        formData.append('user[avatar]', e.target.avatar.files[0], e.target.avatar.value)
        fetch('/users', {
            method: 'post',
            body: formData,
        }).then(res => res.json())
          .then(data => console.log(data))
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
            <label>Image
                <input type="file" name="avatar" placeholder="avatar"   ></input>
            </label>
            <input type="submit" value="Signup" />
        </form>
    </div>
  )
}

export default Signup