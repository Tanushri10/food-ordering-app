// OrderSummaryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const OrderSummaryScreen = ({ route }) => {
  const { cart } = route.params;
  const navigation = useNavigation();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        cartItems: cart,
        total,
        timestamp: Timestamp.now()
      });
      Alert.alert('Success', 'Order submitted!');
      navigation.popToTop(); // or navigate to a success screen
    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', 'Could not submit order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
            <Text style={styles.price}>₹{item.price * item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ₹{total}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmitOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8
  },
  name: {
    fontSize: 18
  },
  quantity: {
    color: '#666'
  },
  price: {
    fontWeight: 'bold'
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0A84FF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
