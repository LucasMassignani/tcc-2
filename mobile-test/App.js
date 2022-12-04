import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {data} from './data';

const App = () => {
  const [isNorm, setIsNorm] = React.useState(null);

  const getClassificationFromApi = async ecg => {
    const body = JSON.stringify({
      data: ecg,
    });

    const response = await fetch(
      'https://mi-prediction-api.herokuapp.com/classification',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: body,
      },
    );

    const json = await response.json();

    console.log(json);

    if (json.classification === '0') {
      setIsNorm(true);
    } else {
      setIsNorm(false);
    }
  };

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  if (isNorm === true) {
    backgroundStyle.backgroundColor = '#90ee90';
  }

  if (isNorm === false) {
    backgroundStyle.backgroundColor = '#FFCCCB';
  }

  return (
    <SafeAreaView style={[styles.safe, backgroundStyle]}>
      <View style={styles.view}>
        {isNorm !== null && (
          <View>
            <Text style={styles.text}>{isNorm ? 'NORMAL' : 'INFARTO'}</Text>
          </View>
        )}

        <View style={styles.button}>
          <Button
            title="Enviar ECG Normal"
            style={styles.button}
            onPress={() => {
              getClassificationFromApi(data.normal);
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Enviar ECG de Infarto"
            onPress={() => {
              getClassificationFromApi(data.infarto);
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Reset"
            style={styles.button}
            onPress={() => {
              setIsNorm(null);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    marginTop: 20,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
});

export default App;
