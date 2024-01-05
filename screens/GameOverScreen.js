import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Title from '../components/UI/title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/UI/PrimaryButton';

function GameOverScrenn({ rounds, userNumber, onRestart }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.screen}>
        <Title>GAME OVER !</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your Phone Needed <Text style={styles.highlight}>{rounds}</Text>{' '}
          Rounds to Guess the Number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onRestart}>NEW GAME</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScrenn;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: 'open-sans-bold',
  },
});
