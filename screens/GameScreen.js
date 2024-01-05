import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Title from '../components/UI/title';
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/card';
import InstructionText from '../components/UI/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userChoice, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setRounds((currentRounds) => [newRndNumber, ...currentRounds]);
  }

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText styles={styles.instructionText}>
          Higher Or Lower ?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='md-add' size={24} color='white' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='md-remove' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='md-add' size={24} color='white' />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>

          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='md-remove' size={24} color='white' />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Guess My Number</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item.toString()}
          data={rounds}
          renderItem={(itemData) => (
            <GuessLogItem
              round={rounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  instructionText: {
    marginBottom: 16,
  },
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  buttonContainer: {
    width: 100,
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
