import { Upload, UploadProps } from 'antd';
import React, {  } from 'react';
import {useReactBlade,useBladeToken} from "../../../hooks";

export type AUploadProps = UploadProps & {
  // columns: any[];
  // hasAdd?: boolean;
  // hasEdit?: boolean;
  // hasDel?: boolean;
  // hasView?: boolean;
  // initialValues?: any;
  // onDeleteRow?: (index: number, record: any) => Promise<boolean>;
  // onUpdateRow?: (index: number, record: any) => Promise<boolean>;
  // onCreate?: (record: any) => Promise<boolean>;
  // onDelete?: (record: any) => Promise<boolean>;
  // state: string;
  readOnly?: boolean;
};
const AUpload: React.FC<AUploadProps> = ({ children, ...rest }) => {
  // console.log('proColumns', proColumns);
  const bladeApi = useReactBlade();
  const bladeToken = useBladeToken();

  const uploadProps = {
    action: `${bladeApi.apiUrl}${bladeApi.uploadUrl}`,
    headers: {
    //   Authorization: webApi.auth.getSafeCode(),
      [bladeToken.tokenHeader]: "Bearer " +bladeToken.token,
    },
    ...rest,
  };

  return <Upload {...uploadProps}>{children}</Upload>;
};

export default AUpload;
