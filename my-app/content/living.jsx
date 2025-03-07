import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Color from './colors'

const Living = ({ setCountry, setCity }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useContext(ThemeContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  
  // Ülkeleri getir
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries');
      const data = await response.json();
      
      if (data.error) {
        setError(data.msg);
      } else {
        setCountries(data.data);
        setFilteredCountries(data.data);
      }
    } catch (err) {
      setError('Ülkeler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Ülkeleri getirme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  // Şehirleri getir
  const fetchCities = async (country) => {
    if (!country) return;
    
    setCitiesLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.msg);
        setCities([]);
        setFilteredCities([]);
      } else {
        setCities(data.data);
        setFilteredCities(data.data);
      }
    } catch (err) {
      setError('Şehirler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Şehirleri getirme hatası:', err);
    } finally {
      setCitiesLoading(false);
    }
  };

  // Ülke araması
  useEffect(() => {
    if (countrySearch) {
      const filtered = countries.filter(country =>
        country.country.toLowerCase().includes(countrySearch.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [countrySearch, countries]);

  // Şehir araması
  useEffect(() => {
    if (citySearch) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [citySearch, cities]);

  const handleChange = (e) => {
    setCountryInput(e.target.value);
  };

  // Ülke seçildiğinde
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountrySearch(country.country);
    setCitySearch('');
    setSelectedCity(null);
    fetchCities(country.country);

    // Parent component'e country değişikliğini bildir
    setCountry(country.country); // Bu satırda setCountry fonksiyonunu çağırıyoruz.
  };

  // Şehir seçildiğinde
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch(city);
    setCity(city);
  };

  // Ülke listesi
  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item, 
        selectedCountry?.country === item.country ? styles.selectedItem : null,
        { backgroundColor: colors.bColor, borderLeftColor: colors.tcolor }
      ]}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={[styles.itemText, { color: colors.btColor }]}>{item.country}</Text>
    </TouchableOpacity>
  );

  // Şehir listesi
  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item, 
        selectedCity === item ? styles.selectedItem : null,
        { backgroundColor: colors.bColor, borderLeftColor: colors.tcolor  }
      ]}
      onPress={() => handleCitySelect(item)}
    >
      <Text style={[styles.itemText, { color: colors.btColor }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Seçim Özeti */}
      <View style={[styles.selectionSummary, { backgroundColor: colors.bColor }]}>
        <Text style={[styles.summaryText, { color: colors.btColor }]}>
          {selectedCountry ? `Ülke: ${selectedCountry.country}` : 'Ülke seçilmedi'}
          {selectedCity ? ` - Şehir: ${selectedCity}` : ''}
        </Text>
      </View>

      <View style={[styles.mainContainer]}>
        {/* Ülke Seçimi */}
        <View style={styles.columnContainer}>
          <Text style={styles.sectionTitle}>Ülke Seçimi</Text>
          <TextInput
            style={[styles.searchInput, { backgroundColor: colors.bColor }]}
            placeholder="Ülke ara..."
            value={countrySearch}
            onChangeText={setCountrySearch}
          />
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#0066cc" />
          ) : (
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.iso2}
              style={[styles.list, { backgroundColor: colors.bColor }]}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
            />
          )}
        </View>

        {/* Şehir Seçimi */}
        <View style={styles.columnContainer}>
          <Text style={styles.sectionTitle}>Şehir Seçimi</Text>
          <TextInput
            style={[styles.searchInput, { backgroundColor: colors.bColor }]}
            placeholder="Şehir ara..."
            value={citySearch}
            onChangeText={setCitySearch}
            editable={Boolean(selectedCountry)}
          />
          
          {citiesLoading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#0066cc" />
          ) : selectedCountry ? (
            filteredCities.length > 0 ? (
              <FlatList
                data={filteredCities}
                renderItem={renderCityItem}
                keyExtractor={(item, index) => `${item}-${index}`}
                style={[styles.list, { backgroundColor: colors.bColor }]}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
              />
            ) : (
              <Text style={[styles.noResultText, { color: colors.btColor }]}>Şehir bulunamadı</Text>
            )
          ) : (
            <Text style={[styles.noResultText, { color: colors.btColor }]}>Önce bir ülke seçin</Text>
          )}
        </View>
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged here
  container: {
    height: 400,
    width: '85%',
    backgroundColor: 'wheat',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  columnContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  selectionSummary: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  summaryText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'RMM',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  list: {
    maxHeight: 250,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingLeft: 10,
    marginBottom: 5,
    borderLeftWidth: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '400',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  loader: {
    marginVertical: 20,
  },
  noResultText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});

export default Living;
