import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import placements from 'themes/placements';

const style = {
  main: {
    flex: 1,
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
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
