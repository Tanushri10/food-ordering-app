import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../styles/styles';

export default function OrderSummaryScreen({ route }) {
  const { cart } = route.params || [];

  const totalPrice = cart
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>
        {item.name} x {item.quantity}
      </Text>
      <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {cart && cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>₹{totalPrice}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.accent,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Orbitron',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: Colors.secondaryText,
    borderBottomWidth: 0.5,
  },
  itemName: {
    fontSize: 18,
    color: Colors.text,
  },
  itemPrice: {
    fontSize: 18,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: Colors.accent,
    borderTopWidth: 1,
    paddingTop: 15,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.secondaryText,
    marginTop: 50,
  },
});

