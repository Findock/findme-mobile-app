import { FLoginHistoryListItem } from 'components/Scoped/LoginHistory/FLoginHistoryListItem';
import locales from 'constants/locales';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getMyAuthTokensService } from 'services/getMyAuthTokens.service';

export const FLoginHistoryList = () => {
  const [
    myAuthTokens,
    setMyAuthTokens,
  ] = useState([]);

  useEffect(() => {
    fetchMyAuthTokens();
  }, []);

  const fetchMyAuthTokens = async () => {
    const res = await getMyAuthTokensService();
    setMyAuthTokens([...res.data.authTokens]);
  };

  const drawMyAuthTokensItems = ({ item }) => (
    <FLoginHistoryListItem
      key={item._id}
      date={item.lastUse}
      deviceName={item.deviceName}
      isActiveSession={item.active}
      location={item.localizationDescription === 'unknown' ? locales.UNKNOWN_LOCALIZATION : item.localizationDescription}
    />
  );

  return (
    <FlatList
      data={myAuthTokens}
      renderItem={drawMyAuthTokensItems}
      keyExtractor={(item) => item._id}
    />

  );
};
