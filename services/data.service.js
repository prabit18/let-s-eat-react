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
        const body = {}
        // if (type) {
        //     body.filter =''
        // }
      
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