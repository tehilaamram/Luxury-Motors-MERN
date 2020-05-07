import axios from 'axios';
import * as localForage from 'localforage';
// import {ENV_PATH} from './envConst';

// get. post. delete. update

export default class AjaxService {
  // public static tokenId: any;
  // public static getInstance(): AjaxService {
  //   if (!AjaxService.instance) {
  //     AjaxService.instance = new AjaxService();
  //   }
  //   return AjaxService.instance;
  // }
  // private static instance: AjaxService;

  // private constructor() { }

  // public async setTokenId() {
  //   AjaxService.tokenId = await localForage.getItem('idtn');
  // }

  static async get(urlpath, params) {
    const tokenId = await localForage.getItem('idtn');
    return axios({
      method: 'get',
      url: process.env.REACT_APP_BASE_API + urlpath,
      headers: { Authorization: `Bearer ${tokenId}` },
      params,
    }).then((res) => {
      return res;
    });
  }

   static async post(urlpath, data) {
    return axios({
      url: urlpath,
      method: 'post',
      headers: {'content-type': 'application/json',
    },
      data,
    }).then((response) => {
        return response;
      });
  }
//   public static async nonUpstreamPost(url: string, data: any = {}, iauth: any = {}): Promise<any> {
//     const tokenId = await localForage.getItem('idtn');
//     return axios({
//       url,
//       method: 'post',
//       headers: {'content-type': 'application/json',
//         'Authorization': `Bearer ${tokenId}`,
//         'Postman-Token': '5bdd45a5-bbde-451f-bd73-667caec3808e',
//         'cache-control': 'no-cache',
//       },
//       data,
//     }).then((response) => {
//       return response;
//     });
//   }
//    delete(url: string) {
//     axios.delete(url).then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
}
