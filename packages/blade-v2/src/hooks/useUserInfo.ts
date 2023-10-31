import { BladeUser } from "../typing";
import useReactBlade from "./useReactBlade";
import useSWR from "swr";

export default () => {
  const bladeApi = useReactBlade();

  const { data, mutate } = useSWR<BladeUser>(
    `/blade-user/info`,
    bladeApi.services.bladeUser.getUserInfo
  );

  const updateUserInfo = async (user: BladeUser) => {
    await bladeApi.services.bladeUser.updateInfo(user);
    mutate();
  };

  return [data, updateUserInfo];
};
