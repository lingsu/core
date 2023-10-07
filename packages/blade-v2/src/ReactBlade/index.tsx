import { FC, PropsWithChildren } from "react";
import Wrapper from "./Wrapper";
import { BladeConfig } from "../typing";
import StoreUpdater from "../StoreUpdater";

const ReactBlade: FC<PropsWithChildren<Partial<BladeConfig>>> = ({
  title,
  logo,
  indexTitle,
  clientId,
  clientSecret,
  tenantMode,
  tenantId,
  captchaMode,
  switchMode,
  lockPage,
  apiUrl,
  uploadUrl,
  tokenTime,
  tokenHeader,
  statusWhiteList,
  isFirstPage,
  fistPage,
  menu,
  authUrl,
  flowDesignUrl,
  reportUrl,
  children,
}) => {
  return (
    <Wrapper>
      {children}
      <StoreUpdater
        title={title}
        logo={logo}
        indexTitle={indexTitle}
        clientId={clientId}
        clientSecret={clientSecret}
        tenantMode={tenantMode}
        tenantId={tenantId}
        captchaMode={captchaMode}
        switchMode={switchMode}
        lockPage={lockPage}
        apiUrl={apiUrl}
        uploadUrl={uploadUrl}
        tokenTime={tokenTime}
        tokenHeader={tokenHeader}
        statusWhiteList={statusWhiteList}
        isFirstPage={isFirstPage}
        fistPage={fistPage}
        menu={menu}
        authUrl={authUrl}
        flowDesignUrl={flowDesignUrl}
        reportUrl={reportUrl}
      ></StoreUpdater>
    </Wrapper>
  );
};
export default ReactBlade;
