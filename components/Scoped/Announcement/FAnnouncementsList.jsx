import {
  FlatList, View, StyleSheet, ActivityIndicator, Platform,
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
import { searchAnnouncementsService } from 'services/announcement/searchAnnouncements.service';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdatedAnnouncement } from 'store/announcement/announcementSlice';
import { useIsFocused } from '@react-navigation/native';

export const FAnnouncementsList = ({
  isMe,
  userId,
  onlyActive = false,
  onlyFavorites = false,
  horizontal = false,
  numColumns,
  setUserAnnouncementsLength,
}) => {
  const updatedAnnouncement = useSelector((state) => state.announcement.updatedAnnouncement);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
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
  } = useErrorModal(true);

  useEffect(() => {
    fetchAnnouncements();
  }, [params]);

  useEffect(() => {
    if (updatedAnnouncement && isFocused) {
      const updatedAnnouncementIndex = announcements.findIndex((x) => x.id === updatedAnnouncement.id);
      const newAnnouncemnts = [...announcements];
      newAnnouncemnts.splice(updatedAnnouncementIndex, 1, updatedAnnouncement);
      setAnnouncements([...newAnnouncemnts]);
      dispatch(setUpdatedAnnouncement(null));
    }
  }, [isFocused]);

  const fetchAnnouncements = async () => {
    try {
      let res;
      if (onlyFavorites) res = await searchAnnouncementsService(params);

      if (isMe) res = await getMyAnnouncementsService(params);

      if (userId) {
        res = await getUserAnnouncementsService(userId, params);
        if (setUserAnnouncementsLength) setUserAnnouncementsLength(announcements.length + res.data.length);
      }
      setAnnouncements([...announcements, ...res.data]);
      if (res.data.length < 8) {
        setEndReached(true);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setShowErrorModal(true);
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

  const drawAnnouncementCard = ({ item, index }) => (
    <View
      style={{ flexBasis: sizes.BASIS_50_PERCENTAGES }}
      key={item.id}
    >
      <FAnnouncementCard
        width={horizontal ? sizes.WIDTH_180 : sizes.WIDTH_FULL}
        height={sizes.HEIGHT_280}
        data={item}
        style={{
          paddingLeft: index === 0 && horizontal ? sizes.PADDING_1 : sizes.PADDING_5,
          paddingRight: index === announcements.length - 1 && horizontal ? sizes.PADDING_1 : sizes.PADDING_5,
        }}
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
        <View style={horizontal ? [styles.containerHorizontal, styles.centerView] : styles.centerView}>
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
    && (
      <ActivityIndicator
        animating
        size={Platform.OS === 'ios' ? 'large' : sizes.ICON_30}
        color={colors.GRAY}
      />
    ));

  return (
    isLoading ? <FSpinner />
      : (
        <>
          {drawNoAnnouncementInfo()}
          {drawErrorModal()}
          <View style={horizontal ? [styles.containerHorizontal, styles.container] : styles.container}>
            <FlatList
              extraData={announcements}
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
    alignItems: placements.CENTER,
  },
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  centerView: {
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  verticalSeparator: {
    paddingBottom: sizes.PADDING_110,
  },
});

FAnnouncementsList.propTypes = {
  isMe: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  onlyActive: PropTypes.bool,
  onlyFavorites: PropTypes.bool,
  horizontal: PropTypes.bool.isRequired,
  numColumns: PropTypes.number.isRequired,
  setUserAnnouncementsLength: PropTypes.func,
};
