import {
  Dimensions, FlatList, Platform, View, StyleSheet,
} from 'react-native';
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
import { FAnnouncementCard } from 'components/Scoped/Announcement/Card/FAnnouncementCard';
import { getUserAnnouncementsService } from 'services/announcement/getUserAnnouncements.service';

export const AnnouncementsList = ({ isMe, onlyActive = false, onlyFavorites = false }) => {
  const [
    params,
    setParams,
  ] = useState({
    pageSize: 8,
    offset: 0,
    onlyActive,
    onlyFavorites,
  });

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
      if (isMe) {
        const res = await getMyAnnouncementsService(params);
        setAnnouncements([...announcements, res.data]);
      } else {
        const res = await getUserAnnouncementsService(1, params);
        setAnnouncements(res.data);
      }
    } catch {
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnd = () => {
    setParams(
      (prevState) => ({
        pageSize: prevState.pageSize + 8,
        offset: prevState.offset + 8,
        onlyActive: prevState.onlyActive,
        onlyFavorites: prevState.onlyFavorites,
      }),
    );
    fetchAnnouncements();
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
            title={isMe ? locales.YOU_DONT_HAVE_ANY_ANNOUNCEMENTS_YET : locales.USER_DONT_HAVE_ANY_ANNOUNCEMENTS_YET}
          />
        </View>
      );
    }
  };

  return (
    <>
      {isLoading && (
        <FSpinner style={{
          backgroundColor: 'transparent',
        }}
        />
      )}
      {drawNoAnnouncementInfo()}
      {drawErrorModal()}
      <View style={{
        height: Dimensions.get('screen').height,
        backgroundColor: colors.WHITE,
        paddingVertical: sizes.PADDING_30,
        paddingHorizontal: sizes.PADDING_5,
      }}
      >
        <FlatList
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
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
