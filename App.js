import { StatusBar } from 'expo-status-bar';
import { AppRegistry, ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react'
import { firestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, MESSAGES } from './Firebase/Config';
import  Constants  from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './Helpers/Functions';


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created) 
      }
      tempMessages.push(messageObject)
    })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessages,   
      created: serverTimestamp()
    }) .catch (error => console.log(error))

    setNewMessages('')
    console.log('Message saved')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
          ))
    }
      </ScrollView>
      <TextInput
        style={styles.input}
        value={newMessages}
        onChangeText={text => setNewMessages(text)}
        placeholder="Type your message here"
      />
      <Button onPress={save} title="Send" type='button' />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusbarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
   fontSize: 12,
  }
});
