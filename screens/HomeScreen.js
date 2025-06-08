import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // make sure this path is correct
import { Colors } from '../styles/styles';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu.');
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setCart([...cart, { ...item, quantity: 1 }]);
          navigation.navigate('Cart', { cart });
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color={Colors.accent} style={{ flex: 1 }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕹️ Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
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
    resizeMode: 'cover',
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
    backgroundColor: Colors.button,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
});
