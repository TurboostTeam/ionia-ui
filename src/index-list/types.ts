import { type OrderDirection } from "@/index-table/order-direction";

export interface GraphQLTableOrder<OrderField> {
  field: OrderField;
  direction: OrderDirection;
}

export interface GraphQLTableEdge<Node> {
  node: Node;
  cursor: string;
}

export interface GraphQLTablePageInfo {
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
}

export interface GraphQLTablePagination {
  first?: number;
  last?: number;
  before?: string | null;
  after?: string | null;
}

export interface GraphQLTableValue<OrderField> extends GraphQLTablePagination {
  query?: string;
  orderBy?: GraphQLTableOrder<OrderField>;
}
