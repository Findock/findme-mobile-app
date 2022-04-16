import { FSwipeButtonCell } from 'components/Buttons/FSwipeButton/FSwipeButtonCell';
import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';

export const FSwipeButton = ({ children, actions = [] }) => {
  const swipeRef = useRef();
  const RigthSwipeActions = () => actions && actions.map((action, index) => (
    <FSwipeButtonCell
      key={index}
      cellAction={action.cellAction}
      cellType={action.cellType}
      onActionPress={() => {
        action.onActionPress();
        swipeRef.current.close();
      }}
    />
  ));

  return (
    <Swipeable
      renderRightActions={RigthSwipeActions}
      rightThreshold
      ref={swipeRef}
    >
      {children}
    </Swipeable>
  );
};

FSwipeButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    cellType: PropTypes.string.isRequired,
    cellAction: PropTypes.string.isRequired,
    onActionPress: PropTypes.func.isRequired,
  })).isRequired,
};
