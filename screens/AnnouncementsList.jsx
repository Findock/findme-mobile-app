import {
  Dimensions, FlatList, View, StyleSheet, ActivityIndicator, Platform,
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
import PropTypes from 'prop-types';

export const AnnouncementsList = ({
  isMe,
  userId,
  onlyActive = false,
  onlyFavorites = false,
  horizontal = false,
  numColumns,
  pullData,
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
    endReached,
    setEndReached,
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
        if (res.data.length < 8) {
          setEndReached(true);
        }
      }
      if (userId) {
        const res = await getUserAnnouncementsService(userId, params);
        setAnnouncements([...announcements, ...res.data]);
        pullData(announcements);
        if (res.data.length < 8) {
          setEndReached(true);
        }
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
    <View style={{ flexBasis: sizes.WIDTH_50 }}>
      <FAnnouncementCard
        width={horizontal ? sizes.WIDTH_180 : sizes.WIDTH_FULL}
        height={sizes.HEIGHT_280}
        data={item}
      />
    </View>
  );

  const getInfoTitle = () => {
    if (onlyFavorites) {
      return locales.NO_FOLLOWED_ANNOUNCEMENTS;
    }
    if (isMe) {
      return locales.YOU_DONT_HAVE_ANY_ANNOUNCEMENTS_YET;
    }
    return locales.USER_DONT_HAVE_ANY_ANNOUNCEMENTS_YET;
  };

  const drawNoAnnouncementInfo = () => {
    if (isLoading === false && announcements.length === 0) {
      return (
        <View style={horizontal ? styles.containerHorizontal : styles.containerVertical}>
          <FHeading
            align={placements.CENTER}
            size={fonts.HEADING_SMALL}
            color={colors.DARK_GRAY}
            weight={fonts.HEADING_WEIGHT_REGULAR}
            title={getInfoTitle()}
          />
        </View>
      );
    }
  };
  const renderActivityIndicator = () => (!endReached
    ? (
      <ActivityIndicator
        animating
        size={Platform.OS === 'ios' ? 'large' : sizes.ICON_30}
        color={colors.GRAY}
        style={horizontal ? styles.containerHorizontal : ''}
      />
    ) : null);

  return (
    (announcements.length === 0 && isLoading) ? <FSpinner />
      : (
        <>
          {drawNoAnnouncementInfo()}
          {drawErrorModal()}
          <View style={horizontal ? styles.containerHorizontal : styles.containerVertical}>
            <FlatList
              horizontal={horizontal}
              onEndReached={handleEnd}
              onEndReachedThreshold={0}
              ListFooterComponent={renderActivityIndicator}
              data={announcements}
              renderItem={drawAnnouncementCard}
              contentContainerStyle={horizontal ? '' : styles.verticalSeparator}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
              scrollEnabled
            />
          </View>
        </>
      ));
};

const styles = StyleSheet.create({
  containerHorizontal: {
    paddingVertical: sizes.PADDING_20,
    alignItems: placements.CENTER,
    flex: 1,
  },
  containerVertical: {
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingVertical: sizes.PADDING_30,
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    flex: 1,
  },
  verticalSeparator: {
    paddingBottom: Platform.OS ? sizes.PADDING_80 : 50,
  },
});

AnnouncementsList.propTypes = {
  isMe: PropTypes.bool,
  userId: PropTypes.number,
  onlyActive: PropTypes.bool,
  onlyFavorites: PropTypes.bool,
  horizontal: PropTypes.bool,
  numColumns: PropTypes.number,
  pullData: PropTypes.func,
};
