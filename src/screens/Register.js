import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
       <View style={styles.top}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
          <Text style={styles.title}>Welcome,</Text>
       </View>
          <Text style={styles.subtitle}>Sign up!</Text>
        

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="example name"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
            />
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-windows" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1afa8',
  },
  content: {
    flex: 1,
    padding: 10
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#2D5A56',
    borderRadius: 20,
    marginTop: 30,
    
  },
  top : {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 60,
    marginLeft: 25,
  },
  form: {
    backgroundColor: '#F5F5DC',
    borderRadius: 20,
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#333',
  },
  inputIcon: {
    padding: 10,
  },
  signupButton: {
    backgroundColor: '#2D5A56',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#2D5A56',
    fontWeight: 'bold',
  },
});

export default SignupScreen;