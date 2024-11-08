import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, Animated, Easing } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';
interface AdLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface AdSpend {
  id: number;
  ad_location_id: number;
  amount: number;
}

interface BusinessCrypto {
  id: number;
  ad_location_id: number;
  crypto_amount: number;
}

const HomeScreen: React.FC = () => {
  const [adLocations, setAdLocations] = useState<AdLocation[]>([]);
  const [adSpends, setAdSpends] = useState<AdSpend[]>([]);
  const [businessCryptos, setBusinessCryptos] = useState<BusinessCrypto[]>([]);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    fetchAdLocations();
    fetchAdSpends();
    fetchBusinessCryptos();
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const fetchAdLocations = async () => {
    try {
      const response = await fetch(`${API_URL}/ad-locations`);
      const data = await response.json();
      setAdLocations(data);
    } catch (error) {
      console.error('Error fetching ad locations:', error);
    }
  };

  const fetchAdSpends = async () => {
    try {

      const response = await fetch(`${API_URL}/ad-spends`);


      const data = await response.json();
      setAdSpends(data);
    } catch (error) {
      console.error('Error fetching ad spends:', error);
    }
  };

  const fetchBusinessCryptos = async () => {
    try {
      const response = await fetch(`${API_URL}/business-cryptos`);
      const data = await response.json();
      setBusinessCryptos(data);
    } catch (error) {
      console.error('Error fetching business cryptos:', error);
    }
  };

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    }),
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<LogoImage />}
      contentContainerStyle={styles.contentContainer}>
      <AdLocationsSection adLocations={adLocations} />
      <AdSpendsSection adSpends={adSpends} />
      <BusinessCryptosSection businessCryptos={businessCryptos} />
      <Animated.View style={[styles.animationContainer, animatedStyle]} />
    </ParallaxScrollView>
  );
};

const LogoImage: React.FC = () => {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      style={styles.reactLogo}
      resizeMode="contain"
    />
  );
};

const TitleSection: React.FC = () => {
  return (
    <View style={styles.titleContainer}>
      <ThemedText type="title">Welcome!</ThemedText>
      <HelloWave />
    </View>
  );
};

const AdLocationsSection: React.FC<{ adLocations: AdLocation[] }> = ({ adLocations }) => {
  return (
    <ThemedView style={styles.sectionContainer}>
      <ThemedText type="subtitle">Ad Locations:</ThemedText>
      {adLocations.map(location => (
        <ThemedText key={location.id}>{location.name}</ThemedText>
      ))}
    </ThemedView>
  );
};

const AdSpendsSection: React.FC<{ adSpends: AdSpend[] }> = ({ adSpends }) => {
  return (
    <ThemedView style={styles.sectionContainer}>
      <ThemedText type="subtitle">Ad Spends:</ThemedText>
      {adSpends.map(spend => (
        <ThemedText key={spend.id}>{spend.amount}</ThemedText>
      ))}
    </ThemedView>
  );
};

const BusinessCryptosSection: React.FC<{ businessCryptos: BusinessCrypto[] }> = ({ businessCryptos }) => {
  return (
    <ThemedView style={styles.sectionContainer}>
      <ThemedText type="subtitle">Business Cryptos:</ThemedText>
      {businessCryptos.map((crypto => (
        <ThemedText key={crypto.id}>{crypto.crypto_amount}</ThemedText>
      )))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  animationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '100%',
    height: 200,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
  },
});

export default HomeScreen;

