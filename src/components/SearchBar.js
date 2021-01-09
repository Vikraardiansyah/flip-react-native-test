import React from 'react';
import {View, TextInput, Text, Pressable, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = ({sortValue, setSearchValue, setModalVisible}) => {
  return (
    <View style={styles.searchContent}>
      {/* search icon */}
      <EvilIcons
        name="search"
        size={40}
        color="#bdbdbd"
        style={styles.searchIcon}
      />
      {/* input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari nama, bank, atau nominal"
        returnKeyType="search"
        autoCapitalize="characters"
        onChangeText={(text) => setSearchValue(text)}
      />
      {/* sort */}
      <Pressable style={styles.sort} onPress={() => setModalVisible(true)}>
        <Text style={styles.sortText}>{sortValue}</Text>
        <Feather name="chevron-down" size={30} color="#F56A37" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: -5,
  },
  searchInput: {
    flex: 1,
  },
  sort: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: '#F56A37',
    fontWeight: '700',
  },
});

export default SearchBar;
