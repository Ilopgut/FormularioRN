
// screens/RegistrationScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from "react-native-vector-icons";
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .required('Nombre requerido'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email requerido'),
  password: Yup.string()
    .min(8, 'Contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe contener al menos una mayúscula, una minúscula y un número'
    )
    .required('Contraseña requerida'),
  day: Yup.string()
    .required('Fecha de nacimiento requerida'),
  month: Yup.string()
    .required('Fecha de nacimiento requerida'),
  year: Yup.string()
    .required('Fecha de nacimiento requerida'),
  country: Yup.string()
    .required('País requerido')
});

export default function RegistrationScreen({ navigation }){
    const [countries, setCountries] = useState([]);
    const [hidePassword,setHidePassword] = useState(true);


    // Generar los meses (1-12) con nombres
    const months = [
      { label: 'Enero', value: 1 },
      { label: 'Febrero', value: 2 },
      { label: 'Marzo', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Mayo', value: 5 },
      { label: 'Junio', value: 6 },
      { label: 'Julio', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Septiembre', value: 9 },
      { label: 'Octubre', value: 10 },
      { label: 'Noviembre', value: 11 },
      { label: 'Diciembre', value: 12 },
    ];

    // Generar los últimos 80 años (desde el año actual hacia atrás)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 80 }, (_, index) => currentYear - index);
    // Generar los días (1-31)
    const days = Array.from({ length: 31 }, (_, index) => index + 1);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data
          .map(country => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch(error => console.error('Error cargando países:', error));
  }, []);

  const handleSubmit = () => {
    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos al servidor
      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Welcome', { name: formData.fullName })
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>

          <View style={styles.header}>
            <Text style={styles.subtitle}>Workaway Couple Membership</Text>
            <Text style={styles.title}>Create your account</Text>
          </View>

          <View style={styles.formFields}>
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  day: '',
                  month: '',
                  year: '',
                  country: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  navigation.navigate('Welcome', { name: values.fullName });
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <View>

                    <Text style={styles.formLabel}>Username</Text>
                    <TextInput
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                      placeholder="Nombre completo"
                      style={styles.FormInput}
                    />
                    {touched.fullName && errors.fullName &&
                      <Text style={{color: 'red'}}>{errors.fullName}</Text>
                    }

                    <Text style={styles.formLabel}>Email</Text>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.FormInput}
                    />
                    {touched.email && errors.email &&
                      <Text style={{color: 'red'}}>{errors.email}</Text>
                    }

                    <Text style={styles.formLabel}>Password</Text>

                    <View style={styles.passwordLabel}>
                        <TextInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          placeholder="Contraseña"
                          secureTextEntry={hidePassword}
                          style={[styles.FormInput,{width:'78%',borderTopLeftRadius: 8,borderBottomLeftRadius: 8,borderTopRightRadius: 0,borderBottomRightRadius: 0,}]}
                        />
                        <TouchableOpacity style={styles.showPassword}>
                            <FontAwesome onPress={()=>{setHidePassword(!hidePassword)}} name={hidePassword?"eye":"eye-slash"} color="#000" size={20} />
                        </TouchableOpacity>
                    </View>
                    {touched.password && errors.password &&
                      <Text style={styles.error}>{errors.password}</Text>
                    }


                    <Text style={styles.formLabel}>Date of birth</Text>

                    <View style={styles.birthLabel}>
                      <Picker
                        selectedValue={values.month}
                        onValueChange={(value) => setFieldValue('month', value)}
                        style={styles.birthPicker}
                      >
                        <Picker.Item label="Month" value="" />
                        {months.map((month) => (
                          <Picker.Item key={month.value} label={month.label} value={month.value} />
                        ))}
                      </Picker>

                      <Picker
                        selectedValue={values.day}
                        onValueChange={(value) => setFieldValue('day', value)}
                        style={styles.birthPicker}
                      >
                        <Picker.Item label="Day" value="" />
                        {days.map((day) => (
                          <Picker.Item key={day} label={String(day)} value={day} />
                        ))}
                      </Picker>

                      <Picker
                        selectedValue={values.year}
                        onValueChange={(value) => setFieldValue('year', value)}
                        style={styles.birthPicker}
                      >
                        <Picker.Item label="Year" value="" />
                        {years.map((year) => (
                          <Picker.Item key={year} label={String(year)} value={year} />
                        ))}
                      </Picker>

                    </View>

                    {(touched.day || touched.month || touched.year) && (errors.day || errors.month || errors.year) &&
                      <Text style={{color: 'red'}}>Fecha de nacimiento requerida</Text>
                    }

                    <Text style={styles.formLabel}>Your country of residence</Text>
                    <Picker
                      selectedValue={values.country}
                      onValueChange={(value) => setFieldValue('country', value)}>
                      <Picker.Item label="Selecciona país" value="" />
                      {countries.map(country => (
                        <Picker.Item
                          key={country.code}
                          label={country.name}
                          value={country.code}
                        />
                      ))}
                    </Picker>

                    {touched.country && errors.country &&
                      <Text style={{color: 'red'}}>{errors.country}</Text>
                    }

                    <TouchableOpacity style={styles.confirm} onPress={handleSubmit} >
                        <Text style={{textAlign:'center',fontWeight:800}}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
          </View>

        </View>
    </View>
  );
};

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
    padding:5,
    height:'600px',
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
    height:'11%',
    justifyContent:'center',
    marginTop:40,
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
  birthPicker: {
    marginLeft:-10,
    width:'37%',
  },
  birthLabel: {
    flexDirection: 'row',
  },
});


