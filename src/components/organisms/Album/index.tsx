import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IAlbum from '../../../models/IAlbum'
import IAlbumDetalle from '../../../models/IAlbumDetalle'
import AlbumListItem from '../../molecules/AlbumListItem/Index'

export interface AlbumDetailProps{
    albumes: IAlbum[];
    setCurrentAlbum: React.Dispatch<React.SetStateAction<number | null>>
    setAlbumes: React.Dispatch<React.SetStateAction<IAlbum[]>>;
}

const Albumes: React.FC<AlbumDetailProps> = ({
    setAlbumes,
    albumes, 
    setCurrentAlbum, 
}) => {

    const callAPI = async () => {
        try{
            const albumesResponse = await axios.get(
                'https://jsonplaceholder.typicode.com/albums',
            );

            const albumesDetail = await axios.get(
                'https://jsonplaceholder.typicode.com/photos'
            );

            const albumesPhoto = (albumesResponse.data as IAlbum[]).map(alb => ({
                ...alb,
                detalles: (albumesDetail.data as IAlbumDetalle[]).filter(
                    detalle => detalle.albumId === alb.id,
                ),
            }));

            setAlbumes(albumesPhoto)
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <View style={styles.contenedor}>
            {albumes.length > 0 ? (
                <>
                    <Text style={styles.titulo}>Lista de albumes</Text>
                    <FlatList
                    data={albumes}
                    renderItem={({item, index}) => (
                    <AlbumListItem
                        key={item.id}
                        Album={item}
                        index={index}
                        setSelectedAlbum={setCurrentAlbum}
                    />
                    )}
                    />
                </>
            ) : (
                <ActivityIndicator color="#000" />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
      display: 'flex',
      padding: 16,
    },
    titulo:{
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    dark:{
        backgroundColor: '#000',
        color: '#FFF',
        padding: 5,
    },
    light:{
        color: '#000',
        padding: 5,
    }
  });

export default Albumes
