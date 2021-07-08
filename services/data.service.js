import axios from "axios";
export const dataService = {
    getCuisines,
    getRestaurants,
    getCuratedList
}

async function getCuisines() {
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/cuisines/web/list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
 

async function getRestaurants(type) {
    try {
         var body = {}
         if(type==="pure_veg")
         {
             body={
                  "Filter":{
        "key":type,
        "value":"true"
    }
             }
         }
       else if (type==="ratings") {
            body={
                "page_size":3,
       "sort_by":{
        "key":type,
        "value":"desc"
             }
            }      
       }
       else if (type) {
            body={
                "page_size":3,
       "sort_by":{
        "key":type,
        "value":"asc"
             }
            }      
       }
      
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/restaurants/list', body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}

async function getCuratedList() {
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/curatedlist/web/featured_curated_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}