import React, {useState} from "react"
import { Home } from "./Home";
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const accountUrl = "https://localhost:7269/api/account/login";

    async function handleSubmit(e){
        e.preventDefault();
        // if (!validate()) alert("Email and password can't be null or empty.");
        // else{
            const loginUser = {
                email: email,
                password: pass
            };
            let result = await fetch(accountUrl,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(loginUser)
            }).then(data => data.json())
              .then(data => {sessionStorage.setItem("user-data", data.token); props.onFormSwitch('home');})
              .catch(error => alert(error));       
        // }
    }

    function validate(){
        if (email.trim() === '' || email === null) return false;
        if (pass.trim() === '' || pass === null) return false;
        return true;
    }
    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='example@gmail.com' id='email' name='email'/>
                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='**********' id='password' name='password'/>
                <button type='submit'>Log in</button>
            </form>
            <button className="link-btn" onClick={() => {props.onFormSwitch('register'); Home.updateTable()}}><span className="btn-text">Don't have account? Sign up</span></button>
        </div>
    )
}