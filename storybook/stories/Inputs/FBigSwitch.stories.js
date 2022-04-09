import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import { FBigSwitch } from 'components/Inputs/FBigSwitch';
import { useState } from 'react';

storiesOf('FBigSwitch', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FBigSwitch', () => {
    const [
      value,
      setValue,
    ] = useState('lost');
    return (
      <FBigSwitch
        values={['lost', 'found']}
        value={value}
        setValue={setValue}
        labels={['Zagubione', 'Znalezione']}
      />
    );
  });
