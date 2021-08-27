import React from 'react'

function VarientPopup({variant,Name,cart_item_objs_v1,cart_item_objs_v2,handlecustomAdd,handleVarientincrement,handleVarientDecrement}) {
    return (
        <>{variant.length>0&&<div>
            <div className="modal-header" style={{"padding": "20px 25px 10px"}}>
                  <h2 style={{"margin": "5px 0 20px"}}>{Name}</h2>
                </div>
                <div className="modal-body" style={{"padding": "0 25px 20px"}}>
                  <div className="quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="customize-items-box">
                    {variant.length>0&&variant.map((data, i) => (
                      <div className="customize-items">
                        <div className="customize-items-outer">
                          <div className="customize-items-description">
                            <h4>{data.name}</h4>
                            <p>{data.description}</p>
                          </div>
                          <div className="customize-items-price">
                            <h4>£{data.le_price}</h4>
                          </div>
                        </div>

                        {cart_item_objs_v1&&cart_item_objs_v1[data.id] === undefined ||
                        cart_item_objs_v1&&cart_item_objs_v1[data.id] === 0 ? (
                          <div
                            className="customize-items-btn"
                            style={{ cursor: "pointer" }}
                          >
                            <a onClick={() => handlecustomAdd(data,Name)}>Add</a>
                          </div>
                        ) : (
                          <div
                            className="new-counter quantity-block detail-count"
                            key={data.id}
                          >
                            <div className="new-up">
                              <button
                                className="quantity-arrow-minus quantity"
                                onClick={() => handleVarientDecrement(data)}
                              >
                                -
                              </button>
                            </div>
                            <label
                              className="restaurant-list-label"
                              htmlFor="quantity-number"
                            ></label>
                            <input
                              about="317"
                              className="quantity-num form-control quantity qty"
                              type="number"
                              value={cart_item_objs_v1&&cart_item_objs_v1[data.id]}
                              id="quantity-number"
                            />
                            <div className="new-down">
                              <button
                                className="quantity-arrow-plus quantity"
                                onClick={() => handleVarientincrement(data)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* <div className="add-to-order enable">
                    <a href="#">Add to Order</a>
                  </div> */}
               
        </div>
        </div>}</>
    )
}

export default VarientPopup
