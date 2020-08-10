import React, { useEffect, useState } from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites(){
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers)
            }
        })
    }, [favorites])

    
    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >  
                {favorites.map(((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={true}
                        />
                    )
                }
                ))}
            </ScrollView>
        </View>
    )
}

export default Favorites;