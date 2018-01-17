import APP_COMPANY_CHANGE from '../constants/app';

const selectCompany = company => (dispatch, getState) => {
  const { app: { selectCompany: currentCompany } } = getState();
  if (currentCompany !== company) {
    dispatch({
      type: APP_COMPANY_CHANGE,
      payload: company,
    });
  }
};

export default selectCompany;
