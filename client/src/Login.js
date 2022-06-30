import React, {useState} from 'react'


function Login({setUser}) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log(e)
        fetch("/login",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }).then(res => res.json())
          .then(data => setUser(data))
    }

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <div>
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