import { Dimensions, StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 24,
    marginTop: deviceWidth < 380 ? 12 : 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
});

export default Card;
