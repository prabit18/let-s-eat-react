import react from 'react';
import { useState } from 'react';
const Menu=({item})=>{

    const [state,setState]=useState(false);
   const [count, setCount] = useState(0);
   const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    };
  const handleDecrement = () => {
      if(count>0)
    setCount(prevCount => prevCount - 1);
    else {
        setState(false);
    }
   };
    <>
                         <div className="menu-items"key={Math.random()}>
                                        <img alt="food-item" src={item.image_url}/>
                                        <div className="menu-item-description">
                                            <div className="menu-name">
                                                <div className="menu-wrap">
                                                    <h4>{item.Name}</h4>
                                                    <div className="customize-list">
                                                        <span className={item.veg?'veg-item':''}>{item.price}</span>
                                                        {item.Customizable?
                                                        <a className="Customizable" data-target="#exampleModal2"
                                                           data-toggle="modal"
                                                           href="#">Customizable</a>:''
                                                        } 
                                                    </div>
                                                </div>
                                                {count<1 && !state&&
                                                <div className="menu-add-btn" onClick={()=>{
                                                    setState(true); setCount(1);}}>
                                                <a href="#">Add</a></div>}
                                                    {state &&
                                                <div class="new-counter quantity-block">
                                                <div class="new-up">
                                                    <button class="quantity-arrow-minus quantity"onClick={handleDecrement}>-</button>
                                                </div>
                                                <label class="restaurant-list-label" for="quantity-number"></label>
                                                    <input about="317" class="quantity-num form-control quantity qty"
                                                           type="number" value={count} id="quantity-number"/>
                                                <div class="new-down">
                                                    <button class="quantity-arrow-plus quantity"onClick={handleIncrement}>+</button>
                                                </div>
                                            </div>
                                            
                                        }
                                            {
                                             state && count<0 && <div className="menu-add-btn">
                                            <a href="#">Add</a></div>
                                            }
                                            </div>
                                            <div className="menu-description">
                                                <p>Lorem ipsum dolor sit amet, consetetur eirmod tempor invidunt ut
                                                    labore et dolore magna.</p>
                                            </div>
                                            { item.itemCount>0?
                                                <div className="menu-add-btn-small proceed-add">
                                                <a href="#">Add</a>
                                            </div>
                                                :
                                                <div class="new-counter quantity-block small">
                                                <div class="new-up">
                                                    <button class="quantity-arrow-minus quantity"onClick={handleDecrement}>-</button>
                                                </div>
                                                <label class="restaurant-list-label" for="quantity-change"></label>
                                                    <input about="317" class="quantity-num form-control quantity qty"
                                                           type="number" value={count} id="quantity-change"/>
                                                <div class="new-down">
                                                    <button class="quantity-arrow-plus quantity"onClick={handleIncrement}>+</button>
                                                </div>
                                                </div>
                                                }
                                            
                                        </div> 
                                        </div>
    </>
}
export default Menu;