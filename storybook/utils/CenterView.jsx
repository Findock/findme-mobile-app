import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const style = {
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

export default function CenterView({ children }) {
  return <View style={style.main}>{children}</View>;
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
