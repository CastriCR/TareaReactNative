import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import IAlbum from '../../../models/IAlbum';
import IAlbumDetalle from '../../../models/IAlbumDetalle';

export interface TodoListProps {
  setCurrentDetail: React.Dispatch<React.SetStateAction<IAlbumDetalle | null>>;
}

const AlbumDetail: React.FC<TodoListProps> = ({setCurrentDetail}) => {
  const [albumes, setAlbumes] = useState<IAlbumDetalle[]>([]);
  const fetchAlbumes = async () => {
    try {
      const {data} = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      );

      setAlbumes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onTodoClick = (album: IAlbumDetalle) => {
    setCurrentDetail(album);
  };

  useEffect(() => {
    fetchAlbumes();
  }, []);

  return (
    <View>
      {albumes.length > 0 ? (
        <FlatList
          data={albumes}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onTodoClick(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default AlbumDetail;