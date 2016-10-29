import React from 'react';
import AppBar from 'material-ui/AppBar';

const style = {
  appbar: {
    height: 64,
    position: 'fixed',
  },
  appbarTitle: {
    textAlign: 'center',
  },
  appbarSpacer: {
    paddingTop: 64,
  },
};

const Header = () => (
  <div>
    <AppBar
      style={style.appbar}
      title="Telopper"
      titleStyle={style.appbarTitle}
    />
    <div style={style.appbarSpacer} />
  </div>
);
export default Header;
