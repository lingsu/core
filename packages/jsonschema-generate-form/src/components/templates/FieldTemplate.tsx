import { FieldTemplateProps } from "../../typing";

export default (props: FieldTemplateProps) => {
  const { children } = props;
  return (
    <div>
      Field Template:
      {children}
    </div>
  );
};
