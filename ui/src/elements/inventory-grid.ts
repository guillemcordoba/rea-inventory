import { ApolloClient, gql } from '@apollo/client/core';
import { html, LitElement, property } from 'lit-element';
import { sharedStyles } from '../sharedStyles';
import { EconomicResource } from '@valueflows/vf-graphql';
import { LIST_ECONOMIC_RESOURCES } from '../graphql/queries';
import { BaseElement } from '@holochain-open-dev/common';
import { CircularProgress } from 'scoped-material-components/mwc-circular-progress';

export abstract class InventoryGrid extends BaseElement {
  /** Public attributes */

  @property({ type: Boolean }) _loading: boolean = true;
  @property({ type: Array }) _resources: Array<EconomicResource> = [];

  /** Dependencies */
  abstract get _apolloClient(): ApolloClient<any>;

  /** Private properties */

  static styles = sharedStyles;

  async firstUpdated() {
    const result = await this._apolloClient.query({
      query: LIST_ECONOMIC_RESOURCES,
    });

    this._resources = result.data.economicResources;
    this._loading = false;
  }

  renderResourceGrid() {
    return html`
      <vaadin-grid .items=${this._resources}>
        <vaadin-grid-column path="name" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          path="accountingQuantity"
          text-align="end"
          width="120px"
          flex-grow="0"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  render() {
    if (this._loading)
      return html`<mwc-circular-progress
        indeterminate
      ></mwc-circular-progress>`;

    return this.renderResourceGrid();
  }

  getScopedElements() {
    return { 'mwc-circular-progress': CircularProgress };
  }
}
