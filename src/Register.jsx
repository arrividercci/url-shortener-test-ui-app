import React, {useState} from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const accountUrl = "https://localhost:7269/api/account/register";
    
    function handleSubmit(e){
        e.preventDefault();
        if (!validate()) alert("Email and password can't be null or empty.");
        else{
            const registerUser = {
                email: email,
                password: pass,
                confirmPassword: confirmPass
            };
            fetch(accountUrl,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(registerUser)
            }).then(() => props.onFormSwitch('login'))
              .catch(error => alert(error));       
        }
    }

    function validate(){
        if (email.trim() === '' || email === null) return false;
        if (pass.trim() === '' || pass === null) return false;
        if (confirmPass.trim() === '' || confirmPass === null) return false;
        if (confirmPass !== pass) return false;
        return true;
    }
    
    return (
        <div className="auth-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='example@gmail.com' id='email' name='email'/>
            <label htmlFor='password'>Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='**********' id='password' name='password'/>
            <label htmlFor='confirmPass'>Confirm password</label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type='password' placeholder='**********' id='confirmPass' name='confirmPass'/>
            <button type='submit'>Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}><span className="btn-text">Have account? Log in</span></button>
        </div>
    )
}