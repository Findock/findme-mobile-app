import { FDefaultLayout } from 'layouts/FDefault.layout';
import React from 'react';
import { FAnnouncementCard } from 'components/Composition/FAnnouncementCard';
import { View } from 'react-native';

const data = {
  title: 'Zaginął puszek',
  locationName: 'Kraków, Polska',
  date: '12.12.2021',
  photoURL: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
};

export const FAnnouncementCardPreview = () => (
  <FDefaultLayout isAlwaysScrollable>
    <View style={{
      flexDirection: 'row',
      alignSelf: 'center',
    }}
    >
      <FAnnouncementCard
        width={180}
        height={250}
        data={data}
      />
      <FAnnouncementCard
        width={180}
        height={250}
        data={data}
      />
    </View>
    <View style={{
      flexDirection: 'row',
      alignSelf: 'center',
    }}
    >
      <FAnnouncementCard
        width={160}
        height={250}
        data={data}
      />
      <FAnnouncementCard
        width={160}
        height={250}
        data={data}
      />
    </View>
  </FDefaultLayout>
);
