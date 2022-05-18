import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import icons from 'themes/icons';
import placements from 'themes/placements';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const FSelectInput = ({
  width, options, defaultOption, icon, iconPlacement, rounded, inputSelectId,
}) => {
  const navigation = useNavigation();
  const selectedOption = useSelector((state) => state.select.selectInputs.filter((x) => x.id === inputSelectId)[0]?.selectedOption);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      navigation.push(stackNavigatorNames.SELECT, {
        options,
        defaultOption,
        id: inputSelectId,
      });
    }}
    >
      <View>
        <FInput
          type={inputTypes.TEXT}
          width={width}
          marginBottom={0}
          showSoftInputOnFocus={false}
          onChangeText={() => { }}
          iconPlacement={iconPlacement || placements.RIGHT}
          icon={icon || icons.CHEVRON_DOWN_OUTLINE}
          rounded={rounded}
          value={(selectedOption?.label ? selectedOption.label : defaultOption?.label)}
          caretHidden
          onPress={() => {
            Keyboard.dismiss();
            navigation.push(stackNavigatorNames.SELECT, {
              options,
              defaultOption,
              id: inputSelectId,
            });
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

FSelectInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  defaultOption: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  rounded: PropTypes.bool,
  icon: PropTypes.string,
  iconPlacement: PropTypes.oneOf(['center', 'left', 'right']),
  inputSelectId: PropTypes.string.isRequired,
};
