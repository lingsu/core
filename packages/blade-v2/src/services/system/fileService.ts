import { BladeConfig, BladeRequest } from "../../typing";

export type Captcha = {
  image: string;
  key: string;
};

export type FileService = {
  // download: (url: string) => Promise<boolean>;
  uploadFile: (body: any, url?: string) => Promise<any>;
};
export const fileService = (
  request: BladeRequest,
  config: BladeConfig
): FileService => {
  // const download = async (url: string) => {
  //   var token = auth.getTokenHeader() + "=" + auth.getToken();
  //   if (url.indexOf("?") > -1) {
  //     if (!url.endsWith("&")) {
  //       url = url + "&";
  //     }
  //   } else {
  //     url = url + "?";
  //   }
  //   return downloadByUrl({
  //     url: url + token,
  //   });
  // };

  const uploadFile = (body: any, url: string = config.uploadUrl) => {
    return request.post(url, {
      body,
      headers: {
        "Content-type": "multipart/form-data;charset=UTF-8",
      },
    });
  };
  return {
    // download,
    uploadFile,
    // logout,
    // getUserInfo,
    // sendLogs,
  };
};
