import { CenterView } from 'storybook/utils/CenterView';
import { storiesOf } from '@storybook/react-native';
import { select, text } from '@storybook/addon-knobs';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modalTypes';
import { useState } from 'react';

const modalTypesOptions = [
  modalTypes.INFO_MODAL,
  modalTypes.CONFIRM_MODAL,
];

storiesOf('FModal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FModal - info', () => {
    const [
      visible,
      setVisible,
    ] = useState(true);
    return (
      <FModal
        type={select('type', modalTypesOptions, modalTypes.INFO_MODAL)}
        title={text('title', 'Wygląda na to, że masz problem z połączeniem internetowym')}
        visible={visible}
        setVisible={setVisible}
      />
    );
  })
  .add('FModal - confirm', () => {
    const [
      visible,
      setVisible,
    ] = useState(true);
    return (
      <FModal
        type={select('type', modalTypesOptions, modalTypes.CONFIRM_MODAL)}
        title={text('title', 'Czy na pewno chcesz usunąć konto? Ta operacja jest nieodwracalna.')}
        visible={visible}
        setVisible={setVisible}
      />
    );
  });
