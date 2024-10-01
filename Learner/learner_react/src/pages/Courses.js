import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

// 기본 배너 이미지 경로 설정
const defaultImage = "/images/course_default_img.png"; // public 폴더에 있는 이미지 사용
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [searchId, setSearchId] = useState("");  // 검색할 courseId 상태
    const [searchedCourse, setSearchedCourse] = useState(null); // 검색된 강의 상태
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/course/list")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching the courses:", error);
            });
    }, []);

    // 검색 요청을 처리하는 함수
    const handleSearch = () => {
        axios.get(`http://localhost:8080/api/v1/course/${searchId}`)
            .then((response) => {
                setSearchedCourse(response.data);  // 검색된 강의 결과를 저장
            })
            .catch((error) => {
                console.error("Error fetching the course:", error);
            });
    };

    return (
        <CoursePage>
            <SearchContainer>
                <h2>Learner에서 강의를 찾아보세요</h2>
                <SearchInputContainer>
                    <SearchInput
                        type="text"
                        placeholder="배우고 싶은 지식을 입력해보세요."
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <SearchButton onClick={handleSearch}>
                        🔍
                    </SearchButton>
                </SearchInputContainer>
            </SearchContainer>

            <CourseList>
                {/* 검색된 강의가 있으면 해당 강의만 표시 */}
                {searchedCourse ? (
                    <CourseItem key={searchedCourse.courseId} course={searchedCourse} navigate={navigate}/>
                ) : (
                    courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseItem key={course.courseId} course={course} navigate={navigate}/>
                        ))
                    ) : (
                        <p>강의를 불러오는 중입니다...</p>
                    )
                )}
            </CourseList>
        </CoursePage>
    );
};

const CourseItem = ({course, navigate}) => {
    const handleClick = () => {
        navigate(`/courses/${course.courseId}`);
    };

    return (
        <StyledCourseItem onClick={handleClick}>
            <CourseImage src={defaultImage} alt="Course Banner"/> {/* 기본 이미지 */}
            <h3>{course.courseName}</h3>
            <p>{course.instructorName}</p>
            <p>{course.coursePrice}원</p>
        </StyledCourseItem>
    );
};

export default Courses;

const CoursePage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
`;

const CourseList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`;

const StyledCourseItem = styled.div`
    border: 1px solid #ddd;
    padding: 1.5rem;
    width: 300px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
`;

const SearchContainer = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const SearchInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const SearchInput = styled.input`
    width: 500px;
    padding: 1rem;
    border-radius: 50px;
    border: 1px solid #ddd;
    font-size: 1rem;
    text-align: center;
    background-color: #f5f5f5;
`;

const SearchButton = styled.button`
    margin-left: -3rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
`;

const CourseImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
`;