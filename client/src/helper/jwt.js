export const getJwt = ()=> {
    return localStorage.getItem("x-auth-token");
}

export const getUser = ()=>{
    var user = JSON.parse(localStorage.getItem('user'));
    return user;
}
export const getName = ()=>{
    return JSON.parse(localStorage.getItem('user')).name;
}
export const logout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('x-auth-token');
}

export const isAuthenticated = ()=>{
    return getJwt() && getUser();
}