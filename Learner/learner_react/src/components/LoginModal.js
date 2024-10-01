import React from "react";
import styled from "styled-components";

const LoginModal = ({ closeModal }) => {
    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={closeModal}>X</CloseButton>
                <Logo>Learner</Logo>
                <Form>
                    <Input type="email" placeholder="이메일" />
                    <Input type="password" placeholder="비밀번호" />
                    <LoginButton>로그인</LoginButton>
                </Form>
                <PasswordOptions>
                    <PasswordOptions>
                        <ButtonLink>아이디(이메일) 찾기</ButtonLink> |
                        <ButtonLink>비밀번호 찾기</ButtonLink> |
                        <ButtonLink>회원가입</ButtonLink>
                    </PasswordOptions>

                </PasswordOptions>
                <SimpleLogin>
                    <p>최근 로그인</p>
                    <SocialLoginButton>
                        <KakaoIcon />
                        <GoogleIcon />
                        <GithubIcon />
                    </SocialLoginButton>
                </SimpleLogin>
            </ModalContainer>
        </ModalBackground>
    );
};

export default LoginModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const PasswordOptions = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  a {
    text-decoration: none;
    color: #555;
    &:hover {
      color: #28a745;
    }
  }
`;

const SimpleLogin = styled.div`
  margin-top: 2rem;
  text-align: center;
  p {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
`;

const SocialLoginButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const KakaoIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fddc3f;
  border-radius: 50%;
`;

const GoogleIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 50%;
`;

const GithubIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000000;
  border-radius: 50%;
  color: white;
`;


const ButtonLink = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #28a745;
  }
`;
