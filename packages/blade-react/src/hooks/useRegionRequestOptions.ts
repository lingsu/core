import { RequestOptionsType } from "@ant-design/pro-components";
import { optionsConvert, OptionsConvertOption } from "@q25a25q/common";
import { useEffect, useState } from "react";
import { createApi } from "..";

export default (code: string, dickOption?: OptionsConvertOption) => {
  const [dataSource, setDataSource] = useState<RequestOptionsType[]>(
    [] as RequestOptionsType[]
  );

  const getData = async () => {
    var api = createApi();

    var items = await api.services.region.getSelectList(code || "3303");

    // var items = await api.services.dict.getDictionaryTree({
    //   code: code,
    // });

    setDataSource(
      optionsConvert(items, {
        valueKey: "code",
        labelKey: "name",
        ...dickOption,
      }) as RequestOptionsType[]
    );
  };

  useEffect(() => {
    getData();
  }, [code]);

  return dataSource;
};
