import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Button } from 'react-native';
import { FontAwesome } from "react-native-vector-icons";
import SelectDropdown from 'react-native-select-dropdown';
import { useState } from 'react';

import { Formik } from "formik";
import * as yup from 'yup';

// Definición del esquema de validación con Yup
const schema = yup.object().shape({
  username: yup.string().required('Nombre de usuario es requerido'),
  email: yup.string().email('Email no válido').required('Email es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
});

// Componente del formulario
export default function App(){
    const [hidePassword,setHidePassword] = useState(true);
  return (
  <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.container}>
                <View style={styles.formContainer}>

                    <View style={styles.header}>
                        <Text style={styles.subtitle}>Workaway Couple Membership</Text>
                        <Text style={styles.title}>Create your account</Text>
                    </View>

                    <View style={styles.formFields}>

                        <Text style={styles.formLabel}>Username</Text>
                        <TextInput
                            style={styles.FormInput}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Nombre de usuario"
                        />
                        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput
                            style={styles.FormInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                        />
                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <Text style={styles.formLabel}>Password</Text>
                        <View style={styles.passwordLabel}>
                            <TextInput
                                style={[styles.FormInput,{width:'78%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,borderTopRightRadius: 0,borderBottomRightRadius: 0,}]}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Contraseña"
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.showPassword}>
                                <FontAwesome onPress={()=>{setHidePassword(!hidePassword)}} name={hidePassword?"eye":"eye-slash"} color="#000" size={20} />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}


                        <Text style={styles.formLabel}>Date of birth</Text>


                        <Text style={styles.formLabel}>Country of residence</Text>


                        <Text style={styles.formLabel}>I have read, understood and agree to the workaway.info terms and conditions and privacy policy</Text>


                        <Text style={styles.formLabel}>I would like to receive email updates from Workaway</Text>


                        <TouchableOpacity style={styles.confirm} onPress={handleSubmit} >
                            <Text style={{textAlign:'center',fontWeight:800}}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )}
      </Formik>
  );
}

// Estilos del formulario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    width:'90%',
    height:'85%',
    padding:5,
  },
  header: {
    width:'100%',
    padding:15,
  },
  subtitle: {
    color:'#004488',
  },
  title: {
    color:'#004488',
    fontWeight:700,
    fontSize:30,
  },
  formFields:{
    padding:10,
  },
  formLabel:{
    padding:5,
  },
  confirm:{
    backgroundColor:'#ffcd00',
    borderRadius:7,
    width:'30%',
    height:'10%',
    justifyContent:'center',
  },
  FormInput: {
    borderWidth: .5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 8,
    width:'90%',
  },
  passwordLabel: {
    flexDirection:'row',
  },
  showPassword: {
    width:'12%',
    borderWidth: .5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent:'center',
    padding:10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
