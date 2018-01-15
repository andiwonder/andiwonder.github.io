import React, { Component } from 'react';

export class Panel extends Component {
  render() {
    return (
      <div className="bg">
        {this.props.children}
      </div>
    );
  }
}

class PanelHeader extends Component {
  render() {
    return (
      <div className="panel-header">
          <div className="pull-left panel-title">{this.props.title}</div>
          <div className="pull-right line-height-30">
              {this.props.children}
          </div>
      </div>
    );
  }
}
