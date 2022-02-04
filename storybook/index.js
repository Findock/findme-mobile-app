import {
  getStorybookUI, configure, addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

// Import addons
import './rn-addons';

// Global knobs decorator
addDecorator(withKnobs);

// Load all stories
configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  tabOpen: -1,
});

export default StorybookUIRoot;
