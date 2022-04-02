import { storiesOf } from '@storybook/react-native';
import { CenterView } from 'storybook/utils/CenterView';
import { TextSwitch } from 'components/Inputs/TextSwitch';
import { useState } from 'react';

storiesOf('TextSwitch', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('BasicTextSwitch', () => {
    const [
      dataForm,
      setDataForm,
    ] = useState();
    return (
      <TextSwitch
        setDataForm={setDataForm}
        dataForm={dataForm}
      />
    );
  });
