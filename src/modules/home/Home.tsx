// import { FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { some } from '../../constants/constants';

const Home = (props: some) => {
  return (
    <Box
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage: `url(${'https://firebasestorage.googleapis.com/v0/b/duanimage-50853.appspot.com/o/images%2F10808.jpg?alt=media&token=1cff8cec-f6d1-4612-b0b0-09c44b4a117d'})`,
      }}
    ></Box>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Home));
