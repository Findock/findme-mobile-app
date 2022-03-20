import { storiesOf } from '@storybook/react-native';
import { FCard } from 'components/Composition/FCard';
import { CenterView } from 'storybook/utils/CenterView';
import sizes from 'themes/sizes';
import { number } from '@storybook/addon-knobs';
import { Text } from 'react-native';

storiesOf('FCard', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('FCard', () => {
    const children = () => (
      <Text>Jakiś tam tekst</Text>
    );
    return (
      <FCard
        width={sizes.WIDTH_FULL}
        paddingHorizontal={number('paddingHorizontal', sizes.PADDING_20)}
        paddingVertical={number('paddingVertical', sizes.PADDING_20)}
      >
        {children()}
      </FCard>
    );
  });
