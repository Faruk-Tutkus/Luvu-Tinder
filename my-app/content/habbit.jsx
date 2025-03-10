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

const Habits = ({ setHabit }) => {
  // Ana state yapısı
  const [habits, setHabits] = useState(['']);
  
  const { colors } = useContext(ThemeContext);

  // Seçilen alışkanlıkların sayısını takip etmek için
  const [selectedCount, setSelectedCount] = useState(0);
  
  // Kategorilere göre alışkanlıklar
  const categories = [
    {
      id: 'health',
      title: 'Sağlık',
      items: ['Sigara İçme', 'Alkol Tüketimi', 'Düzenli Spor', 'Sağlıklı Beslenme', 'Meditasyon', 'Erken Uyuma', 'Su İçme', 'Vitamin Takviyesi', 'Düzenli Check-up']
    },
    {
      id: 'digital',
      title: 'Dijital Alışkanlıklar',
      items: ['Sosyal Medya', 'Telefon Bağımlılığı', 'Netflix İzleme', 'Video Oyunları', 'Online Alışveriş', 'E-kitap Okuma', 'Podcast Dinleme', 'Youtube İzleme', 'Blog Takip Etme']
    },
    {
      id: 'personal',
      title: 'Kişisel Gelişim',
      items: ['Kitap Okuma', 'Günlük Tutma', 'Dil Öğrenme', 'Online Kurslar', 'Yeni Beceriler Edinme', 'Erken Kalkma', 'Hedef Belirleme', 'Planlama Yapma', 'Kendini Değerlendirme']
    },
    {
      id: 'social',
      title: 'Sosyal Alışkanlıklar',
      items: ['Arkadaşlarla Görüşme', 'Aile Ziyaretleri', 'Networking', 'Etkinliklere Katılma', 'Grup Aktiviteleri', 'Topluluk Hizmeti', 'Mentorluk', 'Sosyal Sorumluluk', 'Yeni İnsanlarla Tanışma']
    },
    {
      id: 'work',
      title: 'İş Alışkanlıkları',
      items: ['Erken İşe Gitme', 'Düzenli Mola Verme', 'E-posta Yönetimi', 'Toplantı Düzenleme', 'Uzaktan Çalışma', 'İş-Yaşam Dengesi', 'Zaman Yönetimi', 'Çoklu Görev', 'İşkoliklik']
    },
    {
      id: 'consumption',
      title: 'Tüketim Alışkanlıkları',
      items: ['Kahve İçme', 'Fast Food', 'Abur Cubur', 'Şekerli İçecekler', 'Organik Ürünler', 'Yerel Ürünler', 'Vejetaryen/Vegan Beslenme', 'Sürdürülebilir Tüketim', 'Bütçe Yönetimi']
    },
    {
      id: 'environment',
      title: 'Çevre Alışkanlıkları',
      items: ['Geri Dönüşüm', 'Enerji Tasarrufu', 'Su Tasarrufu', 'Plastik Kullanımı Azaltma', 'Toplu Taşıma Kullanma', 'Bisiklet Sürme', 'Yürüyüş Yapma', 'Çevre Temizliği', 'Bitki Yetiştirme']
    },
    {
      id: 'morning',
      title: 'Sabah Rutinleri',
      items: ['Erken Uyanma', 'Kahvaltı Yapma', 'Gazete Okuma', 'E-posta Kontrol Etme', 'Egzersiz Yapma', 'Duş Alma', 'Plan Yapma', 'Meditasyon/Yoga', 'Sesli Kitap Dinleme']
    },
    {
      id: 'evening',
      title: 'Akşam Rutinleri',
      items: ['TV İzleme', 'Kitap Okuma', 'Yürüyüş Yapma', 'Ertesi Günü Planlama', 'Aile Vakti', 'Hobi Aktiviteleri', 'Ekransız Zaman', 'Günü Değerlendirme', 'Erken Yatma']
    },
    {
      id: 'finance',
      title: 'Finansal Alışkanlıklar',
      items: ['Düzenli Tasarruf', 'Bütçe Takibi', 'Yatırım Yapma', 'Fatura Ödeme', 'Kredi Kartı Kullanımı', 'Gereksiz Harcamaları Azaltma', 'Finansal Eğitim', 'Gelir Çeşitlendirme', 'Borç Yönetimi']
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
  
  // Seçilen alışkanlıkların toplam sayısını ve state'i güncelle
  useEffect(() => {
    const selections = Object.entries(categorySelections);
    let total = 0;
    const selectedHabits = [];
    
    selections.forEach(([categoryId, items]) => {
      total += items.length;
      
      // Her seçilen öğe için kategori bilgisiyle birlikte selectedHabits dizisine ekle
      items.forEach(item => {
        const category = categories.find(cat => cat.id === categoryId);
        selectedHabits.push({
          category: category.title,
          item: item
        });
      });
    });
    
    setSelectedCount(total);
    setHabits(selectedHabits);
  }, [categorySelections]);
  
  // İlerlemek için buton kontrolü
  const handleContinue = () => {
    if (selectedCount < MIN_TOTAL) {
      Alert.alert(
        "Yetersiz Seçim",
        `Lütfen en az ${MIN_TOTAL} alışkanlık seçin. Şu anda ${selectedCount} seçim yaptınız.`
      );
      return;
    }
    
    setHabit(habits);
  };
  
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.header, { backgroundColor: colors.bColor, borderBottomColor: colors.btColor }]}>
        <Text style={[styles.title, { color: colors.btColor }]}>Alışkanlıklarınız</Text>
        <Text style={[styles.subtitle, { color: colors.btColor }]}>
          Lütfen alışkanlıklarınızı seçin. Her kategoriden en fazla {MAX_PER_CATEGORY} ve toplamda en az {MIN_TOTAL} seçim yapın.
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
          <Text style={[styles.continueButtonText, { color: colors.btColor }]}>Bitir</Text>
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

export default Habits;