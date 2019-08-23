export const getJwt = ()=> {
    return localStorage.getItem("x-auth-token");
}

export const getUser = ()=>{
    var user = JSON.parse(localStorage.getItem('user')).user;
    return user;
}
export const getName = ()=>{
    return JSON.parse(localStorage.getItem('user')).user.name;
}
export const logout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('x-auth-token');
}

export const isAuthenticated = ()=>{
    return getJwt() && getUser();
}

export const getConfig = ()=> {
    const config = {
        headers:{
            "Content-type":"application/json"
        }
      };
      const jwt = getJwt();
      config.headers['x-auth-token'] = jwt;

      return config;
}   
