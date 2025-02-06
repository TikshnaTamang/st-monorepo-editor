export interface Attribute {
  name: string;
  value: string;
}

export interface ElementNode {
  contain: string | ElementNode[];
  attributes: Attribute[]; 
  style: string; 
  tag: string; 
  children?: ElementNode[];
}
