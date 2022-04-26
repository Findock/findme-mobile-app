import {
  Dimensions, FlatList, Platform, View, StyleSheet,
} from 'react-native';
import { FAnnouncementCard } from 'components/Scoped/Announcement/FAnnouncementCard';
import React, { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/useErrorModal';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import { FSpinner } from 'components/Composition/FSpinner';
import { getMyAnnouncementsService } from 'services/announcement/getMyAnnouncements.service';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import locales from 'constants/locales';

export const AnnouncementsList = ({ isMe }) => {
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
      console.log(announcements[0].creator);
      console.log(isMe);
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
  const drawNoAnnouncementInfo = () => {
    if (isLoading === false && announcements.length === 0) {
      return (
        <View style={{
          flex: 5,
          justifyContent: placements.CENTER,
        }}
        >
          <FHeading
            align={placements.CENTER}
            size={fonts.HEADING_NORMAL}
            color={colors.DARK_GRAY}
            weight={fonts.HEADING_WEIGHT_REGULAR}
            title={locales.YOU_DONT_HAVE_ANY_ANNOUNCEMENTS_YET}
          />
        </View>
      );
    }
  };

  return (
    <>
      {isLoading && <FSpinner />}
      {drawErrorModal()}
      <View style={{
        height: Dimensions.get('screen').height,
        backgroundColor: colors.WHITE,
        paddingVertical: sizes.PADDING_30,
        paddingHorizontal: sizes.PADDING_5,
      }}
      >
        {drawNoAnnouncementInfo()}
        <FlatList
          data={announcements}
          renderItem={drawAnnouncementCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.container}
          scrollEnabled
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'android' ? sizes.PADDING_130 : sizes.PADDING_50,
  },
});
