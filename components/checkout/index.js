import React, { useState,useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { setErrors } from '../../redux/actions/error.action';
import { dataService } from '../../services';
const Checkout=()=>{
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
    const[activatebutton,setActivatebutton]=useState(false);
    const[ErrorMessage,setErrorMessage]=useState('');
    const[email,setEmail]=useState('');
    const[firstname,setfirstname]=useState('');
    const[lastname,setlastname]=useState('');
    const[verifynow,setverifynow]=useState(false);
    const[verify,setverify]=useState(false);
    const[verified,setverified]=useState(false);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");        
        if (loggedInUser) {
            const User = JSON.parse(localStorage.getItem("user"));
            setEmail(User.info.email)
            setfirstname(User.info.first_name)
            setlastname(User.info.last_name)
            if(User.info.phone_number==='0')
            {   
                setverify(true);
            }else{
                setverified(true);
                //setverifynow(true);
            setmobilenumber(User.info.phone_number)
            }
        }
        else console.log("user is not loggedin");
      }, []);

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
            console.log(res);
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
                console.log("verified!");
                localStorage.setItem('user',JSON.stringify(res.data.data.data))
                console.log("response comes from verifymobile----->",res);
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
                        setActivatebutton(false)     
                    }           
        else if(type==='change')
        {
            setpopup(type)
        setActivatebutton(true)
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
   }
   return true;
}
const takeMobileNumber= (e) => {
    setErrorMessage('')
    setmobilenumber(e.target.value);
}
const handleotpchange=(otp)=>{
    setOtp(otp);
    if(otp.length===6)
         setVeri(true);
     else setVeri(false);    
}

return(
  <>
 <section className="main-section">
        <section className="cart-section">
            <div className="container custom-container">
                <div className="cart-body">
                    <div className="row custom-row custom-scrollbar">
                        <div className="col-lg-6">
                            <div className="cart-left">
                                <a className="back-to-restaurant" href="restaurant-detail-page.html"></a>
                                <h2>Order Summary</h2>
                                <div className="cart-left-content">
                                    <div className="cart-details">
                                        <div className="cart-details-header">
                                            <h3>KFC</h3>
                                            <p>95 Linthorpe Road, Middlesbrough, TS1 5DD</p>
                                        </div>
                                        <div className="toggle-section">
                                            <div className="payment-item delivery-item">
                                                <input type="radio" id="test1" name="radio-group" checked=""/>
                                                <label for="test1" className="delivery">Delivery<br/><span>30-40 Mins</span></label>
                                                <img src="images/new-delivery-icon.svg" alt="delivery-icon"/>
                                            </div>
                                            <div className="payment-item delivery-item">
                                                <input type="radio" id="test2" name="radio-group"/>
                                                <label for="test2" className="store-pick">Store Pick up<br/><span>15-20 Mins</span></label>
                                                <img src="images/new-store-pickup.svg" alt="store-icon"/>
                                            </div>
                                        </div>
                                        <div className="preferred-time">
                                            <p>Select preferred delivery time</p>
                                            <div className="time-list-outer">
                                                <div className="time-list-inner">
                                                    <ul className="time-list custom-scrollbar">
                                                        <li>
                                                            <div className="time-item">
                                                                <input type="radio" id="time1" name="time-group" checked/>
                                                                <label for="time1" className="time-item-label">As soon as possible</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time2" name="time-group"/>
                                                                <label for="time2" className="time-item-label">Saturday 10:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time3" name="time-group"/>
                                                                <label for="time3" className="time-item-label">Saturday 11:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time4" name="time-group"/>
                                                                <label for="time4" className="time-item-label">Saturday 11:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time5" name="time-group"/>
                                                                <label for="time5" className="time-item-label">Saturday 12:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time6" name="time-group"/>
                                                                <label for="time6" className="time-item-label">Saturday 12:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time7" name="time-group"/>
                                                                <label for="time7" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time8" name="time-group"/>
                                                                <label for="time8" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time9" name="time-group"/>
                                                                <label for="time9" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time10" name="time-group"/>
                                                                <label for="time10" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time11" name="time-group"/>
                                                                <label for="time11" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time12" name="time-group"/>
                                                                <label for="time12" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="selected-items">
                                            <div className="select-item">
                                                <div className="select-item-inner">
                                                    <div className="selected-item-left veg">
                                                        <h4>Dream Team Bucket</h4>
                                                        <p>£5.00</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="1"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£5.00</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-item">
                                                <div className="select-item-inner">
                                                    <div className="selected-item-left non-veg">
                                                        <h4>Dream Team Bucket</h4>
                                                        <p>£5.00</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="1"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£5.00</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-item">
                                                <div className="not-available-text">
                                                    <p>Below Item not available</p>
                                                    <a href="#">Remove</a>
                                                </div>
                                                <div className="select-item-inner not-available">
                                                    <div className="selected-item-left veg">
                                                        <h4>Cheese Burst Paneer Burger - Medium</h4>
                                                        <p>£6.20</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="2"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£12.40</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="apply-offers">
                                        <div className="apply-offer-header">
                                            <img src="images/offers.svg" alt="Offers"/>
                                            <h3>APPLY offer</h3>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label for="apply-code"></label>
                                                <input type="text" id="apply-code" className="form-control" placeholder="Enter coupon code if you have"/>
                                                <button type="button" className="form-control" disabled>Apply</button>
                                            </div>
                                        </form>
                                        <div className="pricing">
                                            <h4>Subtotal <span>£17:40</span></h4>
                                            <p>Taxes and other Charges <span>0.40</span></p>
                                            <p>delivery charges <span>0.40</span></p>
                                            <p>Offers/Coupons Discount <span>0.00</span></p>
                                            <h3>Grand Total <span>£18:20</span></h3>
                                        </div>
                                        <div className="suggestion">
                                            <h4>Suggestions</h4>
                                            <form>
                                                <div className="form-group">
                                                    <label for="exampleFormControlTextarea1"></label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Any Suggestions?"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="disclaimer-section">
                                        <div className="disclaimer-content">
                                            <img src="images/Icon-info.svg" alt="Info_Icon"/>
                                            <div className="disclaimer-text">
                                                <p><span className="text-bold">Loremipsum dolor sit amet, consetet</span><br/>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam noneirteminv iduntut labore et dolore magna aliquyam erat.</p>
                                                <p className="text-red">consetetur sadipscing elitr, sed diam noneir teminviduntutlabore</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="checkout-header">
                                <h2>Checkout</h2>
                            </div>
                            <div className="cart-details personal-cart-detail">
                                <div className="delivery-address">
                                    <div className="address-header">
                                        <div className="address-left personal-detail">
                                            <img src="images/Group 6593.svg" alt="Address_Icon"/>
                                            <div className="address-text">
                                                <h2>Personal Details</h2>
                                                <h3>{firstname} {lastname}</h3>
                                                 <p>Email Address:<span> {email}</span></p>
                                                <div className="verify-no">
                                                   {verified && <p className="verified-no">Phone Number:<span> +{Mobile_Number}</span></p>}
                                                    {verified && (<p className="verified-content">Verified</p>)}
                                                    {verifynow&&
                                                       (<div className="add-button verify-now">
                                                        <a href="#" data-toggle="modal" data-target="#emailOtpModal" onClick={()=>MobileNumberhandler('otp')}>Verify Now</a>
                                                    </div>)}
                                                </div>
                                                <div className="not-verified">
                                                   {verifynow &&(<p>your Phone Number is not verified</p>)}
                                                </div>
                                                { verify &&
                                                <div className="verify-btn">
                                                    <a href="#" data-toggle="modal" data-target="#phoneModal"onClick={()=>MobileNumberhandler('mobilenumber')}>Verify Phone Number</a>
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="apply-offers personal-offer-detail">
                                <div className="delivery-address">
                                    <div className="address-header delivery-address-head">
                                        <div className="address-left">
                                            <img src="images/address_icon.svg" alt="Address_Icon"/>
                                            <div className="address-text">
                                                <h2>Delivery Address</h2>
                                                <p>Set your delivery address or add new</p>
                                            </div>
                                        </div>
                                        <div className="add-button change-btn">
                                            <a href="#" data-toggle="modal" data-target="#addAddress">Change</a>
                                        </div>
                                    </div>
                                    <div className="address-outer custom-scrollbar">
                                        <div className="address-item add-new-item">
                                            <div className="address-element">
                                                <div className="">
                                                    <h6>Home</h6>
                                                    <p>Unit 223, Sea View Cottages, 82, Wood St <br/>Liverpool, L1 4DQ, United Kingdom</p>
                                                </div>
                                                <div className="address-actions">
                                                    <a href="#" className="deliver-here">Deliver Here</a>
                                                    <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                                </div>
                                            </div>
                                            <div className="address-element">
                                                <div className="">
                                                    <h6>Office</h6>
                                                    <p>Unit 223, Sea View Cottages, 82, Wood St <br/>Liverpool, L1 4DQ, United Kingdom</p>
                                                </div>
                                                <div className="address-actions">
                                                    <a href="#" className="deliver-here">Deliver Here</a>
                                                    <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                                </div>
                                            </div>
                                            <div className="add-new-address-box">
                                                <button type="button" data-toggle="modal" data-target="#addAddress">+ Add New Address</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="disclaimer-section personal-desclaimer-detail">
                                <div className="payment">
                                    <div className="address-header">
                                        <div className="address-left">
                                            <img src="images/payment_icon.svg" alt="Payment_Icon"/>
                                            <div className="address-text">
                                                <h2>Payment</h2>
                                                <p>You can select a payment method from your listed options</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-options">
                                        <div className="payment-item">
                                            <div className="payment-select">
                                                <input type="radio" id="payment1" name="payment-group" checked/>
                                                <label for="payment1">Pay with Debit or Credit Card</label>
                                            </div>
                                            <label for="payment1" className="label-img"><img src="images/cc_icon.svg" alt="Card_Payment"/></label>
                                        </div>
                                        <div className="payment-item">
                                            <div className="payment-select">
                                                <input type="radio" id="payment4" name="payment-group"/>
                                                <label for="payment4">Cash on Delivery</label>
                                            </div>
                                            <label for="payment4" className="label-img"><img src="images/cash_icon.svg" alt="Cash_on_delivery"/></label>
                                        </div>
                                    </div>
                                    <div className="proceed-button">
                                        <a href="#">Place your Order</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
    
    <div className={["modal fade login-modal phone-modal", show && (popup==='mobilenumber' || popup==='change')? "show display-popup" : ""].join(" ")} id="phoneModal" tabindex="-1" role="dialog" aria-labelledby="phoneModalLabel" aria-hidden="true">
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
                        <input type="text" id="mob-email" name="mob-email" className="form-control" placeholder="Mobile Number" onChange={(e)=>takeMobileNumber(e)}/>
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
export default Checkout;