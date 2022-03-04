import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { FLoginHistoryListItem } from 'components/Scoped/LoginHistory/FLoginHistoryListItem';
import { CenterView } from 'storybook/utils/CenterView';

const isActiveSession = false;
const defaultDate = '13.02.22 o 12:11';
const defaultDeviceName = 'IPhone 11 Pro Max';
const defaultLocation = 'Kraków, Poland';

storiesOf('FLoginHistoryListItem', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FLoginHistoryListItem - inactive session', () => (
    <FLoginHistoryListItem
      isActiveSession={boolean('isActiveSession', isActiveSession)}
      date={text('date', defaultDate)}
      deviceName={text('deviceName', defaultDeviceName)}
      location={text('location', defaultLocation)}
    />
  ))
  .add('FLoginHistoryListItem - active session', () => (
    <FLoginHistoryListItem
      isActiveSession={boolean('isActiveSession', true)}
      date={text('date', defaultDate)}
      deviceName={text('deviceName', defaultDeviceName)}
      location={text('location', defaultLocation)}
    />
  ));
