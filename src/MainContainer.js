import React, { Component } from 'react';

export class MainContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
          </Panel>
        </div>
        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Traffic Source">
              <Range/>
            </PanelHeader>
          </Panel>
        </div>
      </div>
    );
  }
}
