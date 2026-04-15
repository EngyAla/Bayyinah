import { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";



const Auth = ()=>{
    const [open, setOpen] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    const navigate = useNavigate()
    // const [isSignIn, setIsSignIn] = useState(true);
    const auth = useAuth();
    // form values
    const [signInData, setSignInData] = useState({name: "", password: ""});
    const [signupData, setSignUpData] = useState({name: "", password: "", email: ""});

    const handleSignUp = (e)=>{
        e.preventDefault();
        const container = document.querySelector(".container");
        const {name, password, email} = signupData;
        if(!name || !password || !email){
            setErrorMessage("Please fill in all fields.")
            setOpen(true)
            return;
        } 
        container.classList.remove("active");
        localStorage.setItem("registeredUser", JSON.stringify({name, email, password}))
        setSignUpData({name: "", password: "", email: ""})
        // setIsSignIn(true)
    }
    const handleSignIn = (e)=>{
        e.preventDefault();
        const {name, password} = signInData;
        const savedUser = JSON.parse(localStorage.getItem("registeredUser"))
        if(savedUser &&
            name === savedUser.name &&
            password === savedUser.password
        ){
            auth.login(savedUser)
            navigate("/", {replace: true})
            
        } else{
            setErrorMessage("Invalid name or password.")
            setOpen(true)
        }
    }
    useEffect(() => {
            const container = document.querySelector(".container");
            const register_btn = document.querySelector(".register_btn");
            const login_btn = document.querySelector(".login_btn");            
    
            if (register_btn && login_btn && container ) {
                register_btn.addEventListener("click", () => {
                    container.classList.add("active");
                });
                login_btn.addEventListener("click", () => {
                    container.classList.remove("active");
                });
            }
    
            // Cleanup (optional, but good practice)
            return () => {
                if (register_btn) register_btn.removeEventListener("click", () => {});
                if (login_btn) login_btn.removeEventListener("click", () => {});
            };
        }, []);
    return(
        <div className="login_body">  
            <div className="container">
                <div className="form_box login">
                    <form action="" onSubmit={handleSignIn}>
                        <h1>Login</h1>
                        <div className="input_box">
                            <input type="text" placeholder="Username" value={signInData.name} onChange={(e) => setSignInData({...signInData, name: e.target.value})}/>
                            <PersonIcon className="login_icon"/>
                        </div>
                        <div className="input_box">
                            <input type="password" placeholder="Password" value={signInData.password} onChange={(e) => setSignInData({...signInData, password: e.target.value})}/>
                            <PasswordIcon className="login_icon"/>
                        </div>
                        <div className="forget_link">
                            <a href="#">forget password?</a>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <p>or login with social platforms</p> 
                        <div className="social_icons">
                            <a href="#"><GoogleIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><FacebookIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><GitHubIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><LinkedInIcon sx={{fontSize: "30px"}}/></a>
                        </div>
                    </form>
                </div>
            {/* //////////////////// */}
                <div className="form_box register">
                    <form action="" onSubmit={handleSignUp}>
                        <h1>Registration</h1>
                        <div className="input_box">
                            <input type="text" placeholder="Username" value={signupData.name} onChange={(e)=> setSignUpData({...signupData, name:e.target.value})} />
                            <PersonIcon className="login_icon"/>
                        </div>
                        <div className="input_box">
                            <input type="email" autoComplete="off" placeholder="Email" value={signupData.email} onChange={(e)=> setSignUpData({...signupData, email:e.target.value})}/>
                            <EmailIcon className="login_icon"/>
                        </div>
                        <div className="input_box">
                            <input type="password" placeholder="Password" value={signupData.password} onChange={(e)=> setSignUpData({...signupData, password:e.target.value})}/>
                            <PasswordIcon className="login_icon"/>
                        </div>
                        <button type="submit" className="btn form_btn">Register</button>
                        <p>or register with social platforms</p> 
                        <div className="social_icons">
                            <a href="#"><GoogleIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><FacebookIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><GitHubIcon sx={{fontSize: "30px"}}/></a>
                            <a href="#"><LinkedInIcon sx={{fontSize: "30px"}}/></a>
                        </div>
                    </form>
                </div>
            {/* ///////////////// */}
                <div className="toggle_box">
                    <div className="toggle_pannle toggle_left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register_btn">Register</button>
                    </div>
                    <div className="toggle_pannle toggle_right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login_btn">Login</button>
                    </div>
                </div>
            </div>
            {errorMessage && (
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: 'top',horizontal: 'right'}}> 
                <Alert
                    onClose={handleClose}
                    severity="error"
                    // variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
                </Snackbar>
            )}
        </div>
    )
}

export default Auth;