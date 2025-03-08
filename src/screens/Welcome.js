import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation();

    const handleLogin = () => {
      navigation.navigate('Login');
    };

    const handleSignup = () => {
      navigation.navigate('Signup');
    };

    const handleAdminLogin = () => {
      navigation.navigate('AdminDashboard');
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../assets/hero-removebg-preview.png')} 
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.description}>
              Create your account and if you have one login
            </Text>
            <Text style={styles.subtitle}  numberOfLines={1}>Get Started?</Text>
          </View>

          <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
    <Text style={styles.loginButtonText}>Log In</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
    <Text style={styles.signupButtonText}>Sign up</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
    <Text style={styles.loginButtonText}>Admin Login</Text>
  </TouchableOpacity>
</View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D5A56',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#F5F5DC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'Left',
  },
  description: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'Left',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  loginButton: {
    backgroundColor: '#2D5A56',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#F5F5DC',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#2D5A56',
  },
  signupButtonText: {
    color: '#2D5A56',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;