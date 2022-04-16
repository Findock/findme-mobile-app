import { FModal } from 'components/Composition/FModal';
import locales from 'constants/locales';
import modalTypes from 'constants/components/modalTypes';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useErrorModal = (goBack = false, goBackTo = '') => {
  const navigation = useNavigation();
  const [
    showErrorModal,
    setShowErrorModal,
  ] = useState(false);

  const onContinue = () => {
    if (goBack) return navigation.goBack();
    if (goBackTo) return navigation.navigate(goBackTo);
  };

  const drawErrorModal = () => (
    <FModal
      title={locales.SOMETHING_WENT_WRONG}
      type={modalTypes.INFO_MODAL}
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
