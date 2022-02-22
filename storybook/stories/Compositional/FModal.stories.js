import { CenterView } from 'storybook/utils/CenterView';
import { storiesOf } from '@storybook/react-native';
import { select, text } from '@storybook/addon-knobs';
import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/modalTypes';

const modalTypesOptions = [
  modalTypes.INFO_MODAL,
  modalTypes.CONFIRM_MODAL,
];

storiesOf('FModal', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FModal - info', () => (
    <FModal
      type={select('type', modalTypesOptions, modalTypes.INFO_MODAL)}
      title={text('title', 'Wygląda na to, że masz problem z połączeniem internetowym')}
    />
  ))
  .add('FModal - confirm', () => (
    <FModal
      type={select('type', modalTypesOptions, modalTypes.CONFIRM_MODAL)}
      title={text('title', 'Czy na pewno chcesz usunąć konto? Ta operacja jest nieodwracalna.')}
    />
  ));
