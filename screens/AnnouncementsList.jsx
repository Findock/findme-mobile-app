import {
  Dimensions, FlatList, View, StyleSheet, ActivityIndicator,
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

export const AnnouncementsList = ({
  isMe,
  userId,
  onlyActive = false,
  onlyFavorites = false,
  horizontal = false,
  numColumns,
}) => {
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
  ] = useState(true);
  const [
    isFetching,
    setIsFetching,
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
  }, [params]);

  const fetchAnnouncements = async () => {
    try {
      if (isMe) {
        const res = await getMyAnnouncementsService(params);
        setAnnouncements([...announcements, ...res.data]);
        setIsFetching(true);
      }
      if (userId) {
        const res = await getUserAnnouncementsService(userId, params); // TO DO
        setAnnouncements([...announcements, ...res.data]);
        setIsFetching(true);
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
  };

  const drawAnnouncementCard = ({ item }) => (
    <View style={{ flexBasis: '50%' }}>
      <FAnnouncementCard
        width={horizontal ? sizes.WIDTH_180 : sizes.WIDTH_FULL}
        height={280}
        data={item}
      />
    </View>
  );
  const drawNoAnnouncementInfo = () => {
    if (isLoading === false && announcements.length === 0) {
      return (
        <View style={horizontal ? styles.containerHorizontal : styles.containerVertical}>
          <FHeading
            align={placements.CENTER}
            size={fonts.HEADING_SMALL}
            color={colors.DARK_GRAY}
            weight={fonts.HEADING_WEIGHT_REGULAR}
            title={isMe ? locales.YOU_DONT_HAVE_ANY_ANNOUNCEMENTS_YET : locales.USER_DONT_HAVE_ANY_ANNOUNCEMENTS_YET}
          />
        </View>
      );
    }
  };
  const renderActivityIndicator = () => (isFetching
    ? (
      <ActivityIndicator
        animating
        size="large"
        color="#00ff00"
        style={{
          width: 100,
          margin: 10,
        }}
      />
    ) : null);

  return (
    <>
      {isLoading && (
        <FSpinner />
      )}
      {drawNoAnnouncementInfo()}
      {drawErrorModal()}
      <View style={horizontal ? styles.containerHorizontal : styles.containerVertical}>
        <FlatList
          horizontal={horizontal}
          onEndReached={handleEnd}
          ListFooterComponent={renderActivityIndicator}
          data={announcements}
          renderItem={drawAnnouncementCard}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          scrollEnabled
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    paddingVertical: sizes.PADDING_20,
  },
  containerVertical: {
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingVertical: sizes.PADDING_30,
    justifyContent: placements.CENTER,
  },
});
