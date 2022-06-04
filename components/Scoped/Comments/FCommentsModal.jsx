import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FComment } from 'components/Scoped/Comments/FComment';
import { FSpinner } from 'components/Composition/FSpinner';
import { useSelector } from 'react-redux';
import { FCommentsModalHeader } from 'components/Scoped/Comments/FCommentsModalHeader';
import colors from 'themes/colors';

export const FCommentsModal = () => {
  const route = useRoute();
  const me = useSelector((state) => state.me.me);
  const comments = useSelector((state) => state.comments.comments);

  const [
    announcementId,
    setAnnouncementId,
  ] = useState(null);

  useEffect(() => {
    if (route.params.announcementId) {
      setAnnouncementId(route.params.announcementId);
    }
  }, [route.params.announcementId]);

  const drawComment = ({ item }) => (
    <FComment
      isUserCreator={route.params.isUserCreator}
      isCommentCreator={item.creator.id === me.id}
      createMode={false}
      announcementId={announcementId}
      commentedAnnouncement={item}
    />
  );

  if (!announcementId) return <FSpinner />;
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.WHITE,
    }}
    >
      <FCommentsModalHeader commentsAmount={comments.length} />
      <FComment
        isCommentCreator
        isUserCreator={route.params.isUserCreator}
        createMode
        announcementId={announcementId}
      />
      <FlatList
        data={comments}
        renderItem={drawComment}
      />
    </View>
  );
};
