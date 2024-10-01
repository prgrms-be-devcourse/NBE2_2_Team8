import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = ({ openModal }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 페이지가 "/courses"인지 여부 확인
    const isCoursesPage = location.pathname === "/courses";
    const isCourseDetailPage = location.pathname.startsWith("/courses/");

    return (
        <NavBar>
            <HeaderContent isCoursesPage={isCoursesPage}>
                {/* Learner 로고, 강의, 문의, 검색창 배치 */}
                <LogoWrapper isCoursesPage={isCoursesPage}>
                    <Logo onClick={() => navigate("/courses")}>Learner</Logo>
                </LogoWrapper>

                {/* CourseDetail일 경우에만 강의/문의/검색창 표시 */}
                {isCourseDetailPage && (
                    <LeftSection>
                        <NavItem>강의</NavItem>
                        <NavItem>문의</NavItem>
                        <SearchBar>
                            <input type="text" placeholder="검색해보세요" />
                            <button>🔍</button>
                        </SearchBar>
                    </LeftSection>
                )}

                {/* 로그인/회원가입 버튼 */}
                <RightSection>
                    {isCourseDetailPage ? (
                        <>
                            <NavItem>로그인</NavItem>
                            <NavItem>회원가입</NavItem>
                        </>
                    ) : (
                        <Menu>
                            <button onClick={openModal}>로그인</button>
                            <Link to="/signup">회원가입</Link>
                        </Menu>
                    )}
                </RightSection>
            </HeaderContent>
        </NavBar>
    );
};

export default Header;

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0.5rem 1rem;
    height: 60px;
    position: relative;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;

`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: ${({ isCoursesPage }) => (isCoursesPage ? "center" : "space-between")}; /* Courses에서는 중앙 정렬 */
    align-items: center;
    width: 100%;
    margin-left: 10rem;
`;

const LogoWrapper = styled.div`
    display: flex;
    justify-content: ${({ isCoursesPage }) => (isCoursesPage ? "center" : "flex-start")};
    flex-grow: 1;
`;

const Logo = styled.h1`
    font-size: 1.5rem;
    color: #3cb371;
    cursor: pointer;
    margin-right: 2rem;
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Menu = styled.div`
    display: flex;
    gap: 1rem;
    button {
        background: none;
        border: none;
        font-size: 1rem;
        cursor: pointer;
    }
    a {
        text-decoration: none;
        color: #666;
        font-weight: 500;
        &:hover {
            color: #3cb371;
        }
    }
`;

const NavItem = styled.span`
    cursor: pointer;
    padding: 0.5rem 1rem;
    &:hover {
        color: #3cb371;
    }
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
    input {
        padding: 0.5rem;
        border-radius: 20px;
        border: 1px solid #ddd;
        width: 200px;
        margin-right: 0.5rem;
        box-shadow: none; /* 그림자 제거 */
    }
    button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: none; /* 그림자 제거 */
    }
`;
