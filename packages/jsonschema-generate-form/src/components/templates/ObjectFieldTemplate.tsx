import { ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps } from "../../typing";

export default (props: ObjectFieldTemplateProps) => {
  const {
    // description,
    // disabled,
    // formData,
    // idSchema,
    // onAddClick,
    properties,
    // readonly,
    // registry,
    // required,
    schema,
    // title,
    // uiSchema,
  } = props;


  return (
    <div>
      ObjectFieldTemplate

      {properties.map((prop: ObjectFieldTemplatePropertyType) => prop.content)}

    </div>
  );
};
