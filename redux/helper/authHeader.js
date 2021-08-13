export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token.id_token) {
        return { 'Authorization': 'Bearer ' + user.token.id_token ,
                'Content-Type':'application/json'};
    } else {
        return {};
    }
}
