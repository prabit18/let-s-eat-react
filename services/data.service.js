import axios from "axios";
export const dataService = {
    getCuisines
}

async function getCuisines() {
    try {
        const data = await axios.post('https://staging-apis.letseat.co.uk/staging/api/v1/cuisines/web/list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
