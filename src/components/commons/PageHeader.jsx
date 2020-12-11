import React from 'react';

class PageHeader extends React.Component {
  render() {
    const { header, classes } = this.props;

    return (
      <h1 className={classes}>{header}</h1>
    );
  }
}

export default PageHeader;
