/* eslint-disable max-len */
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
import { useIsFocused } from '@react-navigation/native';
import AnnouncementSortingModeEnum from 'enums/AnnouncementSortingModeEnum';
import { setSelectedOptions } from 'store/multi-select/multiSelectSlice';
import { setUpdatedAnnouncement } from 'store/announcement/announcementSlice';

export const FAnnouncementsList = ({
  isMe,
  userId,
  onlyActive = false,
  onlyFavorites,
  horizontal,
  getAll,
  numColumns,
  filters = {
    categoriesIds: [],
    distinctiveFeaturesIds: [],
    type: null,
    coatColorsIds: [],
    genders: [],
  },
  sortingMode = AnnouncementSortingModeEnum.BY_NEWEST,
  textQuery,
  locationQuery,
  locationThreshold = 1,
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
    ...filters,
    sortingMode,
    textQuery,
    locationQuery,
    locationThreshold,
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
    dispatch(setSelectedOptions([]));
    dispatch(setUpdatedAnnouncement(null));
  }, []);

  useEffect(() => {
    if (getAll) {
      setAnnouncements([]);
      setEndReached(false);
      updateParamsHandler();
    }
  }, [filters]);

  useEffect(() => {
    if (getAll) {
      setAnnouncements([]);
      setEndReached(false);
      updateParamsHandler();
    }
  }, [textQuery]);

  useEffect(() => {
    if (getAll) {
      setAnnouncements([]);
      setEndReached(false);
      updateParamsHandler();
    }
  }, [locationQuery]);

  useEffect(() => {
    if (getAll) {
      setAnnouncements([]);
      setEndReached(false);
      updateParamsHandler();
    }
  }, [sortingMode]);

  useEffect(() => {
    if (getAll) {
      setAnnouncements([]);
      setEndReached(false);
      updateParamsHandler();
    }
  }, [locationThreshold]);

  useEffect(() => {
    if (params.onlyFavorites) {
      if (updatedAnnouncement) setIsLoading(true);
      else setIsLoading(false);
    }
  }, [updatedAnnouncement]);

  useEffect(() => {
    refreshAnnouncementHandler(false);
  }, [isFocused]);

  useEffect(() => {
    if (updatedAnnouncement) refreshAnnouncementHandler(true);
  }, [updatedAnnouncement]);

  const updateParamsHandler = () => {
    setParams({
      ...params,
      pageSize: 8,
      offset: 0,
      ...filters,
      sortingMode,
      textQuery,
      locationQuery,
      locationThreshold,
    });
  };

  const refreshAnnouncementHandler = (onUpdatedAnnouncementChange = false) => {
    if (updatedAnnouncement) {
      const updatedAnnouncementIndex = announcements.findIndex((x) => x.id === updatedAnnouncement.id);
      const newAnnouncemnts = [...announcements];
      if (!onUpdatedAnnouncementChange && params.onlyFavorites && announcements[updatedAnnouncementIndex].isInFavorites !== updatedAnnouncement.isInFavorites) newAnnouncemnts.splice(updatedAnnouncementIndex, 1);
      else if (announcements[updatedAnnouncementIndex]?.status !== updatedAnnouncement?.status) newAnnouncemnts.splice(updatedAnnouncementIndex, 1, { ...updatedAnnouncement });
      else if (!onUpdatedAnnouncementChange) newAnnouncemnts.splice(updatedAnnouncementIndex, 1, { ...updatedAnnouncement });
      setAnnouncements([...newAnnouncemnts]);
      setTimeout(() => {
        dispatch(setUpdatedAnnouncement(null));
      }, 5000);
    }
  };
  const fetchAnnouncements = async () => {
    try {
      let res;
      if (getAll) {
        res = await searchAnnouncementsService(params);
      } else {
        if (onlyFavorites) res = await searchAnnouncementsService(params);

        if (isMe) res = await getMyAnnouncementsService(params);

        if (userId) {
          res = await getUserAnnouncementsService(userId, params);
          if (setUserAnnouncementsLength) setUserAnnouncementsLength(announcements.length + res.data.length);
        }
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
    if (!endReached) {
      setParams(
        (prevValue) => ({
          pageSize: prevValue.pageSize,
          offset: prevValue.offset + 8,
          onlyActive: prevValue.onlyActive,
          onlyFavorites: prevValue.onlyFavorites,
          ...filters,
          sortingMode: prevValue.sortingMode,
          textQuery: prevValue.textQuery,
          locationQuery: prevValue.locationQuery,
          locationThreshold: prevValue.locationThreshold,
        }),
      );
    }
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
    if (getAll) {
      return locales.ANNOUNCEMENTS_NOT_FOUND;
    }
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
  onlyFavorites: PropTypes.bool.isRequired,
  horizontal: PropTypes.bool.isRequired,
  numColumns: PropTypes.number.isRequired,
  setUserAnnouncementsLength: PropTypes.func,
  getAll: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    categoriesIds: PropTypes.arrayOf(PropTypes.number),
    distinctiveFeaturesIds: PropTypes.arrayOf(PropTypes.number),
    type: PropTypes.string,
    coatColorsIds: PropTypes.arrayOf(PropTypes.number),
    genders: PropTypes.arrayOf(PropTypes.string),
  }),
  sortingMode: PropTypes.string,
  textQuery: PropTypes.string,
  locationQuery: PropTypes.string,
};
