import React, {useState,useEffect,useContext} from 'react';
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
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import LoginContext from '../Context/LoginContext';

const Login=(props)=>{
    const[show,setshow]=useState(true);
    const [popup,setpopup]=useState('login');
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
    const {dis,setdis} =useContext(LoginContext)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");        
        if (loggedInUser) {
            const User = JSON.parse(localStorage.getItem("user"));
            console.log(User);
            setLogin(true);
            setProfilename(User.info.first_name);
        }
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
                access_token:response.tokenObj.access_token,
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
                window.location.reload()
                if(type==='signup'){
                    setshow(true)
                    setpopup('success')
                   setSuccessMessage('Signed up')
                  setTimeout(()=>{window.location.reload()},5000)
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
            setSuccess(true)
            setSuccessMessage(response.data.data.message)
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
            setTimeout(()=>{setdisabled(false)},30000)
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
                setTimeout(()=>{setdisabled(false)},30000)
            }
            
        });
    }
    const Loginhandler=(type)=>{
             setSuccess(false);
                setErrorMessage('')
                setshow(true);
                setError(false);
            if(type==='login'){
            setpopup(type)
            }
             if(type==='otp') {
                 setloading(true)
                     handleLoginOtp() 
                     setdisabled(true)
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
            setError(false);
            setpopup(type)
           setActivatebutton(true)
        }
    }
    
    const Signuphandler=(type)=>{
             setErrorMessage('')
             setError(false);
             setSuccess(false);
             setshow(true);
                if(type==='signup'){
                    setpopup(type);
                }   
                if(type==='otpsignup'){ 
                    setdisabled(false)
                    setloading(true); 
                     if(!validateInput())
                    {   
                        setloading(false);
                        setError(true);
                        return;
                    }
                    handleSignupOtp()
                    setdisabled(true);
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
        setError(false)
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
            setError(false)
            setSuccess(false);
            setSuccessMessage('')
            setErrorMessage('')
            if(otp.length===6)
                 setVeri(true);
             else setVeri(false);    
        }
        const closepopup=()=>{
            setshow(false);
           setdis(false);
        }
    return(
        <>
   
         <div className={["modal fade login-modal", show && (popup==='login' || popup==='change')? "show display-popup" : ""].join(" ")}
            id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" id="loginModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={closepopup}/>
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
                        <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="../../images/g-icon.svg" alt="Google"/>with Google</a>
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
                    <img src="../../images/close.svg" alt="close-icon" onClick={closepopup}/>
                </button>
                <div className="modal-header">
                    <h2>Enter OTP</h2>
                </div>
                <div className="modal-body">
                    <div className="mobile-otp">
                        <p>Please enter the 6 Digit OTP shared with you via Email,{Email}<br/><span>OTP valid for 10 minutes.</span></p>
                        <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('change')}>Change Email Address</a>
                    </div>
                        
                    <OtpInput className={["otp-input",Error?" error-otp-input":""].join('')}
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    clearInputs={true}
                    separator={<span> </span>}
                /> 
                 {Error &&
                            (<>
                            <p className="error otp-error">{ErrorMessage}</p> 
                            </> )
                          }
                     {success&&<p className="error otp-error success-error">{successMessage}</p>}
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
                            {
                            Disabled ?<p>Did not receive? Resend</p> :
                            <p>Did not receive? <a onClick={()=>Loginhandler('resend')}disabled={Disabled}>Resend</a></p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <div className={["modal fade login-modal signup-modal", show && popup==='signup'? "show display-popup" : ""].join(" " )}id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="signupModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon"onClick={closepopup}/>
                </button>
                <div className="modal-header">
                    <h2>Sign up</h2>
                </div>
                <div className="modal-body">
                       {Error &&
                            (<>
                            <p className="error sign-up-error">{ErrorMessage}</p> 
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
                        <GoogleLogin
                        clientId={googleClientID}
                        autoLoad={false}
                        render={renderProps => (
                        <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="../../images/g-icon.svg" alt="Google"/>with Google</a>
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
                    <p>Already have an account? <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>Loginhandler('login')}>Log in</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className={["modal fade login-modal signup-modal", show && (popup==='otpsignup')? "show display-popup" : ""].join(" ")} id="emailOtpModal" tabIndex="-1" role="dialog" aria-labelledby="emailOtpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="emailOtpModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={closepopup}/>
                </button>
                <div className="modal-header">
                    <h2>Enter OTP</h2>
                </div>
                <div className="modal-body">
                    <div className="mobile-otp">
                    <p>Please enter the 6 Digit OTP shared with you via Email,{Email}<br/><span>OTP valid for 10 minutes.</span></p>
                    </div>
                     <OtpInput className={["otp-input",Error?" error-otp-input":""].join('')}
                    value={otp}
                    onChange={handleotpchange}
                    numInputs={6}
                    separator={<span> </span>}/> 
                    {Error &&
                            (<>
                            <p className="error otp-error">{ErrorMessage}</p> 
                            </> )
                          }
                          {success&&<p className="error otp-error success-error">{successMessage}</p>} 
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
                        {
                            Disabled ?<p>Did not receive? Resend</p> :
                            <p>Did not receive? <a data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>Signuphandler('resend')} >Resend</a></p>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div className={["modal fade login-modal signup-modal", show && popup==='success'? "show display-popup" : ""].join(" ")} id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
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
    )
}
export default Login;