import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

const style = {
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
};

export const CenterView = ({ children }) => <View style={style.main}>{children}</View>;

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
