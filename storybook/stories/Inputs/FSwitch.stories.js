import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import colors from 'themes/colors';
import FSwitch from 'components/Inputs/FSwitch';

storiesOf('FSwitch', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FSwitch', () => (
    <FSwitch
      colorOn={colors.SUCCESS}
      isDisabled={false}
    />
  ))
  .add('FSwitchDisabled', () => (
    <FSwitch
      colorOn={colors.SUCCESS}
      isDisabled
    />
  ));
