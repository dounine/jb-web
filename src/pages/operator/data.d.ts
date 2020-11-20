
declare namespace API {
  export interface Position {
    key: str;
    name: string;
    status: string;
    directions: string[];
    contractTypes: string[];
    icon?: string;
  }
}