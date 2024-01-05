import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.guessLogItem}>
      <Text style={styles.guessLogItemText}>#{roundNumber}</Text>
      <Text style={styles.guessLogItemText}>{guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  guessLogItem: {
    borderColor: Colors.primary500,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 3,
  },
  guessLogItemText: {
    color: 'white',
    fontFamily: 'open-sans',
  },
});
