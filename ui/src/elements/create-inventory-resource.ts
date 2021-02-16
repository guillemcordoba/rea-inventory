import { ApolloClient, gql } from '@apollo/client/core';
import { html, LitElement, property, query } from 'lit-element';
import { sharedStyles } from '../sharedStyles';
import { BaseElement } from '@holochain-open-dev/common';
import { TextField } from 'scoped-material-components/mwc-textfield';
import { Button } from 'scoped-material-components/mwc-button';
import { CREATE_ECONOMIC_RESOURCES } from '../graphql/queries';

export abstract class CreateInventoryResource extends BaseElement {
  /** Public attributes */

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  @query('#resource-name') _resourceNameField!: TextField;
  @query('#resource-quantity') _resourceQuantityField!: TextField;

  async createResource() {
    const resourceResult = await this._apolloClient.mutate({
      mutation: CREATE_ECONOMIC_RESOURCES,
      variables: {
        event: {
          resourceQuantity: this._resourceQuantityField.value,
        },
        newInventoriedResource: {
          name: this._resourceNameField.value,
        },
      },
    });

  }

  render() {
    return html`
      <div class="column">
        <mwc-textfield id="resource-name" label="name"></mwc-textfield>
        <mwc-textfield
          id="resource-quantity"
          label="quantity"
          type="number"
          min="0"
        ></mwc-textfield>
        <mwc-button
          label="CREATE RESOURCE"
          raised
          .disabled=${this._resourceNameField.value &&
          this._resourceQuantityField.value}
          @click=${() => this.createResource()}
        ></mwc-button>
      </div>
    `;
  }

  static get styles() {
    return sharedStyles;
  }

  getScopedElements() {
    return { 'mwc-textfield': TextField, 'mwc-button': Button };
  }
}
