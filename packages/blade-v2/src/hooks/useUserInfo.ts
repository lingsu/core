import useReactBlade from "./useReactBlade";
import useSWR from "swr";

export default () => {
    
  const bladeApi = useReactBlade();

  const { data,mutate  } = useSWR<any>(
    `/blade-user/info`,
    bladeApi.services.bladeUser.getUserInfo
  );
  
  return [data,mutate];
}