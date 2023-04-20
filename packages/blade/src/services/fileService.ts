import { downloadByUrl } from "@q25a25q/common";
import { ServiceParams } from "./api";

export type Captcha = {
  image: string;
  key: string;
};

export type FileService = {
  download: (url: string) => Promise<boolean>;
  uploadFile: <T>(url: string, data: any) => Promise<T>;
};
export const fileService = ({ auth, httpClient }: ServiceParams): FileService => {
  const download = async (url: string) => {
    var token = auth.getTokenHeader() + "=" + auth.getToken();
    if (url.indexOf("?") > -1) {
      if (!url.endsWith("&")) {
        url = url + "&";
      }
    } else {
      url = url + "?";
    }
    return downloadByUrl({
      url: url + token,
    });
  };

  const uploadFile = <T>(url: string, data: any) => {
    return httpClient.post<T>(url, {
      data,
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
      },
    });

  }
  return {
    download,
    uploadFile
    // logout,
    // getUserInfo,
    // sendLogs,
  };
};
