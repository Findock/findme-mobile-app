import { FSwipeButton } from 'components/Buttons/FSwipeButton/FSwipeButton';
import { FModal } from 'components/Composition/FModal';
import { FSpinner } from 'components/Composition/FSpinner';
import { FLoginHistoryListItem } from 'components/Scoped/LoginHistory/FLoginHistoryListItem';
import locales from 'constants/locales';
import modalTypes from 'constants/components/modals/modalTypes';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import sizes from 'themes/sizes';
import swipeButtonCellActionTypes from 'constants/components/swipeButtonCellActionTypes';
import swipeButtonCellTypes from 'constants/components/swipeButtonCellTypes';
import { getMyAuthTokensService } from 'services/auth/getMyAuthTokens.service';
import { deleteAuthTokenService } from 'services/auth/deleteAuthToken.service';
import { useErrorModal } from 'hooks/useErrorModal';

export const FLoginHistoryList = () => {
  const [
    isLoading,
    setIsLoading,
  ] = useState(false);
  const [
    isDeleteAuthTokenErrorModalShown,
    setIsDeleteAuthTokenErrorModalShown,
  ] = useState(false);
  const [
    myAuthTokens,
    setMyAuthTokens,
  ] = useState([]);
  const {
    setShowErrorModal,
    drawErrorModal,
  } = useErrorModal(true);

  useEffect(() => {
    fetchMyAuthTokens();
  }, []);

  const fetchMyAuthTokens = async () => {
    try {
      setIsLoading(true);
      const res = await getMyAuthTokensService();
      setMyAuthTokens([...res.data.authTokens]);
    } catch {
      setShowErrorModal(true);
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
    if (item.active) {
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
    }
    return (
      <FLoginHistoryListItem
        key={item.id}
        date={item.lastUse}
        deviceName={item.deviceName}
        isActiveSession={item.active}
        location={item.localizationDescription === 'unknown' ? locales.UNKNOWN_LOCALIZATION : item.localizationDescription}
      />
    );
  };
  return (
    <>
      {isLoading && <FSpinner style={{ paddingTop: sizes.PADDING_30 }} />}
      {drawErrorModal()}
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
        contentContainerStyle={{
          paddingBottom: sizes.PADDING_20,
        }}
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
