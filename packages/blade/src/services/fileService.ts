import { downloadByUrl } from "@q25a25q/common";
import { ServiceParams } from "./api";

export type Captcha = {
  image: string;
  key: string;
};

export type FileService = {
  download: (url: string) => Promise<boolean>;
};
export const fileService = ({ auth }: ServiceParams): FileService => {
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
  return {
    download,

    // logout,
    // getUserInfo,
    // sendLogs,
  };
};
