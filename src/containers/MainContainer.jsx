import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectCompany from '../actions/app';
import App from '../components/App';

const mapStateToProps = state => ({
  ...state.app,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    selectCompany: bindActionCreators(selectCompany, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
