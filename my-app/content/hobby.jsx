import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
const Hobby = ({ setHobby }) => {
  // Ana state yapısı
  const [hobbies, setHobbies] = useState(['']);
  
   const { colors } = useContext(ThemeContext);

  // Seçilen ilgi alanlarının sayısını takip etmek için
  const [selectedCount, setSelectedCount] = useState(0);
  
  // Kategorilere göre ilgi alanları
  const categories = [
    {
      id: 'music',
      title: 'Müzik',
      items: ['Pop', 'Rock', 'Caz', 'Klasik', 'Elektronik', 'Hip-Hop', 'R&B', 'Metal', 'Folk']
    },
    {
      id: 'movies',
      title: 'Film ve Diziler',
      items: ['Aksiyon', 'Komedi', 'Dram', 'Bilim Kurgu', 'Fantastik', 'Korku', 'Belgesel', 'Anime', 'Romantik']
    },
    {
      id: 'books',
      title: 'Kitaplar',
      items: ['Roman', 'Şiir', 'Bilim Kurgu', 'Fantastik', 'Kişisel Gelişim', 'Biyografi', 'Tarih', 'Felsefe', 'Polisiye']
    },
    {
      id: 'food',
      title: 'Yemek ve İçecek',
      items: ['Gurme Yemek', 'Ev Yemekleri', 'Vegan', 'Vejetaryen', 'Kahve', 'Çay', 'Şarap', 'Bira', 'Pasta Yapımı']
    },
    {
      id: 'travel',
      title: 'Seyahat',
      items: ['Doğa Tatilleri', 'Şehir Turları', 'Macera Seyahatleri', 'Kültür Turları', 'Kamp', 'Plaj Tatili', 'Kış Tatili', 'Festivaller', 'Backpacking']
    },
    {
      id: 'sports',
      title: 'Spor ve Aktiviteler',
      items: ['Futbol', 'Basketbol', 'Voleybol', 'Tenis', 'Yüzme', 'Koşu', 'Bisiklet', 'Yoga', 'Fitness']
    },
    {
      id: 'outdoors',
      title: 'Açık Hava Aktiviteleri',
      items: ['Kamp', 'Doğa Yürüyüşü', 'Tırmanış', 'Balık Tutma', 'Fotoğrafçılık', 'Kuş Gözlemciliği', 'Kayak', 'Sörf', 'Dağcılık']
    },
    {
      id: 'tech',
      title: 'Teknoloji ve Oyun',
      items: ['PC Oyunları', 'Konsol Oyunları', 'Mobil Oyunlar', 'Yapay Zeka', 'Kodlama', 'Web Geliştirme', 'Mobil Uygulamalar', 'E-Spor', 'Sanal Gerçeklik']
    },
    {
      id: 'arts',
      title: 'Sanat',
      items: ['Resim', 'Heykel', 'Fotoğrafçılık', 'Tiyatro', 'Dans', 'Müzik Aleti Çalma', 'El İşi', 'Seramik', 'Dijital Sanat']
    },
    {
      id: 'other',
      title: 'Diğer İlgi Alanları',
      items: ['Evcil Hayvanlar', 'Moda', 'Güzellik', 'Gönüllülük', 'Sosyal Sorumluluk', 'Astroloji', 'Meditasyon', 'Koleksiyon', 'Bahçecilik']
    },
  ];
  
  // Kategori başına seçilebilecek maksimum öğe sayısı
  const MAX_PER_CATEGORY = 3;
  // Toplamda seçilmesi gereken minimum öğe sayısı
  const MIN_TOTAL = 5;
  
  // Kategori başına seçilen öğe sayısını takip etmek için
  const [categorySelections, setCategorySelections] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: [] }), {})
  );
  
  // Öğe seçildiğinde
  const toggleItem = (categoryId, item) => {
    setCategorySelections(prev => {
      const updatedCategory = { ...prev };
      
      // Eğer öğe zaten seçiliyse, kaldır
      if (updatedCategory[categoryId].includes(item)) {
        updatedCategory[categoryId] = updatedCategory[categoryId].filter(i => i !== item);
      } 
      // Öğe seçili değilse ve kategori limiti aşılmamışsa, ekle
      else if (updatedCategory[categoryId].length < MAX_PER_CATEGORY) {
        updatedCategory[categoryId] = [...updatedCategory[categoryId], item];
      } 
      // Kategori limiti aşılmışsa, uyarı göster
      else {
        Alert.alert(
          "Kategori Limiti",
          `Her kategoriden en fazla ${MAX_PER_CATEGORY} öğe seçebilirsiniz.`
        );
        return prev;
      }
      
      return updatedCategory;
    });
  };
  
  // Seçilen ilgi alanlarının toplam sayısını ve metrics state'ini güncelle
  useEffect(() => {
    const selections = Object.entries(categorySelections);
    let total = 0;
    const interests = [];
    
    selections.forEach(([categoryId, items]) => {
      total += items.length;
      
      // Her seçilen öğe için kategori bilgisiyle birlikte interests dizisine ekle
      items.forEach(item => {
        const category = categories.find(cat => cat.id === categoryId);
        interests.push({
          category: category.title,
          item: item
        });
      });
    });
    
    setSelectedCount(total);
    setHobbies(interests)
  }, [categorySelections]);
  
  // İlerlemek için buton kontrolü
  const handleContinue = () => {
    if (selectedCount < MIN_TOTAL) {
      Alert.alert(
        "Yetersiz Seçim",
        `Lütfen en az ${MIN_TOTAL} ilgi alanı seçin. Şu anda ${selectedCount} seçim yaptınız.`
      );
      return;
    }
    
    setHobby(hobbies)
  };
  
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.header, { backgroundColor: colors.bColor, borderBottomColor: colors.btColor }]}>
        <Text style={[styles.title, { color: colors.btColor }]}>İlgi Alanlarınız</Text>
        <Text style={[styles.subtitle, { color: colors.btColor }]}>
          Lütfen ilgi alanlarınızı seçin. Her kategoriden en fazla {MAX_PER_CATEGORY} ve toplamda en az {MIN_TOTAL} seçim yapın.
        </Text>
        <View style={styles.counter}>
          <Text style={[
            styles.counterText,
            selectedCount < MIN_TOTAL ? styles.counterWarning : styles.counterSuccess
          ]}>
            {selectedCount}/{MIN_TOTAL}
          </Text>
        </View>
      </View>
      
      <ScrollView style={[styles.scrollView, { backgroundColor: colors.bColor }]}>
        {categories.map(category => (
          <View key={category.id} style={[styles.categoryContainer, { borderBottomColor: colors.btColor }]}>
            <Text style={[styles.categoryTitle, { color: colors.btColor }]}>{category.title}</Text>
            <Text style={styles.categoryCounter}>
              {categorySelections[category.id].length}/{MAX_PER_CATEGORY}
            </Text>
            <View style={styles.itemsContainer}>
              {category.items.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.item,
                    { backgroundColor: colors.tColor },
                    categorySelections[category.id].includes(item) && styles.selectedItem
                  ]}
                  onPress={() => toggleItem(category.id, item)}
                >
                  <Text style={[
                    styles.itemText,
                    { color: colors.bgColor },
                    categorySelections[category.id].includes(item) && [{ color: colors.bgColor }]
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedCount < MIN_TOTAL && [styles.disabledButton, { backgroundColor:'#7EACB520' }]
          ]}
          onPress={handleContinue}
          disabled={selectedCount < MIN_TOTAL}
        >
          <Text style={[styles.continueButtonText, { color: colors.btColor }]}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '90%'
  },
  header: {
    padding: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign:'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center'
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 16,
    fontFamily: 'RMB'
  },
  counterWarning: {
    color: '#FF7383',
  },
  counterSuccess: {
    color: '#7EACB5',
  },
  scrollView: {
    flex: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  categoryContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryCounter: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center'
  },
  item: {
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  selectedItem: {
    backgroundColor: '#7EACB5',
  },
  itemText: {
    color: '#495057',
  },
  selectedItemText: {
    color: '#fff',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  continueButton: {
    backgroundColor: '#7EACB5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#7EACB552',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Hobby;