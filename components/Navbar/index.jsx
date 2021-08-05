import React, {useState,useEffect} from 'react';
import validator from 'validator';
import OtpInput from 'react-otp-input';
import { UserAction } from '../../redux/actions/user.action';
import { connect } from 'react-redux';
import { dataService } from '../../services';
import ProfileDropdown from '../dropdown';
import { setErrors } from '../../redux/actions/error.action';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { googleClientID, facebookAppID } from '../../config/env';
const Navbar = (props) => {
    const [searchBox, setSearchBox] = useState(false);
    const [searchBoxSmall, setSearchBoxSmall] = useState(false);
    const [locationSearch, setLocationSearch] = useState(false);
    const [locationSearchSmall, setLocationSearchSmall] = useState(false);
    const[show,setshow]=useState(false);
    const [popup,setpopup]=useState(null);
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const[success,setSuccess]=useState(false);
    const [Email,setEmail]=useState('');
    const[veri,setVeri]=useState(false);
    const[login,setLogin]=useState(false);
    const [Error, setError] = useState(false);
    const[activatebutton,setActivatebutton]=useState(false);
    const[profilename,setProfilename]=useState('');
    const[ErrorMessage,setErrorMessage]=useState('');
    const[session,setSession]=useState('');
    const[successMessage,setSuccessMessage]=useState('')
    const [otp, setOtp] = useState('');  
    const [attempt,setAttempt] = useState(0) 
    const[loading,setloading]=useState(false)
    const[Disabled,setdisabled]=useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");        
        if (loggedInUser) {
            const User = JSON.parse(localStorage.getItem("user"));
            console.log(User);
            setLogin(true);
            setProfilename(User.info.first_name);
        }
        else console.log("user is not loggedin");
      }, []);


      const FBLogin = (response) => {
        if (response.status !== 'unknown' && response.status !== 'not_authorized') {
            console.log(response)
            const body = {
                access_token: response.accessToken,
                provider: "facebook",
            }
            dataService.socialLogin(body).then((res)=>{
                setLogin(true);
                localStorage.setItem('user',JSON.stringify(res.data))
                setProfilename(res.data.info.first_name);
                window.location.reload()
        })
        }
    }

    const GLogin = (response) => {
        if (!response.error) {
            const body = {
                access_token: response.tokenObj.access_token,
                provider: "google",
            }
            dataService.socialLogin(body).then((res)=>{
                setLogin(true);
                localStorage.setItem('user',JSON.stringify(res.data))
                setProfilename(res.data.info.first_name);
                window.location.reload()
        })
    }
}
      const Otpverification=async(type)=>{
        console.log(attempt)
        let currentAttempt = attempt+1
        setAttempt(currentAttempt)
        if(currentAttempt>5){
            setshow(true);
            setpopup('login');
            setAttempt(0)
            handleLoginOtp()
        }
        else{
        dataService.verifyOtp(session,otp,Email).then((res)=>{
            console.log(res);
            setloading(false);
            if(res.data.data.error_status){
                if(res.data.data.attempts!=undefined)
                {
                    console.log("Incorrect OTP")
                    console.log(res.data.data.message)
                    setSession(res.data.data.data.session)
                    setLogin(false);
                    setErrorMessage(res.data.data.message);
                    setError(true)
                    setOtp('')
                   setVeri(false)
                }
                else{
                    setshow(true);
                    setOtp('');
                    if(type==='signup')
                    {
                        setpopup('otpsignup')
                    }else if(type==='login')
                    { 
                        setpopup('otp');
                    }
                   setVeri(false)
                   handleLoginOtp()
                }
            }
            else{
                setLogin(true);
                localStorage.setItem('user',JSON.stringify(res.data.data.data))
                console.log("response otp",res);
                //setError(true);
                setVeri(false);
                if(type==='login')
                window.Location.reload()
                if(type==='signup'){
                    setpopup('success')
                   setSuccessMessage('Signed up')
                }
                setProfilename(res.data.data.data.info.first_name);
                console.log(res.data.data.data.info.first_name);
                }
        })
    }
    }
    const handleResendOtp=async()=>{
        dataService.ResendOtp(Email).then((response)=>{
            console.log("resend response is",response)
            setError(true)
            setErrorMessage(response.data.data.message)
            setSession(response.data.data.data.session)
        });
    }
    const handleLoginOtp=async()=>{
        dataService.getLogin(Email).then((response)=>{
            console.log("response",response)
            setloading(false)
            if(response.error_status)
            {   
                setError(true);
                setErrorMessage(response.message)
                console.log(response.message)
            }
            else {
                setError(false)
                setpopup('otp');
            setSession(response.data.session)
            }
        });
    }
    const handleSignupOtp=async()=>{
        dataService.getSignup(Email,firstname,lastname).then((response)=>{
            console.log("response",response)
           setloading(false);
            if(response.error_status)
            {
                setError(true)
                setErrorMessage(response.message)
                console.log(response.message)
            }
            else {
                setError(false)
                setpopup('otpsignup');
                setSession(response.data.data.data.session)
            }
            
        });
    }
    const Loginhandler=(type)=>{
                setErrorMessage('')
                setshow(true);
            if(type==='login'){
            setpopup(type)
            }
             if(type==='otp') {
                 setloading(true)
                     handleLoginOtp() 
                    //  setdisabled(false)
            }else if(type==='resend'){
                handleResendOtp();
                setdisabled(true);
            }else if(type=='otpverification') {
                       setloading(true)
                       Otpverification('login') 
                        setActivatebutton(false)
                        
                    }           
        else if(type==='change')
        {
            setpopup(type)
           setActivatebutton(true)
        }
    }
    
    const Signuphandler=(type)=>{
             setErrorMessage('')
             setshow(true);
                if(type==='signup'){
                    setpopup(type);
                }   
                if(type==='otpsignup'){ 
                    setdisabled(false)
                    setloading(true); 
                     if(!validateInput())
                    {
                        setError(true);
                        return;
                    }
                    handleSignupOtp()
                     
                }else if(type==='resend')
                {
                    handleResendOtp();
                    setdisabled(true);
                }
                else if(type==="otpverification") {
                    setloading(true)
                    Otpverification('signup')
                     setActivatebutton(false)
                }
    }
   const validateInput=()=>{
       if(!firstname || !lastname || !validateEmailforsignup(Email)){
           setErrorMessage('Please Fill All the Fields')
           return false
       }
    return true
}
   const validateEmailforsignup = (email) => {
    setErrorMessage('')
    setEmail(email);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Email).toLowerCase())
}
    const validateEmail = (e) => {
        setErrorMessage('')
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(Email).toLowerCase())) {
            setActivatebutton(true);
        }
        else setActivatebutton(false);
    }
        const takeFirstname=(e)=>{
            setErrorMessage('')
            setFirstname(e.target.value);
        }
        const takeLastname=(e)=>{
            setErrorMessage('')
            setLastname(e.target.value);
        }
        const handleotpchange=(otp)=>{
            setOtp(otp);
            if(otp.length===6)
                 setVeri(true);
             else setVeri(false);    
        }
    return (
        <>     
            <header className="custom-header">
                <div className="container custom-container">
                    <nav className="navbar custom-navbar">
                        <a className="header-logo" href="/"><img src="/images/le-logo.svg" alt="Logo"/></a>
                        <div className="header-actions">
                            <ul className={["location-search", locationSearch ? 'show': ''].join(' ')}>
                                <li className="select-li dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                                    onMouseLeave={() => setLocationSearch(false)}
                                    aria-haspopup="true" aria-expanded="false">
                                    <div className="select-field">
                                        <em className="outer-icon">
                                            <img className="location-icon" src="/images/location.svg" alt="location"/>
                                        </em>
                                        <label>
                                            <input placeholder="Sugnall Street, Liverpool, UK"
                                                   onClick={() => setLocationSearch(true)}
                                            />
                                        </label>
                                        <div className={["select-menu dropdown-menu", locationSearch ? 'show': ''].join(' ')} aria-labelledby="dropdownMenuButton">
                                            <div className="inner-content">
                                                <div className="current-location">
                                                    <em>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#0A83EA"
                                                             width="14" height="14" viewBox="0 0 20 20" role="img">
                                                            <title>current-location</title>
                                                            <path
                                                                d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"/>
                                                        </svg>
                                                    </em>
                                                    <p>Use current location</p>
                                                </div>
                                                <p className="using-gps">Using GPS</p>
                                            </div>
                                            <div className="recent-location">Recent Locations</div>
                                            <div className="recent-location-inner">
                                                <div className="location-content">
                                                    <em>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#1C1C1C"
                                                             width="15" height="15" viewBox="0 0 20 20" role="img"
                                                             className="clock-icon">
                                                            <title>time</title>
                                                            <path
                                                                d="M14.76 9.040h-4.22l-2.58-4.28c-0.147-0.354-0.489-0.598-0.889-0.598-0.53 0-0.96 0.43-0.96 0.96 0 0.227 0.079 0.436 0.211 0.6l-0.001-0.002 2.86 4.76c0.172 0.278 0.474 0.46 0.82 0.46 0 0 0 0 0.001 0h4.76c0.467-0.070 0.822-0.469 0.822-0.95s-0.354-0.88-0.817-0.949l-0.005-0.001zM10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.523 0 10-4.477 10-10v0c0-5.523-4.477-10-10-10v0zM10 18.58c-4.739 0-8.58-3.841-8.58-8.58s3.841-8.58 8.58-8.58c4.739 0 8.58 3.841 8.58 8.58v0c0 4.739-3.841 8.58-8.58 8.58v0z"/>
                                                        </svg>
                                                    </em>
                                                </div>
                                                <div className="location-name">Sugnall Street, Liverpool, UK</div>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                                <li className="search-li">
                                    <div className={["search-container", searchBox ? 'active' : ''].join(' ')}>
                                        <form className="search-form">
                                            <label>
                                                <input type="search"
                                                       placeholder="Search for restaurant, cuisine or your favourite dish"
                                                       className="form-field"/>
                                            </label>
                                            <div className="search" onClick={() => setSearchBox(!searchBox)}>
                                                <span>Search</span>
                                                <img src="/images/search.svg" alt="search"/>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                            <ul className="header-right">
                                <li>
                                    <a href="#">
                                        <img src="/images/help.svg" alt="help"/>
                                            <span>Help</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div className="cart">
                                            <img src="/images/cart.svg" alt="cart"/>
                                                <div className="cart-qty">
                                                    <span>2</span>
                                                </div>
                                        </div>
                                        <span>Cart</span>
                                    </a>
                                </li>
                            { !login ?
                             (<li className="dropdown">
                            <a href="#" data-toggle="modal" data-target="#loginModal">
                                <img src="../../images/login.svg" alt="login"/>
                                <span onClick={()=>Loginhandler('login')}>Login/Sign Up</span>
                            </a>
                            </li>):
                            (     <>
                                  
                                   <ProfileDropdown profile={profilename}/>
                                   </>
                            )
                            }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="search-outer">
                <div className="search-inner">
                    <div className={["select-outer"]} onClick={() => setLocationSearchSmall(!locationSearchSmall)}>
                        <div className="select-inner">
                            <div className="outer-icon">
                                <img className="location-icon" src="/images/location.svg" alt="location"/>
                            </div>
                            <div className="select-placeholder">Sugnall Street, <span>Liverpool, UK</span></div>
                        </div>
                    </div>
                    <div className="search-icon-outer" onClick={() => setSearchBoxSmall(!searchBoxSmall)}>
                        <img className="search-icon" src="images/search.svg" alt="search"/>
                    </div>
                </div>
            </div>

            <div className={["search-popup", searchBoxSmall ? 'show' : ''].join(' ')}>
                <div className={["modal fade search-modal",searchBoxSmall ? 'show' : ''].join(' ')} id="exampleModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" id="exampleModalLabel">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSearchBoxSmall(false)}>
                                <img src="/images/new-close.svg" alt="close-icon"/>
                            </button>
                            <div className="modal-header">
                                <div className="location-guide">
                                    <a href="#" data-toggle="modal" data-target="#exampleModal1" data-dismiss="modal"
                                       aria-label="Close">Sugnall Street, Liverpool, UK</a>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form className="search-form" method="post">
                                    <div className="form-group material-textfield">
                                        <div><img className="search-icon" src="/images/search.svg" alt="search"/></div>
                                        <input className="form-control" id="first-name" name="first-name"
                                               placeholder="Search for restaurant, cuisine or a dish" type="text"
                                               autoComplete="off"/>
                                            <label htmlFor="first-name" className="text-label">Search for restaurant,
                                                cuisine or a dish</label>
                                    </div>
                                </form>
                                <div className="resto-list">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="restaurant-info">
                                                <img className="search-list-img" src="/images/food-list2.jpg"
                                                     alt="food-item"/>
                                                    <div className="resto-detail">
                                                        <div className="food-desc">
                                                            <h4>KFC</h4>
                                                            <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="restaurant-info">
                                                <img className="search-list-img" src="/images/food-list4.jpg"
                                                     alt="food-item"/>
                                                    <div className="resto-detail">
                                                        <div className="food-desc">
                                                            <h4>KFC</h4>
                                                            <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="restaurant-info">
                                                <img className="search-list-img" src="/images/food-list6.jpg"
                                                     alt="food-item"/>
                                                    <div className="resto-detail">
                                                        <div className="food-desc">
                                                            <h4>KFC</h4>
                                                            <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="address-popup">
                <div className={["modal fade", , locationSearchSmall ? 'show' : ''].join(' ')} id="exampleModal1" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel1" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" id="exampleModalLabel1">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setLocationSearchSmall(false)}>
                                <img src="/images/new-close.svg" alt="close-icon"/>
                            </button>
                            <div className="modal-header">
                                <h2>Select delivery location</h2>
                            </div>
                            <div className="modal-body">
                                <form className="location-search-form" method="post">
                                    <div className="form-group material-textfield">
                                        <div><img className="search-icon" src="images/search.svg" alt="search"/></div>
                                        {/*<label htmlFor="location" style="display: none;"/>*/}
                                        <input
                                        className="form-control" id="location" name="location"
                                        placeholder="Sugnall Street, Liverpool, UK" type="text" autoComplete="off"/>
                                    </div>
                                </form>
                                <div className="detect-location">
                                    <div className="inner-content">
                                        <div className="current-location">
                                            <em>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#0A83EA" width="14"
                                                     height="14" viewBox="0 0 20 20" role="img">
                                                    <title>current-location</title>
                                                    <path
                                                        d="M13.58 10c0 1.977-1.603 3.58-3.58 3.58s-3.58-1.603-3.58-3.58c0-1.977 1.603-3.58 3.58-3.58v0c1.977 0 3.58 1.603 3.58 3.58v0zM20 9.52v0.96c0 0.265-0.215 0.48-0.48 0.48v0h-1.72c-0.447 3.584-3.256 6.393-6.802 6.836l-0.038 0.004v1.72c0 0.265-0.215 0.48-0.48 0.48v0h-0.96c-0.265 0-0.48-0.215-0.48-0.48v0-1.72c-3.575-0.455-6.375-3.262-6.816-6.802l-0.004-0.038h-1.74c-0.265 0-0.48-0.215-0.48-0.48v0-0.96c0-0.265 0.215-0.48 0.48-0.48v0h1.74c0.445-3.578 3.245-6.385 6.781-6.836l0.039-0.004v-1.72c0-0.265 0.215-0.48 0.48-0.48v0h0.96c0.265 0 0.48 0.215 0.48 0.48v0 1.72c3.584 0.447 6.393 3.256 6.836 6.802l0.004 0.038h1.72c0.265 0 0.48 0.215 0.48 0.48v0zM15.96 10c0-3.292-2.668-5.96-5.96-5.96s-5.96 2.668-5.96 5.96c0 3.292 2.668 5.96 5.96 5.96v0c3.292 0 5.96-2.668 5.96-5.96v0z"/>
                                                </svg>
                                            </em>
                                            <p>Use current location</p>
                                        </div>
                                        <p className="using-gps">Using GPS</p>
                                    </div>
                                    <div className="recent-location">Recent Locations</div>
                                     <div className="recent-location-outer">
                                        <div className="recent-location-inner">
                                            <div className="location-content">
                                                <em>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#1C1C1C" width="15"
                                                         height="15" viewBox="0 0 20 20" role="img"
                                                         className="clock-icon">
                                                        <title>time</title>
                                                        <path
                                                            d="M14.76 9.040h-4.22l-2.58-4.28c-0.147-0.354-0.489-0.598-0.889-0.598-0.53 0-0.96 0.43-0.96 0.96 0 0.227 0.079 0.436 0.211 0.6l-0.001-0.002 2.86 4.76c0.172 0.278 0.474 0.46 0.82 0.46 0 0 0 0 0.001 0h4.76c0.467-0.070 0.822-0.469 0.822-0.95s-0.354-0.88-0.817-0.949l-0.005-0.001zM10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.523 0 10-4.477 10-10v0c0-5.523-4.477-10-10-10v0zM10 18.58c-4.739 0-8.58-3.841-8.58-8.58s3.841-8.58 8.58-8.58c4.739 0 8.58 3.841 8.58 8.58v0c0 4.739-3.841 8.58-8.58 8.58v0z"/>
                                                    </svg>
                                                </em>
                                            </div>
                                            <div className="location-name">Sugnall Street, Liverpool, UK</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className={["modal fade login-modal", show && (popup==='login' || popup==='change')? "show display-popup" : ""].join(" ")}
            id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" id="loginModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2 >Login</h2>
                </div>
                <div className="modal-body">
                    <p>Login with your Email Address</p>
                    <form autoComplete="off">
                        <div className={["form-group",Error? " form-error":" "].join('')}>
                            <input type="text" id="mob-email" name="mob-email" className="form-control"  placeholder=" "onChange={(e)=>validateEmail(e)}/>
                            <label htmlFor="mob-email" className="input-label"> Email Address</label>
                        </div> 
                        {Error && <p className="error"> {ErrorMessage} </p>}
                        {/* {success && <p> {successMessage} </p>} */}
                        <div className="form-group">
                            {!activatebutton?
                            (<button type ="button"className="form-control login-buttons" id="otp-fade-btn" value="Send OTP" data-toggle="modal" data-target={activatebutton?"#mobileOtpModal":""} data-dismiss="modal" aria-label="Close" >Send OTP</button>)
                            :
                            (
                            <button  type="button"className="form-control login-buttons" value="Send OTP" data-toggle="modal" data-target="#mobileOtpModal" data-dismiss="modal" aria-label="Close" onClick={()=>Loginhandler('otp')} disabled={loading}>
                             Send OTP
                             {loading && (
                                       <span className="spinner-border custom-spinner " role="status" aria-hidden="true"></span>
                             )}
                             </button>)
                            }
                        </div>
                    </form>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <div className="login-with">
                        <GoogleLogin
                        clientId={googleClientID}
                        autoLoad={false}
                        render={renderProps => (
                        <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="images/g-icon.svg" alt="Google"/>with Google</a>
                        )}
                        buttonText="Login"
                        onSuccess={GLogin}
                        onFailure={GLogin}
                       />
                        <FacebookLogin
                                    appId={facebookAppID}
                                    autoLoad={false}
                                    fields='first_name,last_name,email, picture'
                                    callback={FBLogin}
                                    render={renderProps => (
                                        <a href="#" onClick={renderProps.onClick}><img src="../../images/f-icon.svg" alt="Facebook"/>with Facebook</a>
                                    )}
                                />
                    </div>
                </div>
                <div className="modal-footer">
                    <p>Don’t have an account? <a href="#" data-toggle="modal" data-target="#signupModal" data-dismiss="modal" aria-label="Close"onClick={()=>Signuphandler('signup')}>Sign up</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal",show && (popup==='otp')? "show display-popup" : ""].join(" ")} id="mobileOtpModal" tabIndex="-1" role="dialog" aria-labelledby="mobileOtpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="mobileOtpModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2>Enter OTP</h2>
                </div>
                <div className="modal-body">
                    <div className="mobile-otp">
                        <p>6 digit OTP has been sent to your Email Address,{Email}, please enter to Log in <span>OTP valid for 10 minutes.</span></p>
                        <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('change')}>Change Email Address</a>
                    </div>
                    {Error &&
                            (<>
                            <p className="error">{ErrorMessage}</p> 
                            </> )
                          }
                    <OtpInput className="otp-input"
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    clearInputs={true}
                    separator={<span> </span>}
                /> 
                  <form autoComplete="off">
                   <div className="form-group">
                     {!veri?
                           (<button type="reset" className="form-control login-buttons" id="otp-fade-btn" value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" >Verify OTP</button>)
                           :
                           (<button type="reset" className="form-control login-buttons"  value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Loginhandler('otpverification')} disabled={loading}>
                               Verify OTP
                               {loading && (
                                       <span className="spinner-border custom-spinner " role="status" aria-hidden="true"></span>
                             )}
                             </button>)
                     }
                        </div>
                        </form>
                    <div className="remain-timer">
                        <h2 id="timer"></h2>
                        <div className="resend-otp">
                            <p>Did not receive? <a href="#" onClick={()=>Loginhandler('resend')}disabled={Disabled}>Resend</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal signup-modal", show && popup==='signup'? "show display-popup" : ""].join(
              " "
            )}id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="signupModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="images/close.svg" alt="close-icon"onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2>Sign up</h2>
                </div>
                <div className="modal-body">
                       {Error &&
                            (<>
                            <p className="error">{ErrorMessage}</p> 
                            </> )
                          }
                    <form autoComplete="off">
                        <div className="form-group full-name">
                            <input type="text" id="first-name" name="first-name" className="form-control" placeholder=" "onChange={(e)=>takeFirstname(e)}/>
                            <label htmlFor="first-name" className="input-label" >First Name</label>
                        </div>
                        <div className="form-group full-name">
                            <input type="text" id="Last-name" name="Last-name" className="form-control" placeholder=" "onChange={(e)=>takeLastname(e)}/>
                            <label htmlFor="Last-name" className="input-label" >Last Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" className="form-control" placeholder=" " onChange={(e)=>validateEmailforsignup(e.target.value)}/>
                            <label htmlFor="email" className="input-label">Email Address</label>
                        </div>
                        <p className="text-agree">Signing up for an account, you agree to our <br/><a href="#">Terms & Conditions</a>, <a href="#">Privacy Policy</a> and <a href="#">Cancellation & Refund Policies</a></p>
                        <div className="form-group">
                        {/* {!activatebutton?
                            (
                            <button type="button"className="form-control login-buttons" id="otp-fade-btn" value="Send OTP" data-toggle="modal" data-target="#emailOtpModal" data-dismiss="modal" aria-label="Close">Send OTP</button>)
                            : */}
                            <button type="button" className="form-control login-buttons" value="Send OTP" data-toggle="modal" data-target="#emailOtpModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('otpsignup')} disabled={loading}>
                                Send OTP
                                {loading && (
                                       <span className="spinner-border custom-spinner " role="status" aria-hidden="true"></span>
                                 )}
                                </button>
                            
                        </div>
                    </form>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <div className="login-with">
                        {/* <a href="#"><img src="../../images/g-icon.svg" alt="Google_Icon"/>with Google</a> */}
                        <GoogleLogin
                        clientId={googleClientID}
                        autoLoad={false}
                        render={renderProps => (
                        <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="images/g-icon.svg" alt="Google"/>with Google</a>
                        )}
                        buttonText="Login"
                        onSuccess={GLogin}
                        onFailure={GLogin}
                    />
                        {/* <a href="#"><img src="../../images/f-icon.svg" alt="Facebook_Icon"/>with Facebook</a> */}
                        <FacebookLogin
                                    appId={facebookAppID}
                                    autoLoad={false}
                                    fields='first_name,last_name,email, picture'
                                    callback={FBLogin}
                                    render={renderProps => (
                                        <a href="#" onClick={renderProps.onClick}><img src="../../images/f-icon.svg" alt="Facebook"/>with Facebook</a>
                                    )}
                                />
                    </div>
                </div>
                <div className="modal-footer">
                    <p>Already have an account? <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('login')}>Log in</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal signup-modal", show && (popup==='otpsignup')? "show display-popup" : ""].join(
              " "
            )} id="emailOtpModal" tabIndex="-1" role="dialog" aria-labelledby="emailOtpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="emailOtpModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="images/close.svg" alt="close-icon" onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2>Enter OTP</h2>
                </div>
                <div className="modal-body">
                    <div className="mobile-otp">
                        <p>6 digit OTP has been sent to your Email Address, {Email}, please enter to Signup <span>OTP valid for 10 minutes.</span></p>
                    </div>
                    {Error &&
                            (<>
                            <p className="error">{ErrorMessage}</p> 
                            </> )
                          }
                     <OtpInput className="otp-input"
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    separator={<span> </span>}/> 
                  <form>
                   <div className="form-group">
                     {!veri?
                           ( <button type="reset" className="form-control login-buttons" id="otp-fade-btn" value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" >Verify OTP</button>)
                           :
                           ( <button type="reset" className="form-control login-buttons" id={!veri?"otp-fade-btn":""} value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('otpverification')} disabled={loading}>
                               Verify OTP
                               {loading && (
                                       <span className="spinner-border custom-spinner " role="status" aria-hidden="true"></span>
                             )}
                               </button>)
                     }
                    </div>
                    </form>
                    <div className="remain-timer">
                        <h2 id="newtimer"></h2>
                        <div className="resend-otp">
                            <p>Did not receive? <a href="#" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('resend')} disabled={Disabled}>Resend</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div className={["modal fade login-modal signup-modal", success && show && popup==='success'? "show display-popup" : ""].join(" ")} id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" id="successModalLabel">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <img src="../../images/close.svg" alt="close-icon" onClick={()=>setshow(false)}/>
                    </button>
                    <div className="modal-header">
                    </div>
                    <div className="modal-body success-body">
                        <img src="../../images/success_icon.svg" alt="Success_Image"/>
                        <p>You have Successfully {successMessage}!</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};    
  export default Navbar;
