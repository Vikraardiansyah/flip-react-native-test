import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import {upperCaseBankName, convertToRupiah, dateFormat} from '../helpers';

const CardTransaction = ({item, index}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.cardContainer, index === 0 ? styles.firstCard : null]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ffe0b2', false)}
        onPress={() => {
          navigation.push('Detail', {
            item,
          });
        }}>
        {/* line card */}
        <View style={styles.cardData}>
          <View
            style={[
              styles.lineCard,
              item.status === 'SUCCESS' ? styles.success : styles.pending,
            ]}
          />
          <View style={styles.cardContent}>
            <View>
              {/* bank flow */}
              <Text style={styles.bankFlowCard}>
                {upperCaseBankName(item.sender_bank)}{' '}
                <Fontisto name="arrow-right" size={14} />{' '}
                {upperCaseBankName(item.beneficiary_bank)}
              </Text>
              {/* beneficiary name */}
              <Text style={styles.cardText}>
                {item.beneficiary_name.toUpperCase()}
              </Text>
              {/* nominal and date */}
              <Text style={styles.cardText}>
                {convertToRupiah(item.amount)}{' '}
                <Octicons name="primitive-dot" size={12} />{' '}
                {dateFormat(item.created_at)}
              </Text>
            </View>
            {/* status */}
            <View
              style={[
                item.status === 'SUCCESS'
                  ? styles.statusSuccess
                  : styles.statusPending,
              ]}>
              <Text
                style={
                  item.status === 'SUCCESS'
                    ? styles.successText
                    : styles.pendingText
                }>
                {item.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 100,
    backgroundColor: 'white',
    marginBottom: 7,
    overflow: 'hidden',
    borderRadius: 5,
  },
  cardData: {
    flexDirection: 'row',
  },
  firstCard: {
    marginTop: 7,
  },
  lineCard: {
    height: '100%',
    width: 5,
  },
  pending: {
    backgroundColor: '#F56A37',
  },
  success: {
    backgroundColor: '#59B384',
  },
  cardContent: {
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankFlowCard: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    letterSpacing: -0.2,
  },
  cardText: {
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: -0.2,
  },
  statusPending: {
    paddingTop: 3,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F56A37',
    backgroundColor: 'white',
  },
  statusSuccess: {
    paddingTop: 3,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#59B384',
  },
  pendingText: {
    fontFamily: 'OpenSans-Bold',
    color: 'black',
    letterSpacing: -0.8,
  },
  successText: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    letterSpacing: -0.8,
  },
});

export default CardTransaction;
