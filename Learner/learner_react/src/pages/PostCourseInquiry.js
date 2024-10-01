// PostCourseInquiry.js
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom"; // useParams와 useNavigate 추가

const PostCourseInquiry = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { courseId } = useParams(); // courseId를 URL에서 가져오기
    const navigate = useNavigate(); // 성공적으로 문의 등록 후 다시 목록으로 이동

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // POST 요청으로 문의 데이터를 서버에 전송
        axios.post("http://localhost:8080/api/v1/course-inquiry", {
            courseId: courseId,
            inquiryTitle: title,
            inquiryContent: content,
            inquiryStatus: "PENDING"
        })
            .then((response) => {
                console.log("문의 등록 성공:", response.data);
                // 문의 등록 후 문의 목록 페이지로 이동
                navigate(`/courses/${courseId}`);
            })
            .catch((error) => {
                console.error("문의 등록 실패:", error);
            });
    };

    return (
        <FormContainer>
            <h2>강의에 대한 문의를 작성해주세요.</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요"
                />
                <TextArea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="내용을 입력하세요"
                />
                <ButtonContainer>
                    <CancelButton type="button" onClick={() => navigate(`/courses/${courseId}`)}>취소</CancelButton>
                    <SubmitButton type="submit">등록</SubmitButton>
                </ButtonContainer>
            </Form>
        </FormContainer>
    );
};

export default PostCourseInquiry;

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

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.1rem;
    width: 100%;
    box-sizing: border-box;
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.1rem;
    width: 100%;
    height: 300px;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
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
