import { useNavigation } from '@react-navigation/native';
import { FSwipeButton } from 'components/Buttons/FSwipeButton/FSwipeButton';
import { FModal } from 'components/Composition/FModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { FLoginHistoryListItem } from 'components/Scoped/LoginHistory/FLoginHistoryListItem';
import locales from 'constants/locales';
import modalTypes from 'constants/modalTypes';
import swipeButtonCellActionTypes from 'constants/swipeButtonCellActionTypes';
import swipeButtonCellTypes from 'constants/swipeButtonCellTypes';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { deleteAuthTokenService } from 'services/deleteAuthToken.service';
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
    isDeleteAuthTokenErrorModalShown,
    setIsDeleteAuthTokenErrorModalShown,
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

  const deleteAuthTokenById = async (id) => {
    try {
      await deleteAuthTokenService(id);
      await fetchMyAuthTokens();
    } catch (error) {
      setIsDeleteAuthTokenErrorModalShown(true);
    }
  };

  const drawMyAuthTokensItems = ({ item }) => {
    const actions = [
      {
        cellType: swipeButtonCellTypes.ICON_WITH_TEXT,
        cellAction: swipeButtonCellActionTypes.DELETE,
        onActionPress: () => deleteAuthTokenById(item.id),
      },
    ];

    return (
      <FSwipeButton
        actions={actions}
      >
        <FLoginHistoryListItem
          key={item.id}
          date={item.lastUse}
          deviceName={item.deviceName}
          isActiveSession={item.active}
          location={item.localizationDescription === 'unknown' ? locales.UNKNOWN_LOCALIZATION : item.localizationDescription}
        />
      </FSwipeButton>
    );
  };

  return (
    <>
      {isLoading && <FSpinner style={{ paddingTop: sizes.PADDING_30 }} />}
      {isErrorModalShown && (
        <FModal
          setVisible={setIsErrorModalShown}
          visible={isErrorModalShown}
          type={modalTypes.INFO_MODAL}
          title={locales.SOMETHING_WENT_WRONG}
          onContinue={() => navigation.goBack()}
        />
      )}
      {isDeleteAuthTokenErrorModalShown && (
        <FModal
          setVisible={setIsDeleteAuthTokenErrorModalShown}
          visible={isDeleteAuthTokenErrorModalShown}
          type={modalTypes.INFO_MODAL}
          title={locales.SOMETHING_WENT_WRONG}
        />
      )}
      <FlatList
        data={myAuthTokens}
        renderItem={drawMyAuthTokensItems}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => (
          <View style={{
            width: sizes.WIDTH_FULL,
            paddingTop: sizes.PADDING_10,
          }}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: sizes.WIDTH_FULL,
    paddingTop: sizes.PADDING_10,
  },
});
