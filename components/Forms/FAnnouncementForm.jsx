import { FInput } from 'components/Inputs/FInput';
import { FTileImageInput } from 'components/Inputs/FTileImageInput';
import { FMultiSelectInputWithSelectedOptions } from 'components/Inputs/MultiSelect/FMultiSelectInputWithSelectedOptions';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import placeholders from 'constants/components/inputs/placeholders';
import locales from 'constants/locales';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import { getDistinctiveFeaturesService } from 'services/announcement/getDistinctiveFeatures.service';
import icons from 'themes/icons';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { FKeyboardWrapper } from 'components/Utils/FKeyboardWrapper';

export const FAnnouncementForm = () => {
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    distinctiveFeatures,
    setDistinctiveFeatures,
  ] = useState([]);

  useEffect(() => {
    fetchDistinctiveFeatures();
  }, []);

  const fetchDistinctiveFeatures = async () => {
    try {
      setLoading(true);
      const res = await getDistinctiveFeaturesService();
      setDistinctiveFeatures(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const drawImageInputs = () => {
    const imageInputs = [];
    for (let i = 0; i < 6; i++) {
      imageInputs.push(
        <View
          key={i}
          style={{
            paddingLeft: i === 0 ? 0 : sizes.PADDING_5,
            paddingRight: i === 5 ? 0 : sizes.PADDING_5,
            ...styles.imageInputContainer,
          }}
        >
          <FTileImageInput
            width={sizes.WIDTH_140}
            height={sizes.HEIGHT_140}
          />
        </View>,
      );
    }
    return imageInputs;
  };
  return (
    <FKeyboardWrapper>
      <View>
        <ScrollView
          style={styles.imageInputsContainer}
          horizontal
        >
          {drawImageInputs()}
        </ScrollView>
        <FInput
          iconPlacement={placements.LEFT}
          icon={icons.PAW}
          placeholder={placeholders.ANNOUNCEMENT_TITLE}
        />
        <FAnnouncementHeading title={locales.DISTINCTIVE_FEATURES} />
        <FMultiSelectInputWithSelectedOptions options={distinctiveFeatures} />
      </View>
    </FKeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  imageInputsContainer: {
    flexDirection: 'row',
    marginBottom: sizes.MARGIN_20,
  },
  imageInputContainer: {
    padding: sizes.PADDING_5,
  },
});
