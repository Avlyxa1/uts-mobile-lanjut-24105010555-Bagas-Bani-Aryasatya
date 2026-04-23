import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        {/* Profile Picture */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: '#ddd',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          borderWidth: 3,
          borderColor: '#007AFF'
        }}>
          <Text style={{ fontSize: 48, color: '#666' }}>👤</Text>
        </View>

        {/* Name */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 10,
          textAlign: 'center'
        }}>
          Bagas Bani Aryasatya
        </Text>

        {/* NIM */}
        <Text style={{
          fontSize: 18,
          color: '#666',
          textAlign: 'center'
        }}>
          NIM: 24105010555
        </Text>
      </View>
    </SafeAreaView>
  );
}