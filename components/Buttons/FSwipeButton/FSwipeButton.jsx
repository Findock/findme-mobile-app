import { FSwipeButtonCell } from 'components/Buttons/FSwipeButton/FSwipeButtonCell';
import React, { useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';
import sizes from 'themes/sizes';

export const FSwipeButton = ({
  children,
  actions = [],
  rounded,
}) => {
  const swipeRef = useRef();

  const RightSwipeActions = () => actions && actions.map((action, index) => (
    <FSwipeButtonCell
      key={index}
      cellAction={action.cellAction}
      cellType={action.cellType}
      rounded={rounded}
      onActionPress={() => {
        action.onActionPress();
        swipeRef.current.close();
      }}
    />
  ));

  return (
    <Swipeable
      renderRightActions={RightSwipeActions}
      rightThreshold
      containerStyle={{
        paddingBottom: sizes.PADDING_1,
        width: sizes.WIDTH_FULL,
        paddingHorizontal: sizes.PADDING_1,
      }}
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
  rounded: PropTypes.bool.isRequired,
};
