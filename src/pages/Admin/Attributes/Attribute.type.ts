export type AttributeValue ={
    id?: number;
    value: string;
}
export type Attribute = {
  id: number ;
  name: string;
   type: "variant" | "spec";
  values: AttributeValue[];
  categories: { id: number; name: string }[];
};
