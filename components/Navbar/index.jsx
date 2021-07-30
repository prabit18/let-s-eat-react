import React, {useState,useEffect} from 'react';
import validator from 'validator';
import OtpInput from 'react-otp-input';
import { UserAction } from '../../redux/actions/user.action';
import { connect } from 'react-redux';
import { dataService } from '../../services';
const Navbar = (props) => {
    
    // debugger
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
    const [Error, setError] = useState(true);
    const[activatebutton,setActivatebutton]=useState(false);
    const[profilename,setProfilename]=useState('');
    const[message,setMessage]=useState('');
    const[session,setSession]=useState('');
    const[Dropdown,setDropdown]=useState(false);
    const [otp, setOtp] = useState('');  
    const [attempt,setAttempt] = useState(0) 
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
      const Otpverification=async()=>{
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
            if(res.data.data.error_status){
                if(res.data.data.attempts!=undefined)
                {
                    console.log("Incorrect OTP")
                    setSession(res.data.data.data.session)
                    setLogin(false);
                    setpopup('otp');
                }
                else{
                    setshow(true);
                    setpopup('otp');
                    handleLoginOtp()
                }
            }
            else{
                setLogin(true);
                localStorage.setItem('user',JSON.stringify(res.data.data.data))
                console.log("response otp",res);
                setSuccess(true);
                setpopup('success')
                setProfilename(res.data.data.data.info.first_name);
                console.log(res.data.data.data.info.first_name);
                }
        })
    }
    }
    // const handleLoginOtp=async()=>{
    //     dataService.getLogin(Email).then((response)=>{
    //         console.log("response",response)
    //         setSession(response.data.session)
    //     });
    // }

    const handleLoginOtp=async()=>{
        dataService.getLogin(Email).then((response)=>{
            console.log("response",response)
            if(response.error_status)
            {
                setError(true)
                console.log(response.message)
            }
            else {
                setError(false)
            setSession(response.data.session)
            }
        });
    }
    const handleSignupOtp=async()=>{
        dataService.getSignup(Email,firstname,lastname).then((response)=>{
            console.log("response",response)
            setSession(response.data.data.data.session)
        });
    }
    const Loginhandler=(type)=>{
            setshow(true);
            setpopup(type);
      if(type==='otp'|| type==='resend') {
            handleLoginOtp()    
            setActivatebutton(false)    
        }
        else if(type=='otpverification' && !Error) {
                Otpverification()
                setActivatebutton(false)
            }
        }
    
    const Signuphandler=(type)=>{
            setshow(true);
            setpopup(type);
        if(type==='otpsignup'|| type==='resend1'){   
            handleSignupOtp();
            setActivatebutton(false)
        }
         else if(type==="otpverification") {
           Otpverification();
           setActivatebutton(false)
        }
    }
    const logouthandler=()=>{
        console.log('function')
        localStorage.removeItem('user')
        setDropdown(false);
        setLogin(false);
      }
    const dropdownhandler=()=>{
        console.log("this dropdown function is calling")
      setDropdown(true);
    }
    
        const takeFirstname=(e)=>{
            setFirstname(e.target.value);
        }
        const takeLastname=(e)=>{
            setFirstname(e.target.value);
        }
        const validateEmail = (e) => {
            var email = e.target.value
            setEmail(email);
            if (validator.isEmail(email)) {
            if(email.length>0){
             setActivatebutton(true);
            }else{
                setActivatebutton(false);
             }
            }
            else {
            setActivatebutton(false);
            }
        }
        const handleotpchange=(otp)=>{
            setOtp(otp);
            if(otp.length===6)
                 setVeri(true);
        }
        const reloadhandler=()=>{
            setshow(false)
            window.location.reload();
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
                            (
                            <li className="dropdown">
                                <a aria-expanded="false" className="login-signup-link" aria-haspopup="true" data-toggle="dropdown" href="#"
                                   id="dropdownMenuButton1">
                                    <img alt="login" src="../../images/login.svg"/>
                                    <span onClick={()=>dropdownhandler()}>{profilename}</span>
                                </a>
                                <ul aria-labelledby="dropdownMenuButton1" className={["dropdown-menu profile-menu ", Dropdown? 'show' : ''].join(' ')}>
                                    <li>
                                        <a href="#">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#">Orders</a>
                                    </li>
                                    <li>
                                       <a href="#">Favourites</a>
                                    </li>
                                    <li>
                                        <a href="#">Rewards</a>
                                    </li>
                                    <li>
                                        <a href="#">Notifications</a>
                                   </li>
                                    <li>
                                        <a href="#">Reviews</a>
                                    </li>
                                    <li>
                                        <a href="#">Settings</a>
                                  </li>
                                    <li>
                                        <a className="logout-link" href="#" onClick={logouthandler}>Logout</a>
                                   </li>
                               </ul>
                            </li>
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
            
        <div className={["modal fade login-modal", show && popup==='login'? "show display-popup" : ""].join(" ")}
            id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" id="loginModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2 onClick={()=>Loginhandler('login')}>Login</h2>
                </div>
                <div className="modal-body">
                    <p>Login with your Email Address</p>
                    <form autoComplete="off">
                        <div className="form-group">
                            <input type="text" id="mob-email" name="mob-email" className="form-control"  placeholder=" "onChange={(e)=>validateEmail(e)}/>
                            <label for="mob-email" className="input-label">Enter Email Address</label>
                        </div>
                        <div className="form-group">
                            <button type="reset" className="form-control login-buttons" id={!activatebutton?"otp-fade-btn":"" }value="Send OTP" data-toggle="modal" data-target={activatebutton?"#mobileOtpModal":""} data-dismiss="modal" aria-label="Close" onClick={()=>Loginhandler('otp')}>Send OTP</button>
                        </div>
                    </form>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <div className="login-with">
                        <a href="#"><img src="../../images/g-icon.svg" alt="Google_Icon"/>with Google</a>
                        <a href="#"><img src="../../images/f-icon.svg" alt="Facebook_Icon"/>with Facebook</a>
                    </div>
                </div>
                <div className="modal-footer">
                    <p>Don’t have an account? <a href="#" data-toggle="modal" data-target="#signupModal" data-dismiss="modal" aria-label="Close"onClick={()=>Signuphandler('signup')}>Sign up</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal", show && (popup==='otp'||popup==='resend')? "show display-popup" : ""].join(" ")} id="mobileOtpModal" tabindex="-1" role="dialog" aria-labelledby="mobileOtpModalLabel" aria-hidden="true">
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
                        <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('login')}>Change Email Address</a>
                    </div>
                    {/* <form className="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                        <div className="form-group">
                            <label for="digit-1"></label><input className="ml-0" type="password" id="digit-1" name="digit-1" data-next="digit-2" />
                            <label for="digit-2"></label><input type="password" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
                            <label for="digit-3"></label><input type="password" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
                            <label for="digit-4"></label><input type="password" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
                            <label for="digit-5"></label><input type="password" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
                            <label for="digit-6"></label><input type="password" id="digit-6" name="digit-6" data-previous="digit-5" />
                        </div>
                    </form> */}
                    <OtpInput
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    separator={<span>-</span>}
                /> 
                  <form>
                   <div className="form-group">
                            <button type="reset" className="form-control login-buttons" id={!veri?"otp-fade-btn":""} value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Loginhandler('otpverification')}>Verify OTP</button>
                        </div>
                        </form>
                    <div className="remain-timer">
                        <h2 id="timer"></h2>
                        <div className="resend-otp">
                            <p>Did not receive? <a href="#" onClick={()=>Loginhandler('resend')}>Resend</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal signup-modal", show && popup==='signup'? "show display-popup" : ""].join(
              " "
            )}id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="signupModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="images/close.svg" alt="close-icon"onClick={()=>setshow(false)}/>
                </button>
                <div className="modal-header">
                    <h2>Sign up</h2>
                </div>
                <div className="modal-body">
                    <form autoComplete="off">
                        <div className="form-group full-name">
                            <input type="text" id="first-name" name="first-name" className="form-control" placeholder=" "onChange={(e)=>takeFirstname(e)}/>
                            <label for="first-name" className="input-label" >First Name</label>
                        </div>
                        <div className="form-group full-name">
                            <input type="text" id="Last-name" name="Last-name" className="form-control" placeholder=" "onChange={(e)=>takeLastname(e)}/>
                            <label for="Last-name" className="input-label" >Last Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" className="form-control" placeholder=" " onChange={(e)=>validateEmail(e)}/>
                            <label for="email" className="input-label">Email Address</label>
                        </div>
                        <p className="text-agree">Signing up for an account, you agree to our <br/><a href="#">Terms & Conditions</a>, <a href="#">Privacy Policy</a> and <a href="#">Cancellation & Refund Policies</a></p>
                        <div className="form-group">
                            <button type="reset" className="form-control login-buttons" id={!activatebutton?"otp-fade-btn":""} value="Send OTP" data-toggle="modal" data-target="#emailOtpModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('otpsignup')}>Send OTP</button>
                        </div>
                    </form>
                    <div className="or">
                        <span>or</span>
                    </div>
                    <div className="login-with">
                        <a href="#"><img src="../../images/g-icon.svg" alt="Google_Icon"/>with Google</a>
                        <a href="#"><img src="../../images/f-icon.svg" alt="Facebook_Icon"/>with Facebook</a>
                    </div>
                </div>
                <div className="modal-footer">
                    <p>Already have an account? <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('login')}>Log in</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal signup-modal", show && (popup==='otpsignup'||popup==='resend1')? "show display-popup" : ""].join(
              " "
            )} id="emailOtpModal" tabindex="-1" role="dialog" aria-labelledby="emailOtpModalLabel" aria-hidden="true">
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
                        <a href="#" data-toggle="modal" data-target="#signupModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('signup')}>Change Email Address</a>
                    </div>
                    {/* <form className="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                        <div className="form-group">
                            <label for="digit-11"></label><input className="ml-0" type="password" id="digit-11" name="digit-11" data-next="digit-12" onChange={(e)=>inputcheck(e)}/>
                            <label for="digit-12"></label><input type="password" id="digit-12" name="digit-12" data-next="digit-13" data-previous="digit-11" onChange={(e)=>inputcheck(e)}/>
                            <label for="digit-13"></label><input type="password" id="digit-13" name="digit-13" data-next="digit-14" data-previous="digit-12" onChange={(e)=>inputcheck(e)}/>
                            <label for="digit-14"></label><input type="password" id="digit-14" name="digit-14" data-next="digit-15" data-previous="digit-13" onChange={(e)=>inputcheck(e)}/>
                            <label for="digit-15"></label><input type="password" id="digit-15" name="digit-15" data-next="digit-16" data-previous="digit-14" onChange={(e)=>inputcheck(e)}/>
                            <label for="digit-16"></label><input type="password" id="digit-16" name="digit-16" data-next="digit-17" data-previous="digit-14" onChange={(e)=>inputcheck(e)}/>
                        </div>
                        
                    </form> */}
                     <OtpInput
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    separator={<span>-</span>}
                /> 
                  <form>
                   <div className="form-group">
                            <button type="reset" className="form-control login-buttons" id={!veri?"otp-fade-btn":""} value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('success')}>Verify OTP</button>
                        </div>
                        </form>
                    <div className="remain-timer">
                        <h2 id="newtimer"></h2>
                        <div className="resend-otp">
                            <p>Did not receive? <a href="#" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('resend')}>Resend</a></p>
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
                        <img src="../../images/close.svg" alt="close-icon" onClick={reloadhandler}/>
                    </button>
                    <div className="modal-header">
                    </div>
                    <div className="modal-body success-body">
                        <img src="../../images/success_icon.svg" alt="Success_Image"/>
                        <p>You have Successfully Signed up!</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
const mapStateToProps = (state) => {
    const {
      Signup,Signupotp,Login
    } = state
    return {Signup,Signupotp,Login}
  }
  const actionCreator = {
    getSignup: UserAction.getSignup ,
    getSignupOtp: UserAction.getSignupOtp ,
    getLogin:UserAction.getLogin
       
  }
    
  export default connect(mapStateToProps, actionCreator)(Navbar);
