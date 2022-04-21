import { FDefaultLayout } from 'layouts/FDefault.layout';
import { View } from 'react-native';
import { FAnnouncementCard } from 'components/Scoped/Announcement/FAnnouncementCard';
import { useEffect, useState } from 'react';
import { useErrorModal } from 'hooks/useErrorModal';
import { getMyAnnouncementsService } from '../services/announcement/getMyAnnouncements.service';

export const YourAnnouncementsScreen = () => {
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
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await getMyAnnouncementsService(true);
      setAnnouncements(res.data);
      console.log(announcements);
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  return (
    <FDefaultLayout>
      <View>
        {drawErrorModal()}
        {announcements.map((announcement) => (
          <FAnnouncementCard
            key={announcement.id}
            width={160}
            height={280}
            data={announcement}
          />
        ))}
      </View>
    </FDefaultLayout>
  );
};
