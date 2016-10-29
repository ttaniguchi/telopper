import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  zIndex: {
    menu: 1000,
    appBar: 1100,
    bottomNavigation: 1100, // customize
    leftNavOverlay: 1200,
    leftNav: 1300,
    dialogOverlay: 1400,
    dialog: 1500,
    drawer: 900, // customize
    layer: 2000,
    popover: 5000,
    snackbar: 2900,
    tooltip: 3000,
  },
  palette: {
    primary1Color: Colors.tealA700, // cyan500
    primary2Color: Colors.cyan700,
    primary3Color: Colors.grey400,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
    clockCircleColor: fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
  tabs: {
    color: Colors.teal800,
    backgroundColor: Colors.grey100,
  },
};
