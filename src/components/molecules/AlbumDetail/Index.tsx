import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';
import IAlbumDetalle from '../../../models/IAlbumDetalle';

export interface AlbumListProps {
  setCurrentAlbum: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentAlbumDetail: React.Dispatch<React.SetStateAction<IAlbumDetalle | null>>;
}

const AlbumDetail: React.FC<AlbumListProps> = ({setCurrentAlbumDetail,setCurrentAlbum}) => {
  const [albums, setAlbumDetail] = useState<IAlbumDetalle[]>([]);
  const fetchAlbumes = async () => {
    try {
      const {data} = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      );

      setAlbumDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onAlbumClick = (detalle: IAlbumDetalle) => {
    setCurrentAlbumDetail(detalle);
  };

  useEffect(() => {
    fetchAlbumes();
  }, []);

  return (
    <View>
      <Button title="Regresar" onPress={() => setCurrentAlbum(null)} />
      {albums.length > 0 ? (
        <FlatList
          data={albums}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Text style={styles.center}>{item.title}</Text>
              <Image
                style={styles.image}
                source={{uri: item.thumbnailUrl}}
              />
            </View>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    marginBottom: 15,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#CCC'
  },
  center:{
      textAlign: 'center',
      fontWeight: 'bold',
  }
});
export default AlbumDetail;
