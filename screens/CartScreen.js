import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../styles/styles';

export default function CartScreen({ route, navigation }) {
  const [cartItems, setCartItems] = useState(route.params?.cart || []);

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity !== 0);
    setCartItems(updated);
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1) * item.price,
      0
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price} x {item.quantity || 1}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
          <Text style={styles.controlButton}>➖</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => increaseQty(item.id)}>
          <Text style={styles.controlButton}>➕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>Total: ₹{getTotal()}</Text>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() =>
          navigation.navigate('OrderSummary', { cart: cartItems })
        }>
        <Text style={styles.orderText}>Confirm Order</Text>
      </TouchableOpacity>
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
    color: Colors.accent,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Orbitron',
  },
  item: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: Colors.text,
  },
  price: {
    fontSize: 16,
    color: Colors.accent,
    marginVertical: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  controlButton: {
    fontSize: 20,
    color: Colors.buttonText,
    backgroundColor: Colors.button,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  total: {
    fontSize: 20,
    color: Colors.accent,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  orderButton: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  orderText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
