import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HorizontalAds extends Component {
  googleInit = null;

  componentDidMount() {
    const { timeout } = this.props;
    this.googleInit = setTimeout(() => {
      if (typeof window !== 'undefined')
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, timeout);
  }

  componentWillUnmount() {
    if (this.googleInit) clearTimeout(this.googleInit);
  }

  render() {
    const { classNames, slot, googleAdId, style, format } = this.props;
    return (
      <div className={classNames} >
        <ins
          className="adsbygoogle  "
          style={style || { display: 'flex', textAlign: "center" }}
          data-ad-client={googleAdId}
          data-ad-slot={slot}
          data-ad-test="on"
          data-ad-format={format || "auto"}
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}
HorizontalAds.propTypes = {
  classNames: PropTypes.string,
  slot: PropTypes.string,
  timeout: PropTypes.number,
  googleAdId: PropTypes.string,
};
HorizontalAds.defaultProps = {
  classNames: '',
  timeout: 200,
};
export default HorizontalAds;

