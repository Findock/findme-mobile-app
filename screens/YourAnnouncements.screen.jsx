import { Dimensions, FlatList, View } from 'react-native';
import { FAnnouncementCard } from 'components/Scoped/Announcement/FAnnouncementCard';
import React, { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/useErrorModal';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FSpinner } from 'components/Composition/FSpinner';
import { getMyAnnouncementsService } from '../services/announcement/getMyAnnouncements.service';

export const YourAnnouncementsScreen = () => {
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    announcements,
    setAnnouncements,
  ] = useState([]);

  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const res = await getMyAnnouncementsService(true);
      setAnnouncements(res.data);
    } catch {
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  const drawAnnouncementCard = ({ item }) => (
    <View style={{ flexBasis: '50%' }}>
      <FAnnouncementCard
        width={sizes.WIDTH_FULL}
        height={280}
        data={item}
      />
    </View>
  );

  return (
    <>
      {isLoading && <FSpinner style={{ paddingTop: sizes.PADDING_30 }} />}
      <View style={{
        height: Dimensions.get('screen').height,
        backgroundColor: colors.WHITE,
        paddingVertical: sizes.PADDING_30,
        paddingHorizontal: sizes.PADDING_3,
      }}
      >
        {drawErrorModal()}
        <FlatList
          data={announcements}
          renderItem={drawAnnouncementCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 50 }}
          // it depends on device //
        />
      </View>
    </>
  );
};
