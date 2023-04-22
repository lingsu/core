import { PROPERTIES_KEY } from "../../index";
import get from "lodash/get";
import { FieldProps } from "../../typing";
import getTemplate from "../../utils/getTemplate";
import orderProperties from "../../utils/orderProperties";
import SchemaField from "./SchemaField";

export default (props: FieldProps) => {
  const { schema: rawSchema, name, registry } = props;


  const { properties: schemaProperties = {} } = rawSchema;

  const title = rawSchema.title ?? name;
  const description = rawSchema.description;
  let orderedProperties: string[];

  try {
    const properties = Object.keys(schemaProperties);
    orderedProperties = orderProperties(properties);
  } catch (err) {
    return (
      <div>
        <p className='config-error' style={{ color: 'red' }}>
          error
        </p>
        <pre>{JSON.stringify(rawSchema)}</pre>
      </div>
    );
  }

  const Template = getTemplate("ObjectFieldTemplate", registry);

  const templateProps = {
    schema: rawSchema,
    properties: orderedProperties.map(name => {
      return {
        content: (
          <SchemaField
            key={name}
            name={name}
            schema={get(rawSchema, [PROPERTIES_KEY, name], {})}
            // required={this.isRequired(name)}
            // schema={get(schema, [PROPERTIES_KEY, name], {})}
            // uiSchema={fieldUiSchema}
            // errorSchema={get(errorSchema, name)}
            // idSchema={fieldIdSchema}
            // idPrefix={idPrefix}
            // idSeparator={idSeparator}
            // formData={get(formData, name)}
            // formContext={formContext}
            // wasPropertyKeyModified={this.state.wasPropertyKeyModified}
            // onKeyChange={this.onKeyChange(name)}
            // onChange={this.onPropertyChange(name, addedByAdditionalProperties)}
            // onBlur={onBlur}
            // onFocus={onFocus}
            registry={registry}
            // disabled={disabled}
            // readonly={readonly}
            // hideError={hideError}
            // onDropPropertyClick={this.onDropPropertyClick}
          />
        ),
      }
    }),
    // formData,
    // formContext,
    registry,
  };
  return <Template {...templateProps} />;
};
