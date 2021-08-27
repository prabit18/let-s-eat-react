import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { setErrors } from '../../redux/actions/error.action';
import { dataService } from '../../services';
const Profile=(props)=>{
    const router=useRouter()
    console.log("prosps",props.data);
    const[LastName,setLastName]=useState(props.data.last_name)
    const[FirstName,setFirstName]=useState(props.data.first_name);
    const[Editprofile,setEditprofile]=useState(false);
    const[show,setShow]=useState(false);
    const [popup,setpopup]=useState(null);
    const[session,setSession]=useState('');
    const[successMessage,setSuccessMessage]=useState('')
    const[success,setSuccess]=useState('');
    const [otp, setOtp] = useState('');  
    const [attempt,setAttempt] = useState(0) 
    const[loading,setloading]=useState(false)
    const [Mobile_Number,setmobilenumber]=useState('');
    const[veri,setVeri]=useState(false);
    const [Error, setError] = useState(false);
    const[ErrorMessage,setErrorMessage]=useState('');
    const[verifynow,setverifynow]=useState(false);
    const[verify,setverify]=useState(false);
    const[verified,setverified]=useState(false);
    const [phone_number, setphone_number] = useState()
    const[addbutton,setaddbutton]=useState(false);
  useEffect(() => { 
      const User = JSON.parse(localStorage.getItem("user"));
    if (User) {   
            setSuccess(true);
            console.log("mobile",props.data.mobile_verified)
            if(!props.data.mobile_verified)
            {   
                setverify(true);
                setaddbutton(true);
            }else{
                setverified(true);
                //setverifynow(true);
                setphone_number(User.info.phone_number)
            }
            
        }
        },[])
        const Otpverification=async()=>{
            console.log(attempt)
            let currentAttempt = attempt+1
            setAttempt(currentAttempt)
            if(currentAttempt>5){
                setshow(true);
                setpopup('mobilenuber');
                setAttempt(0)
                handleMobileOtp()
            }
            else{
                const user=JSON.parse(localStorage.getItem('user'))
                let Email=user.info.email
            dataService.verifyMobileNumber(session,otp,Email).then((res)=>{
                console.log("res is ...>",res);
                setloading(false);
                if(res.data.data.error_status){
                    if(res.data.data.attempts!=undefined)
                    {
                        console.log("Incorrect OTP")
                        console.log(res.data.data.message)
                        setSession(res.data.data.data.session)
                        setErrorMessage(res.data.data.message);
                        setError(true)
                        setOtp('')
                       setVeri(false)
                    }
                    else{
                        console.log("here it is coming")
                        setShow(true);
                        setOtp(''); 
                        setpopup('otp');
                        setVeri(false)
                        handleMobileOtp()
                    }
                }
                else{
                    debugger
                    console.log("verified!");
                    let user=JSON.parse(localStorage.getItem('user'));
                    user.info.phone_number=phone_number;
                    localStorage.setItem('user',JSON.stringify(user));
                    setverify(false);
                    setverifynow(false);
                    setverified(true);
                    setSuccessMessage("Your Mobile number has successfully verified!")
                   setVeri(false);
                   window.location.reload();
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
        const handleMobileOtp=async()=>{
            dataService.Mobileupadte(Mobile_Number).then((response)=>{
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
        const MobileNumberhandler=(type)=>{
           // setErrorMessage('')
                    setShow(true);
                if(type==='mobilenumber'){
                setpopup(type)
                }
                if(type==='otp') {
                    if(!validatemobilenumber(Mobile_Number))
                    {
                        setError(true)
                        return;
                    }else{
                    setloading(true)
                    handleMobileOtp() 
                    }
                }else if(type==='resend'){
                    handleResendOtp();
                }else if(type=='otpverification') {
                        setloading(true)
                         Otpverification() 
                        }           
            else if(type==='change')
            {
                setpopup(type)
            (true)
            }
        }
        const validatemobilenumber=(Mobile_Number)=>{
        if(!Mobile_Number)
        {
           setErrorMessage("Please Put Your Mobile Number")
           return false
        }else if(Mobile_Number.length<10 ||Mobile_Number.length>10)
        {
           setErrorMessage("Please put a Valid Mobile Number")
           return false
        }
        return true;
        }
        const takeMobileNumber= (e) => {
        setErrorMessage('')
        setmobilenumber(e.target.value);
        // setverified(false)
        }
        const handleotpchange=(otp)=>{
        setOtp(otp);
        if(otp.length===6)
             setVeri(true);
         else setVeri(false);    
        }
    const Edithandler=()=>{
        setEditprofile(true);
    }
    const Savehandler=()=>{
        if(!FirstName||!LastName){
         setError(true);
         setErrorMessage('Please Fill the Input')
         return;
        }else{
            dataService.UpdateProfile(FirstName,LastName).then((res)=>{
                console.log('res profile is ',res)
                setEditprofile(false);
                let user=JSON.parse(localStorage.getItem('user'))
                user.info.first_name=props.data.first_name;
                user.info.last_name=props.data.last_name;
                 localStorage.setItem('user',JSON.stringify(user))
                //console.log('new profile',JSON.parse(localStorage.getItem('user')))
                window.location.reload();
            })
        }
        
    }
    const takefirstname=(e)=>{
        setErrorMessage('')
        setError(false);
        setFirstName(e.target.value);
    }
    const takelastname=(e)=>{
        setErrorMessage('')
        setError(false);
        setLastName(e.target.value);
    }
    return(
        <>
        <div className="page-banner">
            <section className="main-section">
            <section className="restaurant-list">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="listing-box favourite-listing-box">
                                    <div className="col-lg-2 col-md-2" id="profile-menu">
                                        <div className="favourite-menu-section">
                                            <ul className="menu-feild frame favourite-menu">
                                                <li className="food-filter active"><a href="/profile">Profile</a></li>
                                                <li className="food-filter"><a href="#">Orders</a></li>
                                                <li className="food-filter"><a href="#">Manage Address</a></li>
                                                <li className="food-filter"><a href="/favourites">Favorite Restaurants</a></li>
                                                <li className="food-filter"><a href="#">My Tasty Points</a></li>
                                                <li className="food-filter"><a href="#">Invite a User</a></li>
                                                <li className="food-filter"><a href="#">Help</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 right-favourite-col profile-col">
                                        <div className="food-list frame profile-list">
                                            <form>
                                                <div className="personal-detail">
                                                    <div className="filter-section">
                                                        <div className="resto-count favourite-menu-header">
                                                            <h5>Personal Details</h5>
                                                            {!Editprofile? (<a href="#" className="profile-edit" onClick={Edithandler}>EDIT</a>)
                                                             :(<a href="#" className="profile-save"onClick={Savehandler}>SAVE</a>)
                                                            }                                                       
                                                      </div>
                                                    </div>
                                                    <div className="form-group row">
                                                      <label for="first-name" className="col-sm-3">First Name</label>
                                                      <div className="col-sm-9">
                                                       {!Editprofile? (<input type="text" className="form-control profile-input" id="first-name" value={props.data.first_name}  readOnly/>)
                                                        :(<input type="text" className="form-control profile-input new-profile-input" id="first-name" value={FirstName} onChange={(e)=>takefirstname(e)} />)
                                                        } 
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                      <label for="last-name" className="col-sm-3">Last Name</label>
                                                      <div className="col-sm-9">
                                                       {!Editprofile? (<input type="text" className="form-control profile-input " id="last-name" value={props.data.last_name}  readOnly/>)
                                                        :(<input type="text" className="form-control profile-input new-profile-input" id="last-name" value={LastName} onChange={(e)=>takelastname(e)} />)
                                                      }
                                                      </div>
                                                    </div>
                                                    {Error&&<p>{ErrorMessage}</p>}
                                                </div>
                                                <div className="personal-detail">
                                                    <div className="filter-section">
                                                        <div className="resto-count favourite-menu-header">
                                                            <h5>Email Address</h5>
                                                        </div>
                                                    </div>
                                                    <div className="email-content">
                                                        <p>{props.data.email}</p>
                                                        <p className="verified-content">Verified</p>
                                                    </div>
                                                </div>
                                                { !addbutton ?
                                                (<div className="personal-detail">
                                                    <div className="filter-section">
                                                        <div className="resto-count favourite-menu-header">
                                                            <h5>Phone Number</h5>
                                                            <a href="javascript:void();" data-toggle="modal" data-target="#phoneModal" onClick={()=>MobileNumberhandler('mobilenumber')}>CHANGE</a>
                                                        </div>
                                                    </div>
                                                    <div className="email-content">
                                                        <p>+{props.data.phone_number}</p>
                                                        <p className="verified-content">Verified</p>
                                                    </div>
                                                </div>):
                                                (<div className="verify-btn">
                                                <a href="javascript:void(0)" data-toggle="modal" data-target="#phoneModal"onClick={()=>MobileNumberhandler('mobilenumber')}>Add Phone Number</a>
                                            </div>) 
                                            }
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </section>
    </div>
    <div className={["modal fade login-modal phone-modal", show && (popup==='mobilenumber' || popup==='change')? "show display-popup" : ""].join(" ")} id="phoneModal" tabIndex="-1" role="dialog" aria-labelledby="phoneModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" id="phoneModalLabel">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <img src="images/close.svg" alt="close-icon" onClick={()=>setShow(false)}/>
            </button>
            <div className="modal-header">
            </div>
            <div className="modal-body">
                <h2>Enter Your Phone Number</h2>
                <form autoComplete='off'>
                    <div className="form-group mobile-no-field">
                        <input type="text" id="mob-email" name="mob-email" className="form-control"      placeholder="Mobile Number" onChange={(e)=>takeMobileNumber(e)}/>
                        <label for="mob-email" className="input-label"></label>
                    </div>
                    {Error &&
                            (<>
                            <p className="error">{ErrorMessage}</p> 
                            </> )
                          }
                    <div className="form-group">
                    {/* {!activatebutton?
                            (<button type ="button"className="form-control login-buttons" id="otp-fade-btn" value="Send OTP" data-toggle="modal" data-target={activatebutton?"#mobileOtpModal":""} data-dismiss="modal" aria-label="Close" >Send OTP</button>)
                            : */}
                            <button  type="button"className="form-control login-buttons" value="Send OTP" data-toggle="modal" data-target="#mobileOtpModal" data-dismiss="modal" aria-label="Close" onClick={()=>MobileNumberhandler('otp')} disabled={loading}>
                             Send OTP
                             {loading && (
                                       <span className="spinner-border custom-spinner " role="status" aria-hidden="true"></span>
                             )}
                             </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div className={["modal fade login-modal",show && (popup==='otp')? "show display-popup" : ""].join(" ")} id="mobileOtpModal" tabIndex="-1" role="dialog" aria-labelledby="mobileOtpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" id="mobileOtpModalLabel">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="../../images/close.svg" alt="close-icon" onClick={()=>setShow(false)}/>
                </button>
                <div className="modal-header">
                    <h2>Enter OTP</h2>
                </div>
                <div className="modal-body">
                    <div className="mobile-otp">
                        <p>6 digit OTP has been sent to your Mobile Number,{Mobile_Number}, please enter to Log in <span>OTP valid for 10 minutes.</span></p>
                        <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal" aria-label="Close"onClick={()=>MobileNumberhandler('change')}>Change Mobile Number</a>
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
                           (<button type="reset" className="form-control login-buttons"  value="check OTP" data-toggle="modal" data-target="#successModal" data-dismiss="modal" aria-label="Close" onClick={()=>MobileNumberhandler('otpverification')} disabled={loading} >
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
                            <p>Did not receive? <a href="#" onClick={()=>MobileNumberhandler('resend')}>Resend</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}
export default Profile;