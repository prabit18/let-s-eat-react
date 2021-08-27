import React from 'react'
import Map from './Map/Map'
function UpdateAddress({item,editModal,handleAddressUpdate,handleType,addressType,handleFlatChange,handleLandmark,flatnumber,landmark,currentLocation,handleMapaddress,address={address}}) {
    console.log("item",item);
    return (
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" id="addAddressLabel">
            <div class="modal-header">
                <h2>Edit Address</h2>
            </div>
            <div class="modal-body">
                <Map lat={item.location["latitude"]} lang={item.location["longitude"]} address={item.address} edit={editModal} currentLocation={currentLocation} handleMapaddress={handleMapaddress}address={address}/>
                <div class="address-form">
                    <form>
                        <div className="form-group">
                            <label for="add-field2"></label>
                            
                            {/* <input type="text" id="add-field2" name="add-field2" class="form-control" placeholder="Home/Flat No" onChange={(e)=>setflate_number(e.target.value)}/> */}
                            <input type="text" id="flat-update" name="add-field2" className="form-control" placeholder="Home/Flat No" value={flatnumber} onChange={(e)=>handleFlatChange(e.target.value)} autoComplete="off"/>
                        </div>
                        
                        <div className="form-group">
                            <label for="add-field"></label>
                            <input type="text" id="landmark-update" name="add-field4" className="form-control" placeholder="How to reach/ Landmark (Optional)" value={landmark} onChange={(e)=>handleLandmark(e.target.value)} autoComplete="off" />
                        </div>
                        <div className="form-row custom-form-row">
                            <div className="form-group">
                                <input type="radio" id="add1" name="Home"onChange={(e)=>handleType(e)} checked={addressType==='Home'?true:false}/>
                                <label for="add1">Home</label>
                            </div>
                            <div className="form-group">
                                <input type="radio" id="add2" name="Office" onChange={(e)=>handleType(e)} checked={addressType==='Office'?true:false}/>
                                <label for="add2">Office</label>
                            </div>
                            <div className="form-group">
                                <input type="radio" id="add3" name="Others" onChange={(e)=>handleType(e)} checked={addressType==='Others'?true:false}/>
                                <label for="add3">Others</label>
                            </div>
                            
                            </div>

                        <div className="proceed-button">
                          <a href="#" className={localStorage.getItem('address')&&flatnumber&&addressType&&landmark?"":'disabled'} data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#addAddress1" onClick={()=>handleAddressUpdate(item)}>Update and Proceed</a>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UpdateAddress
