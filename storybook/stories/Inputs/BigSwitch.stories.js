import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import { BigSwitch } from 'components/Inputs/BigSwitch';
import { useState } from 'react';

storiesOf('BigSwitch', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('BasicBigSwitch', () => {
    const [
      value,
      setValue,
    ] = useState('');
    return (
      <BigSwitch
        setValue={setValue}
        labels={['Zagubione', 'Znalezione']}
        value={value}
      />
    );
  });
