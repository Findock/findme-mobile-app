import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';
import { FAnnouncementCard } from 'components/Composition/FAnnouncementCard';
import { View } from 'react-native';

// TESTS ONLY
const data = {
  title: 'Zaginął puszek! Kraków',
  locationName: 'Kraków, Polska',
  description: 'Lorem ipsum psi psi piesek zaginął dolor sit ame',
  date: '12.12.2021',
  photoURL: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
};

export const FAnnouncementCardPreview = () => (
  <FDefaultLayout
    isAlwaysScrollable
  >
    <View style={{
      flexDirection: 'row',
      alignSelf: 'center',
      flex: 1,
    }}
    >
      <FAnnouncementCard
        width={180}
        height={300}
        data={data}
      />
      <FAnnouncementCard
        width={160}
        height={260}
        data={data}
      />
    </View>
    <View style={{
      flexDirection: 'row',
      alignSelf: 'center',
      flex: 1,
    }}
    >
      <FAnnouncementCard
        width={150}
        height={400}
        data={data}
      />
      <FAnnouncementCard
        width={140}
        height={260}
        data={data}
      />
    </View>
  </FDefaultLayout>
);