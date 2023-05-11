import { RequestOptionsType } from "@ant-design/pro-components";
import { optionsConvert, OptionsConvertOption } from "@q25a25q/common";
import { useEffect, useState } from "react";
import { createApi } from "..";

export default (dictKey: string, dictOption?: OptionsConvertOption) => {
  const [dataSource, setDataSource] = useState<RequestOptionsType[]>(
    [] as RequestOptionsType[]
  );

  const getData = async () => {
    var api = createApi();
    var items = await api.services.dict.getDictionaryTree({
      code: dictKey,
    });

    setDataSource(
      optionsConvert(items, {
        valueKey: "dictKey",
        labelKey: "dictValue",
        ...dictOption,
      }) as RequestOptionsType[]
    );
  };
  
  useEffect(() => {
    getData();
  }, [dictKey]);

  return dataSource;
};
