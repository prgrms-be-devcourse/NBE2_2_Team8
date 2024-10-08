import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const InstructorReviewEdit = () => {
    const { reviewId, nickname } = useParams(); // instructorId, reviewId, nickname 가져오기
    const navigate = useNavigate();

    const [reviewName, setReviewName] = useState("");
    const [reviewDetail, setReviewDetail] = useState("");
    const [rating, setRating] = useState(1);
    const [memberId] = useState(1); // 예시로 하드코딩된 memberId
    const [writerId, setWriterId] = useState(null); // writerId 상태 추가
    const [courses, setCourses] = useState([]); // 강의 목록 상태
    const [selectedCourseId, setSelectedCourseId] = useState(""); // 선택한 강의 ID


    useEffect(() => {
        const storedWriterId = localStorage.getItem("memberId"); // localStorage에서 memberId 가져오기
        if (storedWriterId) {
            setWriterId(storedWriterId); // writerId 상태 설정
        }

        // 리뷰 데이터 가져오기 (reviewId, nickname으로 리뷰 조회)
        fetch(`http://localhost:8080/members/instructor/${nickname}/reviews/${reviewId}`,{ withCredentials: true }, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setReviewName(data.reviewName);
                setReviewDetail(data.reviewDetail);
                setRating(data.rating);
                setSelectedCourseId(data.courseId); // 강의 ID 세팅
            })
            .catch(err => console.error("리뷰 가져오기 실패:", err));

        // 강의 목록 가져오기
        fetch("http://localhost:8080/course/list") // 강의 목록 API 엔드포인트
            .then(res => res.json())
            .then(data => {
                setCourses(data);
            })
            .catch(err => console.error("강의 목록 가져오기 실패:", err));
    }, [nickname, reviewId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            reviewId, // reviewId 추가
            reviewName,
            reviewDetail,
            rating,
            reviewType: 'INSTRUCTOR', // 리뷰 타입 설정
            memberId, // 추가된 memberId
            nickname, // nickname 추가
            courseId: selectedCourseId, // 선택한 강의 ID 추가
            writerId, // writerId 추가
        };

        console.log("전송할 데이터:", reviewData);

        // PUT 요청에 reviewId 포함
        fetch(`http://localhost:8080/members/instructor/${nickname}/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
            credentials: 'include',
        },{ withCredentials: true })
            .then((res) => {
                if (res.ok) {
                    alert("리뷰가 성공적으로 수정되었습니다.");
                    navigate(`/members/instructor/${nickname}`); // 강사 상세 페이지로 이동
                } else {
                    throw new Error("리뷰 수정 실패");
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <FormContainer>
            <h2>리뷰 수정</h2>
            <Form onSubmit={handleSubmit}>
                <InputContainer>
                    <Label>리뷰 제목:</Label>
                    <Input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Label>리뷰 내용:</Label>
                    <TextArea
                        value={reviewDetail}
                        onChange={(e) => setReviewDetail(e.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Label>평점:</Label>
                    <Select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>{rate}</option>
                        ))}
                    </Select>
                </InputContainer>
                <InputContainer>
                    <Label>강의 선택:</Label>
                    <Select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)} required>
                        <option value="">강의를 선택하세요</option>
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.courseName} {/* courseName을 사용하여 강의 이름 표시 */}
                            </option>
                        ))}
                    </Select>
                </InputContainer>
                <ButtonContainer>
                    <SubmitButton type="submit">수정</SubmitButton>
                    <CancelButton type="button" onClick={() => navigate(`/members/instructor/${nickname}`)}>취소</CancelButton>
                </ButtonContainer>
            </Form>
        </FormContainer>
    );
};

export default InstructorReviewEdit;

// Styled Components는 기존 코드와 동일

// Styled Components
const FormContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    &:focus {
        border-color: #3cb371;
        outline: none;
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    height: 150px;
    resize: none;
    &:focus {
        border-color: #3cb371;
        outline: none;
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const SubmitButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #3cb371;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: #2a9d63;
    }
`;

const CancelButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #ccc;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: #bbb;
    }
`;
