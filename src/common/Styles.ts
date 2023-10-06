import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignAndJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  horizontalMargin: {
    marginHorizontal: 10,
  },
  horizontalMarginM: {
    marginHorizontal: 15,
  },
  horizontalMarginL: {
    marginHorizontal: 20,
  },
  verticalMargin: {
    marginVertical: 10,
  },
  verticalMarginM: {
    marginVertical: 15,
  },
  verticalMarginL: {
    marginVertical: 20,
  },
  horizontalPadding: {
    paddingHorizontal: 10,
  },
  horizontalPaddingM: {
    paddingHorizontal: 15,
  },
  horizontalPaddingL: {
    paddingHorizontal: 20,
  },
  verticalPadding: {
    paddingVertical: 10,
  },
  verticalPaddingM: {
    paddingVertical: 15,
  },
  verticalPaddingL: {
    paddingVertical: 20,
  },
});

export default Styles;
