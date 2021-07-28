import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import IAlbum from '../../models/IAlbum'
import IAlbumDetalle from '../../models/IAlbumDetalle'
import AlbumDetail from '../molecules/AlbumDetail/Index'
import Albumes from '../organisms/Album'

const Home: React.FC = () => {
    const [albumes, setAlbumes] = useState<IAlbum[]>([]);
    const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
    const [currentAlbumDetail, setCurrentAlbumDetail] = useState<IAlbumDetalle | null>(null);
    return (
        <View>            
             {currentAlbum ? (
 
                <AlbumDetail 
                setCurrentAlbum={setCurrentAlbum}
                setCurrentAlbumDetail={setCurrentAlbumDetail}  
                />
     
        ) : (
            <Albumes 
            albumes={albumes} 
            setAlbumes={setAlbumes} 
            setCurrentAlbum={setCurrentAlbum}
             />
            )}
     </View>
    )
}

export default Home
