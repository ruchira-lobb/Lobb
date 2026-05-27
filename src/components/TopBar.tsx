import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useMeals } from '../hooks/useMeals';

const TopBar: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { updateQuery } = useMeals();

  const openSearch = () => setSearchVisible(true);
  const closeSearch = () => setSearchVisible(false);
  const handleSearch = () => {
    updateQuery(searchQuery);
    closeSearch();
  };
  const goToInfo = () => navigation.navigate('Info');

  return (
    <View style={styles.container} testID="top-bar">
      <Text style={styles.title}>Lobb</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={openSearch} style={styles.iconBtn}>
          <Icon name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToInfo} style={styles.iconBtn}>
          <Icon name="information" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal visible={searchVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Search meals..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeSearch} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSearch} style={styles.modalBtn}>
                <Text style={styles.modalBtnText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#00695c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  icons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBtn: {
    marginLeft: 12,
  },
  modalBtnText: {
    color: '#00695c',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default TopBar;