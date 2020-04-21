import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import RouteItem from './RouteItem';

export default function RoutesList({routes, onRoutePress}) {
  const renderItemList = useCallback(
    ({item}) => {
      return (
        <RouteItem
          route={item}
          onPress={() => {
            onRoutePress(item);
          }}
        />
      );
    },
    [onRoutePress],
  );

  return <FlatList data={routes} keyExtractor={item => item.id.toString()} renderItem={renderItemList} />;
}
