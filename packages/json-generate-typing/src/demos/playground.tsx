import { useState, useMemo, useCallback } from "react";
import { Card, Input, Button } from "antd";
import { ProCard } from "@ant-design/pro-components";
import jsonGenerateType from "@q25a25q/json-generate-typing";

export default () => {
  const [jsonStr, setJsonStr] = useState("");
  const [valid, setValid] = useState(true);
  const [typing, setTyping] = useState("");


  const onCodeChange = useCallback(
    (code: string | undefined) => {
      if (!code) {
        return;
      }

      try {
        const parsedCode = jsonGenerateType(JSON.parse(code));
        setValid(true);
        setTyping(parsedCode);
      } catch (err) {
        setValid(false);
      }
    },
    [setValid]
  );


  // const typing = useMemo(() => {
  //   // console.log('typing',jsonStr)
  //   if (!jsonStr) {
  //     return "123";
  //   }

  //   try {
  //     var typing = jsonGenerateType(JSON.parse(jsonStr.trim()));
  //     setValid(true);
  //     return typing;
  //   } catch (error) {
  //     setValid(false);
  //     console.log("error", error);
  //   }
  //   return "fff";
  // }, [setValid, setJsonStr]);
  return (
    <ProCard>
      <ProCard title="复制JSON信息" colSpan="50%">
        <Input.TextArea
          style={{ width: "100%", height: 400 }}
          onChange={(e) => onCodeChange(e.target.value)}
        />
      </ProCard>
      <ProCard title="类型定义" extra={<Button disabled={valid === false}>复制</Button>}>
        <Input.TextArea
          style={{ width: "100%", height: 400 }}
          readOnly
          value={typing}
        />
      </ProCard>
    </ProCard>
  );
};
