import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addDoc, collection, deleteDoc, doc, firestore, MESSAGES, onSnapshot, query } from './Config';

export default function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('');
  
  useEffect(() => {
    const q = query(collection(firestore, MESSAGES))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempMessages.push({ ...doc.data(), id: doc.id })
      })
      setItems(tempMessages)
    
    })
    return () => {
      unsubscribe()
    }
  },[])



  const  handleReadyPress = async () => {
    console.log('Ready button pressed with input:');
    await save()
    Keyboard.dismiss();
  };

  const save = async () => {
    if (newItem.trim() !== ''){
      const docRef = await addDoc(collection(firestore,MESSAGES), {
        text: newItem
          
      })
      setNewItem('')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, MESSAGES, id));
      console.log(`Document with ID: ${id} deleted`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  return (

    <View style={styles.container}>
      <Text>Shopping list</Text>
      <TextInput value={newItem} placeholder='Add new item...' onSubmitEditing={handleReadyPress}  onChangeText={setNewItem}></TextInput>
      <ScrollView>
        {
        items.map((item) =>(
          <View key={item.id} style={styles.itemContainer}>
            <Text>{item.text}</Text>
            <MaterialIcons onPress={() => handleDelete(item.id)} name="delete" size={24} />
          </View>
        ))
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 60,
  },
  itemContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  }
});
