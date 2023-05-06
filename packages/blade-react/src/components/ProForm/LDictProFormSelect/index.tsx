// import { useSystemDictIntMap } from '@/andy/hooks/useSystemDict';
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import { createApi } from '../../../';

// import createApi from "@q25a25q/blade"
export default (props: ProFormSelectProps & { dictKey: 'string' }) => {
  const { dictKey, ...rest } = props;
  // const qualificationsEnumValue = useSystemDictIntMap(dictKey);

  // createApi().services.dict.getList(dictKey)
  // webApi
  // webApi.services.dict.getList({
  //   current: 1, 
  //   size:100
  // }).then((data) => {
  //   console.log('dict', data);
  //   setDataSource(data);
  // });
  // createApi()

  return <ProFormSelect  {...rest} />;
};
