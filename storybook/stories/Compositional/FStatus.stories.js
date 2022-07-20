import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FStatus } from 'components/Composition/FStatus';
import statusTypes from 'constants/components/statusTypes';
import { CenterView } from 'storybook/utils/CenterView';

const statusTypesOptions = [statusTypes.ACTIVE];

storiesOf('FStatus', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FStatus - active', () => (
    <FStatus status={select('status', statusTypesOptions, statusTypes.ACTIVE)} />
  ));
