import { DatavConfig } from "../../typing";

type MainColorBlockProps = {} & DatavConfig;

export default ({ props, dataConfig }: MainColorBlockProps) => {
  const {
    content,
    ellipsis,
    textAlign,
    textStyle,
    urlConfig,
    writingMode,
    letterSpacing,
    backgroundStyle,
  } = props;

  return <span style={{
  }}>
    {content}
  </span>;
};
