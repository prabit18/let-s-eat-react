import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserAction } from '../../../redux/actions/user.action';
import Customizable from '../Customizable';
import Menu from './menu';
const MenuItems=(props)=>{
   
        const[foodtype,setFoodType]=useState('Menu');
        const[Name,setName]=useState('');
        const[foodItems,SetFoodItems]=useState(props.Menulist);
        const[show,setShow]=useState(false)
        const[variant,setVariant]=useState(props.Menulist[0].variants);
        const allfoodtypes=[...new Set(props.Menulist.map((item)=>item.food_type_name))];
        var c=0;
        var item_count={};
        item_count['Menu']=props.Menulist.length;
        for(let i=0;i<allfoodtypes.length;i++)
        {  
            c=0;
            props.Menulist.map((item)=>
            {
                if(allfoodtypes[i]===item.food_type_name)
                 c++;
            }
          )
        item_count[allfoodtypes[i]]=c;
        } 
        const filterhandler=(type)=>{  
        const updatedmenu=props.Menulist.filter((item)=>{return item.food_type_name === type });
        SetFoodItems(updatedmenu);
        }
        
        const clickhandler=(type)=>{
          //setClick(true);
          setFoodType(type); 
         if(type==='Menu')
            {
            SetFoodItems(props.Menulist);
            }
        else{
                
                filterhandler(type);
            }
            console.log("type",foodtype);
        }
   const handlecustom=(item,name)=>{
       setShow(true);
       setName(name);
       setVariant(item);
   }
    return(
        <>          
                           <div className="header-border">
                                <div className="menu-header">
                                    <div className="mobile-search-bar">
                                        <label className="restaurant-list-label" htmlfor="search-dish"></label>
                                            <input name="search-dish" placeholder="Search your dish" id="search-dish"/>
                                        <img alt="close Icon" className="mobile-close" src="../../images/close_icon.svg"/>
                                    </div>
                                    <div className="menu-header-inner">
                                        <div className="menu-hand">
                                            <img alt="menu-icon" src="../../images/menu_icon.svg"/>
                                        </div>
                                        <ul className="menu-list">
                                           
                                            <li className="active" onClick={()=>clickhandler('Menu')}>
                                                <a className="active" href="#">Menu</a>
                                            </li>
                                            <li>
                                                <a href="#">Overview</a>
                                            </li>
                                            <li>
                                                <a href="#">Reviews</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="menu-search">
                                        <form>
                                            <label className="restaurant-list-label" for="search-your-dish"></label>
                                                <input name="Search" placeholder="Search your dish" id="search-your-dish"/>
                                            <img alt="Search Icon" className="menu-search-img" src="../../images/Group%202500.svg"/>
                                        </form>
                                    </div>
                                </div>
                          </div>     
                       <div className="menu-body">     
                          <div className="side-menu-list" id="sideFilter">
                                    <div className="close-menu" onClick="closeNav()">
                                        <img alt="close-icon" src="../../images/close_icon.svg"/>
                                    </div>
                                
                                    <ul className="menu-feild frame" > 
                                    { allfoodtypes.map((type)=>(   
                                    <li onClick={()=>clickhandler(type)} className={foodtype===type?"active food-filter":"food-filter"}><a href="#">{type}({item_count[type]})</a></li>
                                      ))}
                                    </ul>
                               
                            </div>    
                               <div className="menu-item-list">
                                    <h2>{foodtype}({item_count[foodtype]})</h2>
                                      { foodItems&&foodItems.map((item)=>( 
                                         // <Menu item={item}/>
                                      <div className="menu-items" key={item.id}>
                                         <img alt={item.alt_text} src={`https://development-cdn.letseat.co.uk/resize-image/140/${item.image_url}`}/>
                                         <div className="menu-item-description">
                                            <div className="menu-name">
                                                <div className="menu-wrap">
                                                    <h4>{item.name}</h4>
                                                    <div className="customize-list">
                                                        <span className={item.veg?"veg-item":" "}>£{item.variants[0].le_price}</span>
                                                        {item.variants.length>1?
                                                        <a className="Customizable" data-target="#exampleModal2"
                                                           data-toggle="modal"
                                                           href="#" onClick={()=>handlecustom(item.variants,item.name)} >Customizable
                                                        </a> :null
                                                        }
                                                    </div>
                                                </div>
                                               <div className="menu-add-btn" >
                                                   <a href="#">Add</a>
                                             </div>
                                                    
                                        {/* <div className="new-counter quantity-block">
                                                   <div className="new-up">
                                                    <button className="quantity-arrow-minus quantity">-</button>
                                                   </div>
                                                <label className="restaurant-list-label" for="quantity-number"></label>
                                                    <input about="317" className="quantity-num form-control quantity qty"
                                                           type="number" value="1" id="quantity-number"/>
                                                <div className="new-down">
                                                    <button className="quantity-arrow-plus quantity">+</button>
                                                </div>
                                            </div> */}
                                            
                                        
                                        {/* <div className="menu-add-btn">
                                                <a href="#">Add</a>
                                            </div> */}
                                       </div>
                                            <div className="menu-description">
                                                <p>{item.description}</p>
                                            </div>
                                            
                                            <div className="menu-add-btn-small proceed-add">
                                                <a href="#">Add</a>
                                            </div>
                                                
                                                {/* <div className="new-counter quantity-block small">
                                                     <div className="new-up">
                                                         <button className="quantity-arrow-minus quantity">-</button>
                                                     </div>
                                                          <label className="restaurant-list-label" for="quantity-change"></label>
                                                          <input about="317" className="quantity-num form-control quantity qty"
                                                           type="number" value="1" id="quantity-change"/>
                                                <div className="new-down">
                                                    <button className="quantity-arrow-plus quantity">+</button>
                                                </div>
                                             </div> */}      
                                        </div> 
                                        </div>
                                      ))}
                                      <div className="filter-overlay sidemenu-overlay" onClick="closeNav()"></div>
                                      </div>
                                      <div className="customize-list-popup">  
                                            <div aria-modal="true" aria-labelledby="exampleModalLabel2" className={["modal fade", show ? 'show display-popup': ''].join(' ')} id="exampleModal2" role="dialog"
                                                tabIndex="-1">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content" id="exampleModalLabel2">
                                                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={()=>setShow(false)}>
                                                            <img alt="close-icon" src="../../images/new-close.svg"/>
                                                        </button>
                                                        <div className="modal-header">
                                                            <h2>{Name}</h2>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="quantity">
                                                                <p>Quantity</p>
                                                            </div>
                                                        <div className="customize-items-box">
                                                            { variant.map((data)=>(
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
                                                                    <div className="customize-items-btn">
                                                                        <a href="#">Add</a>
                                                                    </div>
                                                                </div>   
                                                            ))
                                                            }  
                                                         </div> 
                                                            <div className="add-to-order enable">
                                                                <a href="#">Add to Order</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                      
                                    
                                
                                   
        </>
    )
}
const mapStateToProps = (state) => {
    const {
      Menulist
    } = state
    return {Menulist}
  }
  const actionCreator = {
    getMenulist: UserAction.getMenulist
  }
export default connect(mapStateToProps,actionCreator)(MenuItems);

