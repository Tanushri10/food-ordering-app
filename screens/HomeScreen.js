import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from '../styles/styles';

const { width } = Dimensions.get('window');

const foodItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic delight with 100% real mozzarella cheese',
    price: 299,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2w-6ljxAJtEImAJ4zBsRnou1CoSAVmgvQw&s',
  },
  {
    id: '2',
    name: 'Veggie Burger',
    description: 'Loaded with fresh veggies and sauces',
    price: 149,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwLNCYqPbbZjjuqnHshB2_Cx_qXBSt6UfTwQ&s',
  },
  {
    id: '3',
    name: 'Pasta Alfredo',
    description: 'Creamy Alfredo sauce with penne pasta',
    price: 259,
    image: 'https://s3.amazonaws.com/static.realcaliforniamilk.com/media/recipes_2/fettuccine-alfredo-with-creme-fraiche.jpg',
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with walnuts',
    price: 99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuwzZ_peBycGjbHV4MuC087d8gaWNuOyviw&s',
  },
  {
    id: '5',
    name: 'Fresh Mango Juice',
    description: 'Refreshing and sweet mango juice',
    price: 80,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7y9dDDD4Szeq1jsC471SWa5PHaV_w7-66MA&s',
  },
];

export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Check if item already in cart
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (itemInCart) {
      // Increase quantity if exists
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.button }]}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕹️ Menu</Text>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {cart.length > 0 && (
        <TouchableOpacity
          style={[styles.goToCartButton, { backgroundColor: Colors.accent }]}
          onPress={() => navigation.navigate('Cart', { cart })}
        >
          <Text style={[styles.buttonText, { fontSize: 18 }]}>
            Go to Cart ({cart.length})
          </Text>
        </TouchableOpacity>
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
    color: Colors.accent,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Orbitron',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
  },
  image: {
    width: width * 0.6,
    height: width * 0.4,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginVertical: 6,
  },
  price: {
    fontSize: 18,
    color: Colors.accent,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
  goToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
