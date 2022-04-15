import { FMultiSelectInputWithSelectedOptions } from 'components/Inputs/MultiSelect/FMultiSelectInputWithSelectedOptions';
import { FAnnouncementHeading } from 'components/Scoped/Announcement/FAnnouncementHeading';
import locales from 'constants/locales';
import { useEffect } from 'react';
import { View } from 'react-native';
import { searchDistinctiveFeatureService } from 'services/announcement/searchDistinctiveFeature.service';
import { useDispatch, useSelector } from 'react-redux';
import { setOptions } from 'store/multi-select/multiSelectSlice';

export const FDistinctiveFeaturesMultiSelectInput = () => {
  const searchQuery = useSelector((state) => state.multiSelect.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDistinctiveFeatures();
  }, [searchQuery]);

  const fetchDistinctiveFeatures = async () => {
    const res = await searchDistinctiveFeatureService(searchQuery);
    dispatch(setOptions(res.data));
  };

  return (
    <View>
      <FAnnouncementHeading title={locales.DISTINCTIVE_FEATURES} />
      <FMultiSelectInputWithSelectedOptions />
    </View>
  );
};
