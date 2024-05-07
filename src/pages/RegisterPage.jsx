import React from 'react';

// import svg
import iconLogo from '../assets/images/icon/logo.svg';

// import custom components
import ContainerColOne from '../components/layout/ContainerColOne';
import RegisterForm from '../components/forms/RegisterForm';
import { useAuth } from '../components/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { isAuthentic } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthentic) {
      navigation('/main');
    }
  }, [navigation, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <>
      <ContainerColOne>
        <div className='login-container col-4 flex_col_cc'>
          <div className='page-logo'>
            <img
              src={iconLogo}
              alt='Alphitter Icon'
              className='icon-logo cursor-point'
            />
          </div>
          <h3 className='page-title'>建立你的帳號</h3>
          <RegisterForm />
        </div>
      </ContainerColOne>
    </>
  );
};

export default RegisterPage;
