import { Schema, StrictSchema } from "../typing"

export type FormProps<S extends StrictSchema = Schema> = {
    schema: S
}
export default (props: FormProps) => {
    return <div>
        
    </div>
}