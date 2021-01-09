import React from 'react';
import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';

const SortModal = ({handleSort, modalVisible, setModalVisible, sortValue}) => {
  const options = [
    'URUTKAN',
    'Nama A-Z',
    'Nama Z-A',
    'Tanggal Terbaru',
    'Tanggal Terlama',
  ];

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={() => setModalVisible(false)}>
      {/* out of modal content with opacity */}
      <Pressable
        style={styles.container}
        onPress={() => setModalVisible(false)}>
        {/* modal content */}
        <Pressable style={styles.modalContent}>
          {/* options list */}
          {options.map((item) => (
            <Pressable
              key={item}
              style={styles.radioButtonContainer}
              onPress={() => {
                handleSort(item);
                setModalVisible(false);
              }}>
              {/* radio button circle */}
              <View style={styles.circle}>
                {sortValue === item && <View style={styles.filledCircle} />}
              </View>
              <Text style={styles.textOption}>{item}</Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingLeft: 20,
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#F56A37',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  filledCircle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#F56A37',
  },
  textOption: {
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: -0.2,
  },
});

export default SortModal;
