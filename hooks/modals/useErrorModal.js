import { FModal } from 'components/Composition/FModal';
import modalTypes from 'constants/components/modals/modalTypes';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import modalsMessages from 'constants/components/modals/modalsMessages';

export const useErrorModal = (goBack = false, goBackTo = '') => {
  const navigation = useNavigation();
  const [
    showErrorModal,
    setShowErrorModal,
  ] = useState(false);

  const onContinue = () => {
    if (goBack && navigation.canGoBack()) return navigation.goBack();
    if (goBackTo) return navigation.navigate(goBackTo);
  };

  const drawErrorModal = () => (
    <FModal
      title={modalsMessages.SOMETHING_WENT_WRONG}
      type={modalTypes.INFO_ERROR_MODAL}
      setVisible={setShowErrorModal}
      visible={showErrorModal}
      onContinue={onContinue}
    />
  );
  return {
    setShowErrorModal,
    drawErrorModal,
  };
};
