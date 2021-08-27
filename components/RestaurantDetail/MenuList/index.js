import { map } from "jquery";
import router from "next/router";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { UserAction } from "../../../redux/actions/user.action";
import { Menulist } from "../../../redux/reducer/menulist.reducer";
import { dataService } from "../../../services";
import MenulistContext from "../../Context/MenulistContext";
import MenulistContetx from "../../Context/MenulistContext";
import LoginContext from "../../Context/LoginContext";
import Customizable from "../Customizable";
import Menu from "./menu";
import Login from "../../login";

import "react-responsive-modal/styles.css";
import ModalPopup from "../../Modal";
import VarientPopup from "../VarientPopup";
import ClearcartModal from "./ClearcartModal";
import { Modal } from "react-responsive-modal";
const MenuItems = (props) => {
  // @refresh reset
  var pathname = window.location.pathname;
  localStorage.setItem("pathname", pathname);

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
  var user = JSON.parse(localStorage.getItem("user"));
  const [cart_items, setcartItems] = useState([]);
  const [foodtype, setFoodType] = useState("Menu");
  const [Name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState(props.Menulist[0].variants);
  const [modalType, setmodalType] = useState('')
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
  var user = false;
  const [display, setdisplay] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVarient, setOpenVarient] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    debugger
    setOpen(false);}
  const onCloseVarientModal = () =>{ 
    setOpen(false)
    setVariant(false)};

  useEffect(async () => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      SetFoodItems(JSON.parse(localStorage.getItem("menuItems")));
      ConstructMenuObject(
        JSON.parse(localStorage.getItem("menuItems")),
        JSON.parse(localStorage.getItem("cartItem")) || []
      );
      setCartItem(JSON.parse(localStorage.getItem("cartItem")) || []);
      setcart_item_objs_v1(
        JSON.parse(localStorage.getItem("cart_item_objs_v1")) || {}
      );
      setcart_item_objs_v2(
        JSON.parse(localStorage.getItem("cart_item_objs_v2")) || {}
      );
      setFavourite(false);
    } else {
      SetFoodItems(props.Menulist);
      dataService.cartItems().then((response) => {
        if (response.data) {
          response.data.forEach((value) => {
            var list = props.Menulist.filter((val) => val.id === value.item_id);
            value["le_price"] = value["price"];
            delete value["price"];
          });
          setCartItem(response.data);
          ConstructMenuObject(props.Menulist, response.data);

          handlesinglevariant(response.data);
          let User = JSON.parse(localStorage.getItem("user"));
          dataService
            .FavouriteList()
            .then((res) => {
              res.data.data.message !== "User not found" &&
                res.data.data.data.map((item) => {
                  if (item.id === props.Menulist[0].restaurant_id) {
                    if (
                      !User.info.favourites.includes(
                        props.Menulist[0].restaurant_id
                      )
                    ) {
                      User.info.favourites.push(
                        props.Menulist[0].restaurant_id
                      );
                      localStorage.setItem("user", JSON.stringify(user));
                    } else console.log("");
                    setFavourite(true);
                  }
                });
            })
            .catch((e) => {
              console.log(e);
            });
          if (User.info.favourites.includes(props.Menulist[0].restaurant_id)) {
            setFavourite(true);
          }
        }
      });
    }
  }, []);
  useEffect(() => {
    SetFoodItems(props.Menulist);
  }, [props.Menulist]);

  const ConstructMenuObject = (list, cart) => {    
    let Menu = { ...menuObject };
    list &&
      list.forEach((item) => {
        item.variants.forEach((child_item) => {
          Menu[child_item.id] = child_item;
          Menu[child_item.id].image_url = item.image_url;
          Menu[child_item.id].name = item.name;
          Menu[child_item.id].veg = item.veg;
          Menu[child_item.id].description = item.description;
          Menu[child_item.id].menu_id = item.id;
          Menu[child_item.id].isVariant =
            item.variants.length > 1 ? true : false;
          Menu[child_item.id].status = item.status;
          Menu[child_item.id].restaurant_id = item.restaurant_id;
        });
      });
    setmenuObject(Menu);
    localStorage.setItem("menuObject", JSON.stringify(Menu));
    props.getMenuObject(Menu);

    let rest_id = window.localStorage.pathname.split("/")[2].split("-")[
      pathname.split("/")[2].split("-").length - 1
    ];
    rest_id = rest_id.toLocaleLowerCase();
    let datarest_id =
      cart.length > 0 ? cart[0].rest_id || cart[0].restaurant_id : "";
    datarest_id = datarest_id.toLocaleLowerCase();

    if (JSON.parse(localStorage.getItem("user")) && rest_id === datarest_id) {
      handleMainvariant(cart, Menu);
    }
  };
  const handleClearCart = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      dataService.clearCart().then((res) => {
        if (res.data) {
          setOpen(false);
          setcartItems([]);
          props.getcartV1({});
          props.getcartV2({});
          localStorage.removeItem("delivery_type");
          window.location.reload();
        }
      });
    } else {
      localStorage.clear();
      window.location.reload();
    }
  };
  // const handleMainvariant = () => {
  //   return useMemo(() => {
  //     return handleMainvariant1();
  //   }, [menuObject]);
  // };
  // // const handleMainvariant=useMemo(
  // //   (value,menu)=>{
  // //     handleMainvariant1(value,menu)
  // //   },
  // // [menuObject])

  const handleMainvariant = (value, menu) => {
    if (Object.keys(menu).length > 0) {
      var cartV2 = { ...cart_item_objs_v2 };
      value.forEach((item, i) => {
        if (
          cartV2[item.item_id] &&
          menu[item.variant_id].isVariant &&
          menu[item.variant_id].isVariant === true
        ) {
          cartV2[item.item_id] += parseInt(item.quantity);
        } else {
          cartV2[item.item_id] = parseInt(item.quantity);
        }
      });

      props.getcartV2(cartV2);
      setcart_item_objs_v2(cartV2);
    }
  };
  const handlesinglevariant = (cart) => {
    let cartV1 = { ...cart_item_objs_v1 };
    cart.forEach((value) => {
      if (cartV1[value.variant_id]) {
        cartV1[value.variant_id]++;
      } else {
        cartV1[value.variant_id] = value.quantity;
      }
    });
    props.getcartV1(cartV1);
    setcart_item_objs_v1(cartV1);
  };
  // useEffect(() => {
  //
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
    setVariant(variants);
  };
  const [itemId, setItemId] = useState();
  const [restaurantId, setrestaurantId] = useState();
  const [indiviadualFood, setindiviadualFood] = useState([]);
  const handlecustom = (data) => {
    let rest_id = window.localStorage.pathname.split("/")[2].split("-")[
      pathname.split("/")[2].split("-").length - 1
    ];
    let datarest_id = "";

    if (JSON.parse(localStorage.getItem("user"))) {
      datarest_id =
        cartItem.length > 0
          ? cartItem[0].rest_id || cartItem[0].restaurant_id
          : "";
    } else {
      var local = JSON.parse(localStorage.getItem("cartItem"))
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [];

      if (local.length > 0) {
        datarest_id = local[0].restaurant_id;
      } else {
        datarest_id = "";
      }
    }
    if (
      datarest_id.toLocaleLowerCase() === rest_id.toLocaleLowerCase() ||
      datarest_id === ""
    ) {
      // setShow(true);
      setmodalType("Varient")
      setOpen(true)
      setOpenVarient(true);
      setName(data.name);
      handleVarient(data.variants, data.id);
      setItemId(data.id);
      setindiviadualFood(data);
      setrestaurantId(data.restaurant_id);
    } else {
      setOpen(true);
      setmodalType("Clear")
    }
  };

  const findindex = (id) => {
    var elementPos = cartItem
      .map(function (x) {
        return x.variant_id;
      })
      .indexOf(id);
    return elementPos;
  };

  const handleCartObje = (cartItemvalue) => {
    let cartV1 = { ...cart_item_objs_v1 };

    if (!JSON.parse(localStorage.getItem("user"))) {
      if (cartV1[cartItemvalue[0].variant_id]) {
        cartV1[cartItemvalue[0].variant_id]++;
      } else {
        cartV1[cartItemvalue[0].variant_id] = cartItemvalue[0].quantity;
      }
      props.getcartV1(cartV1);
      setcart_item_objs_v1(cartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(cartV1));
    } else {
      if (cartV1[cartItemvalue[0].variant_id]) {
        cartV1[cartItemvalue[0].variant_id]++;
      } else {
        cartV1[cartItemvalue[0].variant_id] = cartItemvalue[0].quantity;
      }
    }
    props.getcartV1(cartV1);
    setcart_item_objs_v1(cartV1);
  };

  const handleCartinc = (cartItemvalue) => {
    let CartV1 = { ...cart_item_objs_v1 };

    if (!JSON.parse(localStorage.getItem("user"))) {
      // handlecartV2(cartItemvalue)
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
    }
  };

  //VARIENT CART MANGAGING
  const handlevariantCart = (cartItemvalue) => {
    var cartV1 = { ...cart_item_objs_v1 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      handlecartV2(cartItemvalue);
      if (cartV1[cartItemvalue[0].variant_id]) {
        cartV1[cartItemvalue[0].variant_id]++;
      } else {
        cartV1[cartItemvalue[0].variant_id] = cartItemvalue[0].quantity;
      }
      setcart_item_objs_v1(cartV1);
      props.getcartV1(cartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(cartV1));
    } else {
      var cartV1 = { ...cart_item_objs_v1 };
      handlecartV2(cartItemvalue);
      if (cartV1[cartItemvalue[0].variant_id]) {
        cartV1[cartItemvalue[0].variant_id]++;
      } else {
        cartV1[cartItemvalue[0].variant_id] = parseInt(
          cartItemvalue[0].quantity
        );
      }
      // });
    }
    props.getcartV1(cartV1);
    setcart_item_objs_v1(cartV1);
  };

  const handlecartV2 = (cartItemvalue) => {
    let CartV2 = { ...cart_item_objs_v2 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV2[cartItemvalue[0].item_id]) {
        CartV2[cartItemvalue[0].item_id]++;
      } else {
        CartV2[cartItemvalue[0].item_id] = cartItemvalue[0].quantity;
      }
      // props.getcartV2(CartV2)
      setcart_item_objs_v2(CartV2);
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(CartV2));
    } else {
      cartItemvalue.forEach(function (item) {
        if (CartV2[item.item_id]) {
          CartV2[item.item_id]++;
        } else {
          CartV2[item.item_id] = item.quantity;
        }
      });
      props.getcartV2(CartV2);
      setcart_item_objs_v2(CartV2);
    }
  };

  //SINGLE ITEM CART
  const handleAddCart = (data) => {
    let rest_id = window.localStorage.pathname.split("/")[2].split("-")[
      pathname.split("/")[2].split("-").length - 1
    ];
    let datarest_id = "";
    if (JSON.parse(localStorage.getItem("user"))) {
      datarest_id =
        cartItem.length > 0
          ? cartItem[0].rest_id || cartItem[0].restaurant_id
          : "";
    } else {
      var local = JSON.parse(localStorage.getItem("cartItem"))
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [];
      if (local.length > 0) {
        datarest_id = local[0].restaurant_id;
      } else {
        datarest_id = "";
      }
    }

    if (
      datarest_id.toLocaleLowerCase() === rest_id.toLocaleLowerCase() ||
      datarest_id === ""
    ) {
      if (data.variants.length > 1) {
        setShow(true);
        handlecustom(data);
      } else if (!JSON.parse(localStorage.getItem("user"))) {
        let cart = [];
        cart.push({
          variant_id: data.variants[0].id,
          name: data.name,
          quantity: 1,
          item_id: data.id,
          isVariant: false,
          restaurant_id: data.restaurant_id,
          veg: data.veg,
          le_price: data.variants[0].le_price,
        });

        setCartItem((oldarray) => [
          ...oldarray,
          {
            variant_id: data.variants[0].id,
            name: data.name,
            quantity: 1,
            item_id: data.id,
            isVariant: false,
            restaurant_id: data.restaurant_id,
            veg: data.veg,
            le_price: data.variants[0].le_price,
          },
        ]);
        let localItem = [];
        if (cartItem !== null) {
          localItem = cart;
        } else {
          localItem = [
            {
              variant_id: data.variants[0].id,
              name: data.name,
              quantity: 1,
              item_id: data.id,
              isVariant: false,
              restaurant_id: data.restaurant_id,
              veg: data.veg,
              le_price: data.variants[0].le_price,
            },
          ];
        }
        let final = [
          {
            variant_id: data.variants[0].id,
            name: data.name,
            quantity: 1,
            item_id: data.id,
            isVariant: false,
            restaurant_id: data.restaurant_id,
            veg: data.veg,
            le_price: data.variants[0].le_price,
          },
        ];
        var cartArray = [
          ...cartItem,
          {
            variant_id: data.variants[0].id,
            name: data.name,
            quantity: 1,
            item_id: data.id,
            isVariant: false,
            restaurant_id: data.restaurant_id,
            veg: data.veg,
            le_price: data.variants[0].le_price,
          },
        ];
        localStorage.setItem("cartItem", JSON.stringify(cartArray));

        handleCartObje(final);
      } else {
        var data_body = {
          rest_id: data.restaurant_id,
          item_id: data.id,
          quantity: "1",
          variant_id: data.variants[0].id,
        };
        dataService.AddTocart(data_body).then((resp) => {
          if (resp.data !== null) {
            var response = resp.data;
            setCartItem((oldarray) => [
              ...oldarray,
              {
                variant_id: resp.data["variant_id"],
                quantity: cart_item_objs_v1[response["variant_id"]],
                name: menuObject[response.variant_id].name,
                item_id: response["item_id"],
                isVariant: false,
                restaurant_id: response["rest_id"],
                veg: menuObject[response.variant_id].veg,
                le_price: menuObject[response.variant_id].le_price,
              },
            ]);
            var result = [resp.data];
            handleCartObje(result);
          }
        });
      }
    } else {
      setOpen(true);
      setmodalType("Clear")
    }
  };

  //SINGLE ITEM INCREMENT
  const handleIncrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      let final = [
        {
          variant_id: data.variants[0].id,
          name: data.name,
          quantity: 1,
          item_id: data.id,
          isVariant: false,
          restaurant_id: data.restaurant_id,
        },
      ];

      handleCartinc(final);
    } else {
      var data_body = {
        rest_id: data.restaurant_id,
        item_id: data.id,
        quantity: "1",
        variant_id: data.variants[0].id,
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          var response = resp.data;
          handleCartinc([response]);
        }
      });
    }
  };

  const handleCartRemove = (cartItemvalue) => {
    var CartV1 = { ...cart_item_objs_v1 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]--;
        props.getcartV1(CartV1);
        setcart_item_objs_v1(CartV1);
        localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
      }
    } else {
      if (CartV1[cartItemvalue.variant_id]) {
        CartV1[cartItemvalue.variant_id]--;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
    }
  };

  const handleDecrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      let final = [
        {
          variant_id: data.variants[0].id,
          name: data.name,
          quantity: 1,
          item_id: data.id,
          isVariant: false,
          restaurant_id: data.restaurant_id,
        },
      ];

      if (parseInt(cart_item_objs_v1[data.variants[0].id]) === 1) {
        let index = findindex(data.variants[0].id);
        if (index > -1) {
          let originlArray = [...cartItem];
          originlArray.filter((val) => val !== originlArray[index]);
          originlArray.splice(index, 1);
          setCartItem(originlArray);
          localStorage.setItem("cartItem", JSON.stringify(originlArray));
        }
      }
      handleCartRemove(final);
    } else {
      let data_body = {
        rest_id: data.restaurant_id,
        item_id: data.id,
        variant_id: data.variants[0].id,
        quantity: "-1",
      };

      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          if (cart_item_objs_v1[data.variants[0].id] == 1) {
            let index = findindex(data.variants[0].id);
            if (index > -1) {
              let originlArray = [...cartItem];
              originlArray.filter((val) => val !== originlArray[index]);
              originlArray.splice(index, 1);
              setCartItem(originlArray);
            }
          }
          handleCartRemove(data_body);
        }
      });
    }
  };

  const handlecustomAdd = (data, name) => {
    let rest_id = window.localStorage.pathname.split("/")[2].split("-")[
      pathname.split("/")[2].split("-").length - 1
    ];
    let datarest_id = "";
    if (JSON.parse(localStorage.getItem("user"))) {
      datarest_id =
        cartItem.length > 0
          ? cartItem[0].rest_id || cartItem[0].restaurant_id
          : "";
    } else {
      var local = JSON.parse(localStorage.getItem("cartItem"))
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [];
      if (local.length > 0) {
        datarest_id = local[0].restaurant_id;
      } else {
        datarest_id = "";
      }
    }

    if (
      datarest_id.toLocaleLowerCase() === rest_id.toLocaleLowerCase() ||
      datarest_id === ""
    ) {
      if (!JSON.parse(localStorage.getItem("user"))) {
        var cart = [];
        cart.push({
          variant_id: data.id,
          name: data.name,
          quantity: 1,
          item_id: itemId,
          isVariant: true,
          restaurant_id: restaurantId,
          veg: data.veg,
          le_price: data.le_price,
        });
        setCartItem((oldarray) => [
          ...oldarray,
          {
            variant_id: data.id,
            name: menuObject[data.id].name,
            quantity: 1,
            item_id: itemId,
            isVariant: true,
            restaurant_id: restaurantId,
            veg: menuObject[data.id].veg,
            le_price: data.le_price,
          },
        ]);
        let localItem = [];
        if (cartItem === null) {
          localItem = cart;
        } else {
          localItem = [
            ...cartItem,
            {
              variant_id: data.id,
              name: menuObject[data.id].name,
              quantity: 1,
              item_id: itemId,
              isVariant: true,
              restaurant_id: restaurantId,
              veg: menuObject[data.id].veg,
              le_price: data.le_price,
            },
          ];
        }
        localStorage.setItem("cartItem", JSON.stringify(localItem));
        let final = [
          {
            variant_id: data.id,
            name: menuObject[data.id].name,
            quantity: 1,
            item_id: itemId,
            isVariant: true,
            restaurant_id: restaurantId,
            veg: menuObject[data.id].veg,
            le_price: data.le_price,
          },
        ];
        handlevariantCart(final);
      } else {
        let data_body = {
          rest_id: restaurantId,
          item_id: data.menu_id,
          variant_id: data.id,
          quantity: "1",
        };
        dataService.AddTocart(data_body).then((resp) => {
          if (resp) {
            var response = resp.data;

            setCartItem((oldarray) => [
              ...oldarray,
              {
                variant_id: resp.data["variant_id"],
                quantity: cart_item_objs_v1[response["variant_id"]],
                name: menuObject[response["variant_id"]].name,
                item_id: response["item_id"],
                isVariant: true,
                restaurant_id: response["rest_id"],
                veg: menuObject[response.variant_id].veg,
                le_price: menuObject[response.variant_id].le_price,
              },
            ]);
            var result = [resp.data];
            handlevariantCart(result);
          }
        });
      }
    } else {
      setOpen(true);
      setmodalType("Clear")
    }
  };

  const handleVarientincrement = (data) => {
    let CartV1 = { ...cart_item_objs_v1 };
    if (!localStorage.getItem("user")) {
      handlecartSingleIncrement(data);
      let CartV1 = { ...cart_item_objs_v1 };
      if (CartV1[data.id]) {
        CartV1[data.id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      let data_body = {
        rest_id: restaurantId,
        item_id: data.menu_id,
        variant_id: data.id,
        quantity: "1",
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          handlecartSingleIncrement(resp.data);
          if (CartV1[resp.data.variant_id]) {
            CartV1[resp.data.variant_id]++;
          }
        }
        props.getcartV1(CartV1);
        setcart_item_objs_v1(CartV1);
      });
    }
  };
  const handlecartSingleIncrement = (data) => {
    let CartV2 = { ...cart_item_objs_v2 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV2[data.menu_id]) {
        CartV2[data.menu_id]++;
      }
      props.getcartV2(CartV2);
      setcart_item_objs_v2(CartV2);
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(CartV2));
    } else {
      if (CartV2[data.item_id]) {
        CartV2[data.item_id]++;
      }
      props.getcartV2(CartV2);
      setcart_item_objs_v2(CartV2);
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(CartV2));
    }
  };

  const handleVarientDecrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      handlecartSingleDecrement(data);
      if (parseInt(cart_item_objs_v1[data.id]) === 1) {
        let index = findindex(data.id);
        if (index > -1) {
          let originlArray = [...cartItem];
          originlArray.filter((val) => val !== originlArray[index]);
          originlArray.splice(index, 1);
          localStorage.setItem("cartItem", JSON.stringify(originlArray));
          setCartItem(originlArray);
          setcount((prevValue) => [...prevValue, count + 1]);
        }
      }
      let CartV1 = { ...cart_item_objs_v1 };
      if (CartV1[data.id]) {
        CartV1[data.id]--;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      let data_body = {
        rest_id: restaurantId,
        item_id: data.menu_id,
        variant_id: data.id,
        quantity: "-1",
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          handlecartSingleDecrement(data);
          if (parseInt(cart_item_objs_v1[data.id]) === 1) {
            let index = findindex(data.id);
            if (index > -1) {
              let originlArray = [...cartItem];
              originlArray.filter((val) => val !== originlArray[index]);
              originlArray.splice(index, 1);
              localStorage.setItem("cartItem", JSON.stringify(originlArray));
              setCartItem(originlArray);
            }
          }
          let CartV1 = { ...cart_item_objs_v1 };
          if (CartV1[data.id]) {
            CartV1[data.id]--;
          }
          props.getcartV1(CartV1);
          setcart_item_objs_v1(CartV1);
        }
      });
    }
  };

  const handlecartSingleDecrement = (data) => {
    let cartV2 = { ...cart_item_objs_v2 };
    if (cartV2[data.menu_id]) {
      cartV2[data.menu_id]--;
    }
    props.getcartV2(cartV2);
    setcart_item_objs_v2(cartV2);
    localStorage.setItem("cart_item_objs_v2", JSON.stringify(cartV2));
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const [dis, setdis] = useState(false);
  const Addfavourite = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      dataService
        .AddFavouriteRestaurant(props.Menulist[0].restaurant_id)
        .then((response) => {
          if (response.data.data.error_status) {
            setFavourite(true);
            //  RemoveFavourite();
          } else {
            let user = JSON.parse(localStorage.getItem("user"));
            if (
              !user.info.favourites.includes(props.Menulist[0].restaurant_id)
            ) {
              user.info.favourites.push(props.Menulist[0].restaurant_id);
              localStorage.setItem("user", JSON.stringify(user));
            } else console.log("");
            setFavourite(true);
            setdisplay(true);
            setTimeout(() => {
              setdisplay(false);
            }, 5000);
            // window.location.reload();
          }
        });
    } else {
      setdis(!dis);
      localStorage.setItem("restaurantID", props.Menulist[0].restaurant_id);
      console.log("please login and then you can add into favourites");
    }
  };
  const RemoveFavourite = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      dataService
        .RemoveFavouriteRestaurant(props.Menulist[0].restaurant_id)
        .then((response) => {
          if (response.data.data.error_status) {
          } else {
            let user = JSON.parse(localStorage.getItem("user"));
            user.info.favourites.splice(
              user.info.favourites.indexOf(props.Menulist[0].restaurant_id),
              1
            );
            localStorage.setItem("user", JSON.stringify(user));
            setFavourite(false);
            setdisplay(false);
          }
        });
    }
  };
  const handleOpenClose=()=>{
    setOpen(false)
  }
  return (
    <>
      <div className="header-border">
        {display && (
          <div id="snackbar" className="show">
            {props.data} added to Favourites
          </div>
        )}
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
<Modal open={open} onClose={()=>setOpen(false)} center  >
  {modalType==="Clear"?<ClearcartModal handleClearCart={handleClearCart} handleOpenClose={handleOpenClose}/>:
  <VarientPopup
  variant={variant}
  Name={Name}
  cart_item_objs_v1={cart_item_objs_v1}
  cart_item_objs_v2={cart_item_objs_v2}
  handlecustomAdd={handlecustomAdd}
  handleVarientDecrement={handleVarientDecrement}
  handleVarientincrement={handleVarientincrement}
/>}

</Modal>
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
              (<a href="javascript:void(0);" onClick={Addfavourite}>
              <img className="empty-heart" src="/images/Fav-Outline.svg" alt="heart-icon" onClick={Addfavourite}/>Favourite
                </a>):
                  (<a href="javascript:void(0);" onClick={RemoveFavourite}>
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
                }
                style={{ cursor: "pointer" }}
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
                                      onClick={() => handleAddCart(item)}
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
                            {(cart_item_objs_v1 &&
                              cart_item_objs_v1[item.variants[0].id] ===
                                undefined) ||
                            (cart_item_objs_v1 &&
                              cart_item_objs_v1[item.variants[0].id] === 0) ? (
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
                                  value={
                                    cart_item_objs_v1 &&
                                    cart_item_objs_v1[item.variants[0].id]
                                  }
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
        {/* <ModalPopup>
          
                
        </ModalPopup> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { Menulist, Favourites, menuObject } = state;
  return { Menulist, Favourites, menuObject };
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getcart: UserAction.getcart,
  FavouriteList: UserAction.FavouriteList,
  getcartV1: UserAction.getcartV1,
  getcartV2: UserAction.getcartV2,
  getMenuObject: UserAction.getMenuObject,
};
export default connect(mapStateToProps, actionCreator)(MenuItems);
