import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {upperCaseBankName, convertToRupiah, dateFormat} from '../helpers';

const DetailTransaction = ({route}) => {
  const {item} = route.params;

  const [collapse, setCollapse] = useState(true);

  const collapseDetail = useRef(new Animated.Value(270)).current;

  const showToast = () => {
    ToastAndroid.show('ID berhasil disalin', ToastAndroid.SHORT);
  };

  const openCollapse = () => {
    Animated.timing(collapseDetail, {
      toValue: 270,
      duration: 300,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start();
  };

  const closeCollapse = () => {
    Animated.timing(collapseDetail, {
      toValue: 0,
      duration: 300,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start();
  };

  const collapseAction = () => {
    if (collapse) {
      closeCollapse();
      setCollapse(false);
    } else {
      openCollapse();
      setCollapse(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* id transaction */}
        <View style={styles.idContent}>
          <Text style={styles.title}>ID TRANSAKSI: #{item.id} </Text>
          <Text style={styles.iconRotate}>
            {/* clipboard icon */}
            <MaterialCommunityIcons
              name="content-copy"
              color="#F56A37"
              size={18}
              onPress={() => {
                Clipboard.setString(item.id);
                showToast();
              }}
            />
          </Text>
        </View>

        {/* detail transaction */}
        <View style={styles.divider1} />
        <View style={styles.collapseContent}>
          <Text style={styles.title}>DETAIL TRANSAKSI</Text>
          {/* collapse trigger */}
          <Text onPress={collapseAction} style={styles.collapseText}>
            {collapse ? 'Tutup' : 'Buka'}
          </Text>
        </View>
        <View style={styles.divider2} />

        {/* collapse components */}
        <Animated.View style={[styles.detailContent, {height: collapseDetail}]}>
          <View style={styles.detailSubContent}>
            {/* bank flow */}
            <Text style={styles.bankFlow}>
              {upperCaseBankName(item.sender_bank)}{' '}
              <Fontisto name="arrow-right" size={14} />{' '}
              {upperCaseBankName(item.beneficiary_bank)}
            </Text>
            <View style={styles.space1} />
            {/* detail info */}
            <View style={styles.detailInfo}>
              <View>
                <Text style={styles.subTitle}>
                  {item.beneficiary_name.toUpperCase()}
                </Text>
                <Text style={styles.textDetail}>{item.account_number}</Text>

                <View style={styles.space2} />

                <Text style={styles.subTitle}>BERITA TRANSFER</Text>
                <Text style={styles.textDetail}>{item.remark}</Text>

                <View style={styles.space2} />

                <Text style={styles.subTitle}>WAKTU DIBUAT</Text>
                <Text style={styles.textDetail}>
                  {dateFormat(item.created_at)}
                </Text>
              </View>
              <View>
                <Text style={styles.subTitle}>NOMINAL</Text>
                <Text style={styles.textDetail}>
                  {convertToRupiah(item.amount)}
                </Text>

                <View style={styles.space2} />

                <Text style={styles.subTitle}>KODE UNIK</Text>
                <Text style={styles.textDetail}>{item.unique_code}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#F7F9F8',
  },
  idContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    letterSpacing: -0.2,
    fontSize: 15,
  },
  iconRotate: {
    transform: [{rotateY: '180deg'}],
  },
  divider1: {
    height: 1,
    backgroundColor: '#F6F9F8',
  },
  collapseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  collapseText: {
    color: '#F56A37',
  },
  divider2: {
    height: 1.5,
    backgroundColor: '#eeeeee',
  },
  detailContent: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    overflow: 'hidden',
  },
  detailSubContent: {
    marginTop: 15,
    marginBottom: 25,
    overflow: 'hidden',
  },
  bankFlow: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    letterSpacing: -0.2,
  },
  detailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 50,
  },
  space1: {
    height: 15,
  },
  subTitle: {
    fontFamily: 'OpenSans-Bold',
    letterSpacing: -0.2,
  },
  textDetail: {
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: -0.2,
  },
  space2: {
    height: 25,
  },
});

export default DetailTransaction;
