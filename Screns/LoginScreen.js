import {
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
  } from 'react-native';
  import { useEffect, useState } from 'react';
  import bgimage from "../assets/img/bg-image.jpg";
  
  const initialState = {
    email: '',
    password: '',
  };
  
  export function LoginScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [dataInput, setDataInput] = useState(initialState);
    const [isShowPass, setIsShowPass] = useState(true);
  
    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
        setIsShowKeyboard(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        setIsShowKeyboard(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
  
    function onShowKeyboard() {
      setIsShowKeyboard(true);
    }
  
    function onHideKeyboard() {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    }
  
    function onSubmit() {
      if (!dataInput.email || !dataInput.password)
        return console.warn('Please fill in all fields!');
  
      onHideKeyboard();
      setIsShowPass(true);
      console.log('state :>> ', dataInput);
      setDataInput(initialState);
    }
  
    function onLogin() {
      console.log(' Немає акаунту? Зареєструватися');
    }
  
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onHideKeyboard}>
          <ImageBackground style={styles.imageBG} source={bgimage}>
            <KeyboardAvoidingView
              style={styles.wrapForm}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 144,
                }}
              >
                <View>
                  <Text style={styles.titleForm}>Увійти</Text>
                </View>
  
                <View style={{ marginTop: 33 }}>
                  <TextInput
                    style={styles.input}
                    textAlign="left"
                    placeholder="Адреса електронної пошти"
                    onFocus={onShowKeyboard}
                    value={dataInput.email}
                    onChangeText={value =>
                      setDataInput(prev => ({ ...prev, email: value }))
                    }
                  />
                </View>
  
                <View
                  style={{
                    marginTop: 16,
                    position: 'relative',
                  }}
                >
                  <TextInput
                    style={styles.input}
                    textAlign="left"
                    placeholder="Пароль"
                    secureTextEntry={isShowPass}
                    onFocus={onShowKeyboard}
                    value={dataInput.password}
                    onChangeText={value =>
                      setDataInput(prev => ({ ...prev, password: value }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.show}
                    onPress={() => setIsShowPass(prev => !prev)}
                  >
                    <Text style={styles.showTitle}>
                      {isShowPass ? 'Показати' : 'Приховати'}
                    </Text>
                  </TouchableOpacity>
                </View>
  
                {!isShowKeyboard && (
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={onSubmit}
                  >
                    <Text style={styles.btnTitle}>Увійти</Text>
                  </TouchableOpacity>
                )}
  
                {!isShowKeyboard && (
                  <TouchableOpacity activeOpacity={0.6} onPress={onLogin}>
                    <Text style={styles.linkTitle}>
                      Немає акаунту? Зареєструватися
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    imageBG: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'flex-end',
    },
    title: {
      color: '#212121',
      fontSize: 20,
    },
    wrapForm: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#fff',
    },
    form: {
      marginHorizontal: 16,
    },
    imgAvatar: {
      position: 'absolute',
      top: -60,
      left: '35%',
    },
    titleForm: {
      marginTop: 32,
      textAlign: 'center',
      fontFamily: 'Roboto-500',
      fontSize: 30,
      letterSpacing: 0.3,
      color: '#212121',
    },
    input: {
      paddingLeft: 16,
      height: 50,
      borderWidth: 1,
      borderRadius: 6,
      fontFamily: 'Roboto-400',
      color: '#212121',
      borderColor: '#E8E8E8',
      backgroundColor: '#F6F6F6',
    },
    show: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    showTitle: {
      fontFamily: 'Roboto-400',
      fontSize: 16,
      color: '#1B4371',
    },
    btn: {
      marginTop: 43,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF6C00',
      height: 50,
      borderRadius: 100,
    },
    btnTitle: {
      fontSize: 16,
      color: '#fff',
    },
    linkTitle: {
      paddingTop: 16,
  
      fontFamily: 'Roboto-400',
      fontSize: 16,
      textAlign: 'center',
      color: '#1B4371',
    },
  });