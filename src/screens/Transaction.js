import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import SortModal from '../components/SortModal';
import SearchBar from '../components/SearchBar';
import CardTransaction from '../components/CardTransaction';
import {aToZ, zToA, latestDate, earliestDate, searchFilter} from '../helpers';

const Transaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [temporaryTransactionData, setTemporaryTransactionData] = useState([]);
  const [modifiedTransactionData, setModifiedTransactionData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortValue, setSortValue] = useState('URUTKAN');
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isFailedLoad, setIsfailedLoad] = useState(false);

  //get data from api
  const getData = useCallback(async () => {
    setIsRefresh(true);
    try {
      const response = await fetch('https://nextar.flip.id/frontend-test');
      const data = await response.json();

      setTransactionData(Object.values(data));
      setTemporaryTransactionData(Object.values(data));
      setModifiedTransactionData(Object.values(data));

      setIsLoading(false);
      setIsRefresh(false);
    } catch (error) {
      setIsfailedLoad(true);
      setIsLoading(false);
      setIsRefresh(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSort = (selectedSort) => {
    setSortValue(selectedSort);
    switch (selectedSort) {
      case 'URUTKAN':
        setModifiedTransactionData(modifiedTransactionData);
        setTransactionData(temporaryTransactionData);
        break;
      case 'Nama A-Z':
        setModifiedTransactionData(aToZ(modifiedTransactionData));
        setTransactionData(aToZ(transactionData));
        break;
      case 'Nama Z-A':
        setModifiedTransactionData(zToA(modifiedTransactionData));
        setTransactionData(zToA(transactionData));
        break;
      case 'Tanggal Terbaru':
        setModifiedTransactionData(latestDate(modifiedTransactionData));
        setTransactionData(latestDate(transactionData));
        break;
      case 'Tanggal Terlama':
        setModifiedTransactionData(earliestDate(modifiedTransactionData));
        setTransactionData(earliestDate(transactionData));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (transactionData.length > 0) {
      setIsLoading(true);
      const delayDebounce = setTimeout(() => {
        console.log('search render');
        if (searchValue === '') {
          setModifiedTransactionData(transactionData);
          setIsSearch(false);
          setIsLoading(false);
        } else {
          const newData = transactionData.filter((data) => {
            if (searchFilter(data, searchValue)) {
              return data;
            }
          });
          setModifiedTransactionData(newData);
          setIsSearch(true);
          setIsLoading(false);
        }
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchValue, transactionData]);

  const renderItem = ({item, index}) => (
    // card transaction
    <CardTransaction item={item} index={index} />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* modal sort */}
      <SortModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sortValue={sortValue}
        setSortValue={setSortValue}
        handleSort={handleSort}
      />
      <KeyboardAvoidingView style={styles.main}>
        {/* search bar */}
        <SearchBar
          setSearchValue={setSearchValue}
          sortValue={sortValue}
          setModalVisible={setModalVisible}
        />
        {isLoading ? (
          // loading indicator
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#F56A37" />
          </View>
        ) : modifiedTransactionData.length > 0 ? (
          // list card
          <FlatList
            data={isSearch ? modifiedTransactionData : transactionData}
            key={(item) => item.id}
            renderItem={renderItem}
            onRefresh={getData}
            refreshing={isRefresh}
          />
        ) : isFailedLoad ? (
          <View style={styles.center}>
            <Text style={styles.text}>Could not get Data</Text>
          </View>
        ) : (
          // no data
          <View style={styles.center}>
            <Text style={styles.text}>No Data</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 5,
    backgroundColor: '#F7F9F8',
  },
  center: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: -0.2,
  },
});

export default Transaction;
