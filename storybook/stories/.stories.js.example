import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import ExampleComponent from '../../components/ExampleComponent';
import CenterView from './CenterView';

const colorOptions = [
  'red',
  'blue',
  'black'
]

storiesOf('ExampleComponent', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('ExampleComponent - ExampleText', () => (
    <ExampleComponent text={text('title', 'ExampleText')} color={select('color', colorOptions, 'blue')} />
  ))
  .add('ExampleComponent - ExampleText [RED]', () => (
    <ExampleComponent text={text('title', 'ExampleText')} color={select('color', colorOptions, 'red')} />
  ))
