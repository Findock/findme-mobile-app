import { useNavigation } from '@react-navigation/native';
import { FModal } from 'components/Composition/FModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { FLoginHistoryListItem } from 'components/Scoped/LoginHistory/FLoginHistoryListItem';
import locales from 'constants/locales';
import modalTypes from 'constants/modalTypes';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getMyAuthTokensService } from 'services/getMyAuthTokens.service';
import sizes from 'themes/sizes';

export const FLoginHistoryList = () => {
  const navigation = useNavigation();
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);
  const [
    isErrorModalShown,
    setIsErrorModalShown,
  ] = useState(false);
  const [
    myAuthTokens,
    setMyAuthTokens,
  ] = useState([]);

  useEffect(() => {
    fetchMyAuthTokens();
  }, []);

  const fetchMyAuthTokens = async () => {
    try {
      setIsLoading(true);
      const res = await getMyAuthTokensService();
      setMyAuthTokens([...res.data.authTokens]);
    } catch {
      setIsErrorModalShown(true);
    } finally {
      setIsLoading(false);
    }
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
    <>
      {isLoading && <FSpinner />}
      {isErrorModalShown && (
        <FModal
          setVisible={setIsErrorModalShown}
          visible={isErrorModalShown}
          type={modalTypes.INFO_MODAL}
          title={locales.SOMETHING_WENT_WRONG}
          onContinue={() => navigation.goBack()}
        />
      )}
      <FlatList
        data={myAuthTokens}
        renderItem={drawMyAuthTokensItems}
        keyExtractor={(item) => item._id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: sizes.WIDTH_FULL,
  },
});
