import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';
import { FAnnouncementCard } from 'components/Scoped/Announcement/FAnnouncementCard';
import { View } from 'react-native';

// TESTS ONLY
const data = {
  id: 1,
  title: 'Zaginął puszek! Kraków',
  locationName: 'Kraków, Polska',
  description: 'Lorem ipsum psi psi piesek zaginął dolor sit ame',
  date: '12.12.2021',
  photos: ['https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'],
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
        width={170}
        height={275}
        data={data}
      />
      <FAnnouncementCard
        width={170}
        height={275}
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
        height={275}
        data={data}
      />
      <FAnnouncementCard
        width={150}
        height={275}
        data={data}
      />
    </View>
  </FDefaultLayout>
);
