var axios = require('axios');

class userApi {

  static requestHeaders() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${localStorage.token}`)
    return myHeaders
  }

  static signUp(form) {
    var data = JSON.stringify(form);
    var config = {
      method: 'post',
      url: 'http://localhost:8080/project/user/signup',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);  
  }

  static login(form) {
    var data = JSON.stringify(form);
    var config = {
      method: 'post',
      url: 'http://localhost:8080/project/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    return axios(config);  
  }

  static checkSession() {

    var config = {
      method: 'get',
      url: 'http://localhost:8080/project/user/validateToken',
      headers: { 
        'Authorization': `${localStorage.token}`
      }
    };
    return axios(config)
  }

}

export default userApi;