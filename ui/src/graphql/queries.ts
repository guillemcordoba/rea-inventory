import { gql } from '@apollo/client/core';

export const LIST_ECONOMIC_RESOURCES = gql`
  query ListEconomicResources {
    economicResources() {
      id
      name
      accountingQuantity
    }
  }
`;

export const CREATE_ECONOMIC_RESOURCES = gql`
  mutation CreateEconomicResource(
    $event: EconomicEventCreateParams!
    $newInventoriedResource: EconomicResourceCreateParams!
  ) {
    createEconomicEvent(
      event: $event
      newInventoriedResource: $newInventoriedResource
    ) {
      economicResource {
        id
        name
        accountingQuantity
      }
    }
  }
`;
