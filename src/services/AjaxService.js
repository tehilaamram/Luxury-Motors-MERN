import axios from 'axios';
// axios.defaults.withCredentials = true;


export default class AjaxService {

  static async get(urlpath, params) {
    return axios({
      method: 'get',
      url: process.env.REACT_APP_SERVER_URL + urlpath,
      params,
    }).then((res) => {
      return res;
    });
  }
   static async post(urlpath, data, config) {

    return axios({
      url: process.env.REACT_APP_SERVER_URL + urlpath,
      method: 'post',
      config,
      // headers: { /* custom HTTP headers here, if you need any */ },
      // xhrFields: {
          // withCredentials: true,
      // },
      withCredentials: true,
    //   headers: {'content-type': 'application/json',
    //         // withCredentials: true,
    // },
      data,
    }).then((response) => {
        return response;
      });
  }
}
