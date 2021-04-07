// TODO: change exports to be available for consumer packages

export { CreateInventoryResource } from './elements/create-inventory-resource';
export { InventoryGrid } from './elements/inventory-grid';
export {
  CREATE_ECONOMIC_RESOURCES,
  LIST_ECONOMIC_RESOURCES,
} from './graphql/queries';
export { setupApolloClientElement } from './utils';
