import { BookDetail, getBookDetail } from '@/api/api';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailBukuScreen() {
  const params = useLocalSearchParams<{
    workKey?: string;
    cover?: string;
  }>();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        if (!params.workKey) {
          setLoading(false);
          return;
        }

        const detail = await getBookDetail(params.workKey);
        setBook(detail);
      } catch (error) {
        console.log('Error dalam memuat detail buku:', error);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [params.workKey]);

  const cover = params.cover ?? 'https://covers.openlibrary.org/b/id/0-L.jpg';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: cover }}
            style={{ width: 200, height: 300, borderRadius: 10, backgroundColor: '#f0f0f0' }}
            contentFit="cover"
          />
        </View>

        {loading ? (
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={{ marginTop: 8 }}>Memuat detail buku...</Text>
          </View>
        ) : (
          <View style={{ backgroundColor: '#f7f7f7', padding: 14, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
              Judul Buku: {book?.title ?? 'Judul tidak tersedia'}
            </Text>
            <Text style={{ fontSize: 14, color: '#444', marginBottom: 6 }}>
              Penulis: {book?.author ?? 'Penulis tidak tersedia'}
            </Text>
            <Text style={{ fontSize: 14, color: '#444', marginBottom: 6 }}>
              Penerbit: {book?.publisher ?? 'Penerbit tidak tersedia'}
            </Text>
            <Text style={{ fontSize: 14, color: '#444', marginBottom: 6 }}>
              Tahun terbit: {book?.year ?? '-'}
            </Text>
            <Text style={{ fontSize: 14, color: '#444' }}>
              Jumlah halaman: {book?.pages ?? '-'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
