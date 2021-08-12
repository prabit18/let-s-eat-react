import React, { useEffect, useState, useContext } from "react";
import { connect, useSelector } from "react-redux";
import { UserAction } from "../../../redux/actions/user.action";
import { Menulist } from "../../../redux/reducer/menulist.reducer";
import MenulistContext from "../../Context/MenulistContext";
import MenulistContetx from "../../Context/MenulistContext";
import LoginContext from "../../Context/LoginContext";
import Customizable from "../Customizable";
import Menu from "./menu";
import { dataService } from "../../../services";
import Login from "../../login";
const MenuItems = (props) => {
  // console.log("prpprprpp",props.Favourites)
  const {
    foodItems,
    SetFoodItems,
    loader,
    menuObject,
    setmenuObject,
    cart_item_objs_v1,
    setcart_item_objs_v1,
    cart_item_objs_v2,
    setcart_item_objs_v2,
    cartItem,
    setCartItem,
  } = useContext(MenulistContext);

  const [cart_items, setcartItems] = useState([]);

  const [foodtype, setFoodType] = useState("Menu");
  const [Name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState(props.Menulist[0].variants);
  const allfoodtypes = [
    ...new Set(props.Menulist.map((item) => item.food_type_name)),
  ];
  var c = 0;
  var item_count = {};

  const [searchValue, setSearchValue] = useState("");
  const searchFood = (val) => {
    if (searchValue === "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return val;
    }
  };
 var user=false;
 const[display,setdisplay]=useState(false);
const[favourite,setFavourite]=useState(false);
  useEffect(() => {
    
    let User=JSON.parse(localStorage.getItem('user'))
    if(User){
      if(!User.info.favourites.includes(props.Menulist[0].restaurant_id)){
        dataService.AddFavouriteRestaurant(props.Menulist[0].restaurant_id).then((response)=>{
          console.log("response is coming from add favourite---->",response)
          if(response.data.data.error_status)
          {
            console.log(response.data.data.message)
          }else{
            let user=JSON.parse(localStorage.getItem('user'));
            user.info.favourites.push(props.Menulist[0].restaurant_id);
            localStorage.setItem('user',JSON.stringify(user))
            setFavourite(true);
            setdisplay(true);
            setTimeout(()=>{setdisplay(false)},5000)
          }
      });
      }
      //console.log(User,"---->",props.Menulist[0].restaurant_id);
      // dataService.FavouriteList().then((response)=>{ 
      //   let user=JSON.parse(localStorage.getItem('user'));
      //   console.log("favourite list",response)
      //   response.data.data.data.map((item)=>{
      //     if(!user.info.favourites.includes(item.id)){
           
      //       user.info.favourites.push(item.id);
      //       localStorage.setItem('user',JSON.stringify(user))
      //     }
      //   })
      // })
      // User.info.favourites.push(props.Menulist[0].restaurant_id);
       if(User.info.favourites.includes(props.Menulist[0].restaurant_id))
       {
         console.log("coming inside");
         setFavourite(true);
       }else setFavourite(false);
    }
    if (user) {
      SetFoodItems(JSON.parse(localStorage.getItem("menuItems")));
      JSON.parse(localStorage.getItem("menuItems")).forEach((item) => {
        item.variants.forEach((child_item) => {
          menuObject[child_item.id] = child_item;
          menuObject[child_item.id].image_url = item.image_url;
          menuObject[child_item.id].name = item.name;
          menuObject[child_item.id].veg = item.veg;
          menuObject[child_item.id].description = item.description;
          menuObject[child_item.id].menu_id = item.id;
        });
      });
      setCartItem(JSON.parse(localStorage.getItem('cartItem')))
      setcart_item_objs_v1(JSON.parse(localStorage.getItem('cart_item_objs_v1'))||{})
      setcart_item_objs_v2(JSON.parse(localStorage.getItem('cart_item_objs_v2'))||{})

      setmenuObject(menuObject);
      localStorage.setItem("menuObject",JSON.stringify(menuObject))
    }else{
      SetFoodItems(props.Menulist);
      props.Menulist.forEach((item) => {
        item.variants.forEach((child_item) => {
          menuObject[child_item.id] = child_item;
          menuObject[child_item.id].image_url = item.image_url;
          menuObject[child_item.id].name = item.name;
          menuObject[child_item.id].veg = item.veg;
          menuObject[child_item.id].description = item.description;
          menuObject[child_item.id].menu_id = item.id;
        });
      });
      setmenuObject(menuObject);
      localStorage.setItem("menuObject",JSON.stringify(menuObject)) 
    }
  }, []);
  // useEffect(() => {
  //   debugger
  // }, [cartItem])
  const [count, setcount] = useState([]);

  item_count["Menu"] = props.Menulist.length;
  for (let i = 0; i < allfoodtypes.length; i++) {
    c = 0;
    props.Menulist.map((item) => {
      if (allfoodtypes[i] === item.food_type_name) c++;
    });
    item_count[allfoodtypes[i]] = c;
  }
  const filterhandler = (type) => {
    const updatedmenu = props.Menulist.filter((item) => {
      return item.food_type_name === type;
    });
    SetFoodItems(updatedmenu);
  };

  const clickhandler = (type) => {
    setFoodType(type);
    if (type === "Menu") {
      SetFoodItems(props.Menulist);
    } else {
      filterhandler(type);
    }
  };
  const handleVarient = (variants, id) => {
    for (var i in variants) {
      variants[i]["menu_id"] = id;
    }
    console.log("variants", variants);
    setVariant(variants);
  };
  const [itemId, setItemId] = useState();
  const [restaurantId, setrestaurantId] = useState();
  const [indiviadualFood, setindiviadualFood] = useState([]);
  const handlecustom = (data) => {
    setShow(true);
    setName(data.name);
    handleVarient(data.variants, data.id);
    setItemId(data.id);
    setindiviadualFood(data);
    setrestaurantId(data.restaurant_id);
  };

  const findindex = (id) => {
    var elementPos = cartItem.map(function (x) {
        return x.id;
      })
      .indexOf(id);
    return elementPos;
  };

  const handleCartObje = (cartItemvalue) => {
    cartItemvalue.forEach(function (item) {
      if (cart_item_objs_v1[item.id]) {
        cart_item_objs_v1[item.id]++;
      } else {
        cart_item_objs_v1[item.id] = item.quantity;
      }
    });
    setcart_item_objs_v1(cart_item_objs_v1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(cart_item_objs_v1))

  };

  const handleCartinc = (cartItemvalue) => {
    handlecartV2(cartItemvalue)
    var CartV1={...cart_item_objs_v1}
    if (CartV1[cartItemvalue[0].id]) {
      CartV1[cartItemvalue[0].id]++;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))
    setcount((prevValue) => [...prevValue, count + 1]);
  };

  // const handleCartIncrement = (data) => {
  //   console.log("new");
  //   let final = [
  //     {
  //       id: data[0].id,
  //       quantity: 1,
  //       menu_id: data.id,
  //       restaurant_id: data.restaurant_id,
  //     },
  //   ];
  //   handleCartinc(final);
  // };

  //VARIENT CART MANGAGING
  const handlevariantCart = (cartItemvalue) => {
    handlecartV2(cartItemvalue);
    cartItemvalue.forEach(function (item) {
      if (cart_item_objs_v1[item.id]) {
        cart_item_objs_v1[item.id]++;
      } else {
        cart_item_objs_v1[item.id] = item.quantity;
      }
    });
    setcart_item_objs_v1(cart_item_objs_v1);
    setcount((prevValue) => [...prevValue, count + 1]);
  };

  const handlecartV2 = (cartItemvalue) => {   
    let CartV2={...cart_item_objs_v2}
    cartItemvalue.forEach(function (item) {
      if (CartV2[item.menu_id]) {
        CartV2[item.menu_id]++;
      } 
      else {
        CartV2[item.menu_id] = item.quantity;
      }
    });
    setcart_item_objs_v2(CartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(CartV2))

    setcount((prevValue) => [...prevValue, count + 1]);
    console.log("afterV2", cart_item_objs_v2);
  };

  //SINGLE ITEM CART
  const handleAddCart = (data) => {
    if (data.variants.length > 1) {
      setShow(true);
      handlecustom(data);
    } else {
      var cart = [];
      cart.push({
        id: data.variants[0].id,
        name:data.variants[0].name,
        quantity: 1,
        menu_id: data.id,
        variant:false,
        restaurant_id: data.restaurant_id,
      });

      setCartItem((oldarray) => [
        ...oldarray,
        {
          id: data.variants[0].id,
          quantity: 1,
          name:data.variants[0].name,
          menu_id: data.id,
          variant:false,
          restaurant_id: data.restaurant_id,
        },
      ]);
      let localItem=[...cartItem,{
        id: data.variants[0].id,
        quantity: 1,
        name:data.variants[0].name,
        menu_id: data.id,
        variant:false,
        restaurant_id: data.restaurant_id,
      }]
      let final = [
        {
          id: data.variants[0].id,
          quantity: 1,
          name:data.variants[0].name,
          menu_id: data.id,
          variant:false,
          restaurant_id: data.restaurant_id,
        },
      ];
      localStorage.setItem('cartItem',JSON.stringify(localItem))

      handleCartObje(final);
    }
  };

  //SINGLE ITEM INCREMENT
  const handleIncrement = (data) => {
    let final = [
      {
        id: data.variants[0].id,
        quantity: 1,
        name:data.variants[0].name,
        menu_id: data.id,
        restaurant_id: data.restaurant_id,
        
      },
    ];

    handleCartinc(final);
  };

  const handleCartRemove = (cartItemvalue) => {
    var CartV1={...cart_item_objs_v1}
    if (CartV1[cartItemvalue[0].id]) {
      CartV1[cartItemvalue[0].id]--;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))
    setcount((prevValue) => [...prevValue, count + 1]);
  };

  const handleDecrement = (data) => {

    let final = [
      {
        id: data.variants[0].id,
        quantity: 1,
        name:data.variants[0].name,
        menu_id: data.id,
        restaurant_id: data.restaurant_id,
      },
    ];

    if (cart_item_objs_v1[data.variants[0].id] === 1) {
      let index = findindex(data.variants[0].id);
      if (index > -1) {
        let originlArray=[...cartItem]
        originlArray.filter((val)=>val!==originlArray[index])
        originlArray.splice(index, 1);
        setCartItem(originlArray);
        localStorage.setItem('cartItem',JSON.stringify(originlArray))
        setcount((prevValue) => [...prevValue, count + 1]);
      }   
    }
    handleCartRemove(final);
  };

  const handlecustomAdd = (data) => {
    setCartItem((oldarray) => [
      ...oldarray,
      {
        id: data.id,
        name:data.name,
        quantity: 1,
        menu_id: itemId,
        variant:true,
        restaurant_id: restaurantId,
      },
    ]);
    let local=[...cartItem,{
      id: data.id,
      name:data.name,
      quantity: 1,
      menu_id: itemId,
      variant:true,
      restaurant_id: restaurantId,
    }]
    localStorage.setItem('cartItem',JSON.stringify(local))
    let final = [
      {
        id: data.id,
        name:data.name,
        quantity: 1,
        menu_id: itemId,
        variant:true,
        restaurant_id: restaurantId,
      },
    ];
    handlevariantCart(final);
  };

  const handleVarientincrement = (data) => {
    handlecartSingleIncrement(data);
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.id]) {
      CartV1[data.id]++;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

    setcount((prv) => [...prv, count + 1]);
  };
  const handlecartSingleIncrement = (data) => {
    let CartV2={...cart_item_objs_v2}
    if (CartV2[data.menu_id]) {
      CartV2[data.menu_id]++ ;
    }
    setcart_item_objs_v2(CartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(CartV2))
    setcount((prv) => [...prv, count+1]);
  };

  const handleVarientDecrement = (data) => {
    handlecartSingleDecrement(data);
    if (cart_item_objs_v1[data.id] === 1) {
      let index = findindex(data.id);
      if (index > -1) {
        let originlArray=[...cartItem]
        originlArray.filter((val)=>val!==originlArray[index])
        originlArray.splice(index, 1);
        localStorage.setItem('cartItem',JSON.stringify(originlArray))
        setCartItem(originlArray);
        setcount((prevValue) => [...prevValue, count + 1]);
      }
    }
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.id]) {
      CartV1[data.id]--;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

  };

  const handlecartSingleDecrement = (data) => {
    let cartV2={...cart_item_objs_v2}
    if (cartV2[data.menu_id]) {
      cartV2[data.menu_id]--;
    }
    setcart_item_objs_v2(cartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(cartV2))

  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };  
  const[dis,setdis]=useState(false);
  const Addfavourite=()=>{
    const loggedInUser=localStorage.getItem('user');
    if(loggedInUser)
    {
      dataService.AddFavouriteRestaurant(props.Menulist[0].restaurant_id).then((response)=>{
        console.log("response is coming from add favourite---->",response)
        if(response.data.data.error_status)
        {
          console.log(response.data.data.message)
          //  RemoveFavourite();
        }else{
          let user=JSON.parse(localStorage.getItem('user'));
          user.info.favourites.push(props.Menulist[0].restaurant_id);
          localStorage.setItem('user',JSON.stringify(user))
          setFavourite(true);
          setdisplay(true);
          setTimeout(()=>{setdisplay(false)},5000)
          // window.location.reload();
        }
    });
    }else {
      console.log(dis)
      setdis(!dis);
      console.log("please login and then you can add into favourites")
    }
  }
  const RemoveFavourite=()=>{
    const loggedInUser=localStorage.getItem('user');
    if(loggedInUser)
    {
      dataService.RemoveFavouriteRestaurant(props.Menulist[0].restaurant_id).then((response)=>{
        console.log("response is coming from Remove favourite---->",response)
        if(response.data.data.error_status)
        {
          console.log(response.data.data.message)
        }else{
          let user=JSON.parse(localStorage.getItem('user'));
          user.info.favourites.splice(user.info.favourites.indexOf(props.Menulist[0].restaurant_id),1);
          localStorage.setItem('user',JSON.stringify(user))
          console.log(user);
          setFavourite(false);
          setdisplay(false);
        }
    });
  }
}
  return (
    <>
    <div className="header-border">
     {display && <div id="snackbar" className="show">Restaurant added to Favourite list</div>}
        <div className="menu-header">
          <div className="mobile-search-bar">
            <label
              className="restaurant-list-label"
              htmlFor="search-dish"
            ></label>
            <input
              name="search-dish"
              placeholder="Search your dish"
              id="search-dish"
            />
            <img
              alt="close Icon"
              className="mobile-close"
              src="../../images/close_icon.svg"
            />
          </div>
          <div className="menu-header-inner">
            <div className="menu-hand">
              <img alt="menu-icon" src="../../images/menu_icon.svg" />
            </div>
            <ul className="menu-list">
              <li className="active" onClick={() => clickhandler("Menu")}>
                <a className="active" href="#">
                  Menu
                </a>
              </li>
              <li>
                <a href="#">Overview</a>
              </li>
              <li>
                <a href="#">Reviews</a>
              </li>
              <li className="favourite">
              {!favourite?
              (<a href="#" onClick={Addfavourite}>
              <img className="empty-heart" src="/images/Fav-Outline.svg" alt="heart-icon" onClick={Addfavourite}/>Favourite
                </a>):
                  (<a href="#" onClick={RemoveFavourite}>
                      <img className="filled-heart" src="/images/Fav-Filled.svg" alt="filled-heart-icon"  onClick={RemoveFavourite}/>
                      Favourite
                  </a>)
                  }
                   <LoginContext.Provider value={{dis,setdis}}>
                    {dis&& <Login />}
                    </LoginContext.Provider>
             </li> 
            </ul>
          </div>
          <div className="menu-search">
            <form>
              <label
                className="restaurant-list-label"
                htmlFor="search-your-dish"
              ></label>
              <input
                name="Search"
                placeholder="Search your dish"
                id="search-your-dish"
                onChange={(e) => handleSearchChange(e)}
              />
              <img
                alt="Search Icon"
                className="menu-search-img"
                src="../../images/Group%202500.svg"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="menu-body">
        <div className="side-menu-list" id="sideFilter">
          <div className="close-menu" onClick="closeNav()">
            <img alt="close-icon" src="../../images/close_icon.svg" />
          </div>

          <ul className="menu-feild frame">
            {allfoodtypes.map((type) => (
              <li
                onClick={() => clickhandler(type)}
                className={
                  foodtype === type ? "active food-filter" : "food-filter" 
                } style={{cursor:"pointer"}}
              >
                <a>
                  {type}({item_count[type]})
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu-item-list">
          <h2>
            {foodtype}({item_count[foodtype]})
          </h2>
          {foodItems &&
            foodItems
              .filter((val) => searchFood(val))
              .map((item, i) => (
                // <Menu item={item}/>

                <div
                  className={
                    item.status
                      ? "menu-items"
                      : "menu-items menu-status-deactivate"
                  }
                  key={item.id}
                >
                  <img
                    alt={item.alt_text}
                    src={`https://development-cdn.letseat.co.uk/resize-image/140/${item.image_url}`}
                  />
                  <div className="menu-item-description">
                    <div className="menu-name">
                      <div className="menu-wrap">
                        <h4>{item.name}</h4>
                        <div className="customize-list">
                          <span className={item.veg ? "veg-item" : " "}>
                            £{item.variants[0].le_price}
                          </span>
                          {item.variants.length > 1 ? (
                            <a
                              className="Customizable"
                              data-target="#exampleModal2"
                              data-toggle="modal"
                              href="#"
                              onClick={() => handlecustom(item)}
                            >
                              Customizable
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <>
                        {item.variants.length > 1 ? (
                          <>
                            {cart_item_objs_v2[item.id] === undefined ||
                            cart_item_objs_v2[item.id] === 0 ? (
                              <div className="menu-add-btn" key={i}>
                                <button onClick={() => handlecustom(item)}>
                                  Add
                                </button>
                              </div>
                            ) : (
                              <div
                                className="new-counter quantity-block"
                                key={i}
                              >
                                <div className="new-up">
                                  <button
                                    className="quantity-arrow-minus quantity"
                                    onClick={() => handleAddCart(item)}
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
                                  value={cart_item_objs_v2[item.id]}
                                  id="quantity-number"
                                />
                                <div className="new-down">
                                  {item.variants.length > 1 ? (
                                    <button
                                      className="quantity-arrow-plus quantity"
                                      onClick={() => setShow(true)}
                                    >
                                      +
                                    </button>
                                  ) : (
                                    <button
                                      className="quantity-arrow-plus quantity"
                                      onClick={() => handleAddCart(item)}
                                    >
                                      +
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {cart_item_objs_v1&&cart_item_objs_v1[item.variants[0].id] ===
                              undefined ||
                              cart_item_objs_v1&&cart_item_objs_v1[item.variants[0].id] === 0 ? (
                              <div className="menu-add-btn" key={i}>
                                <button onClick={() => handleAddCart(item)}>
                                  Add
                                </button>
                              </div>
                            ) : (
                              <div
                                className="new-counter quantity-block"
                                key={i}
                              >
                                <div className="new-up">
                                  <button
                                    className="quantity-arrow-minus quantity"
                                    onClick={() => handleDecrement(item)}
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
                                  value={cart_item_objs_v1&&cart_item_objs_v1[item.variants[0].id]}
                                  id="quantity-number"
                                />
                                <div className="new-down">
                                  {item.variants.length > 1 ? (
                                    <button
                                      className="quantity-arrow-plus quantity"
                                      onClick={() => setShow(true)}
                                    >
                                      +
                                    </button>
                                  ) : (
                                    <button
                                      className="quantity-arrow-plus quantity"
                                      onClick={() => handleIncrement(item)}
                                    >
                                      +
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>

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
                  </div>
                </div>
              ))}
          <div
            className="filter-overlay sidemenu-overlay"
            onClick="closeNav()"
          ></div>
        </div>
        <div className="customize-list-popup">
          <div
            aria-modal="true"
            aria-labelledby="exampleModalLabel2"
            className={["modal fade", show ? "show display-popup" : ""].join(
              " "
            )}
            id="exampleModal2"
            role="dialog"
            tabIndex="-1"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content" id="exampleModalLabel2">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setShow(false)}
                >
                  <img alt="close-icon" src="../../images/new-close.svg" />
                </button>
                <div className="modal-header">
                  <h2>{Name}</h2>
                </div>
                <div className="modal-body">
                  <div className="quantity">
                    <p>Quantity</p>
                  </div>
                  <div className="customize-items-box">
                    {variant.map((data, i) => (
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
                            <a onClick={() => handlecustomAdd(data)}>Add</a>
                          </div>
                        ) : (
                          <div
                            className="new-counter quantity-block"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const { Menulist,Favourites } = state;
  return { Menulist,Favourites };
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getcart: UserAction.getcart,
  FavouriteList:UserAction.FavouriteList,
};
export default connect(mapStateToProps, actionCreator)(MenuItems);
