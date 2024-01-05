import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/UI/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/UI/title';
import Card from '../components/UI/card';
import InstructionText from '../components/UI/InstructionText';

function StartGameScreen({ onPickNumber }) {
  const [enteredValue, setEnteredValue] = useState('');

  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredValue) {
    setEnteredValue(enteredValue.replace(/[^0-9]/g, ''));
  }

  function resetInputHandler() {
    setEnteredValue('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );

      return;
    }
    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title> Start a New Game </Title>
          <Card>
            <InstructionText>Enter A Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    width: 50,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
