import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          overflow: 'hidden',
          marginBottom: 20,
          borderWidth: 3,
          borderColor: '#007AFF'
        }}>
          <Image
            source={require('../../assets/images/foto-profil.jpeg')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 10,
          textAlign: 'center'
        }}>
          Bagas Bani Aryasatya
        </Text>
        <Text style={{
          fontSize: 18,
          color: '#666',
          textAlign: 'center'
        }}>
          NIM: 2410501055
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#666',
          textAlign: 'center',
          marginTop: 5
        }}>
          Tema: Bookshelf
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#666',
          textAlign: 'center',
          marginTop: 5
        }}>
          Credit API: api.openlibrary.org
        </Text>
      </View>
    </SafeAreaView>
  );
}