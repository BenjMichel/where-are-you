import React, { Component, PropTypes } from 'react';
import QrReader from 'react-qr-reader';

class QRScanner extends Component {
  constructor() {
    super();
    this.state = {
      delay: 100,
      result: 'No result',
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    console.log('handleScan', data);
    this.setState({
      result: data,
    });
    this.props.onScan(data);
  }

  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div>
        <QrReader
          delay={this.state.delay}
          previewStyle={previewStyle}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode={'rear'}
          maxImageSize={960}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

QRScanner.propTypes = {
  onScan: PropTypes.func,
};

QRScanner.defaultProps = {
  onScan() {},
};

export default QRScanner;
