import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

const CourseInquiryList = ({ courseId }) => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [editAnswerId, setEditAnswerId] = useState(null);
    const [updatedAnswer, setUpdatedAnswer] = useState("");
    const [inquiryStatus, setInquiryStatus] = useState("PENDING");

    const [userRole, setUserRole] = useState(null); // 사용자 역할 저장
    const [userId, setUserId] = useState(null); // 사용자 ID 저장

    // 문의 목록 불러오기
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/course/${courseId}/course-inquiry`, { withCredentials: true })
            .then((response) => {
                setInquiries(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching the course inquiries:", error);
                setLoading(false);
            });

        fetchUserRoleAndId();
    }, [courseId]);

    // JWT 토큰에서 사용자 역할과 ID를 추출
    const fetchUserRoleAndId = () => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('Authorization='))
            ?.split('=')[1];

        if (token) {
            const decodedToken = jwtDecode(token); // 토큰 디코딩
            const normalizedRole = decodedToken.role.toLowerCase();
            setUserRole(normalizedRole);
            setUserId(decodedToken.mid);
            console.log("Role : ", normalizedRole)
        }
    };

    // 문의 클릭 시 상세 정보 불러오기
    const handleInquiryClick = (inquiryId) => {
        setLoadingDetail(true);
        axios
            .get(`http://localhost:8080/course/${courseId}/course-inquiry`, { withCredentials: true })
            .then((response) => {
                const inquiry = response.data.find((item) => item.inquiryId === inquiryId);
                if (inquiry) {
                    setSelectedInquiry(inquiry);
                    setInquiryStatus(inquiry.inquiryStatus);
                } else {
                    console.error("해당 inquiryId의 문의를 찾을 수 없습니다.");
                }
                return axios.get(`http://localhost:8080/course/${courseId}/course-answer/${inquiryId}`, { withCredentials: true });
            })
            .then((response) => {
                setAnswers(response.data);
                setLoadingDetail(false);
            })
            .catch((error) => {
                console.error("Error fetching inquiry details or answers:", error);
                setLoadingDetail(false);
            });
    };

    // 답변 제출
    const handleAnswerSubmit = () => {
        if (!newAnswer.trim()) {
            console.error("No selected inquiry or empty answer");
            return;
        }

        const memberId = localStorage.getItem("memberId");
        if (!memberId) {
            console.error("로그인된 사용자의 memberId를 찾을 수 없습니다.");
            alert("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
            return;
        }

        axios
            .post(`http://localhost:8080/course/${courseId}/course-answer`, {
                inquiryId: selectedInquiry.inquiryId,
                answerContent: newAnswer,
                memberId: memberId,
            }, { withCredentials: true })
            .then(() => {
                return axios.get(
                    `http://localhost:8080/course/${courseId}/course-answer/${selectedInquiry.inquiryId}`,
                    { withCredentials: true }
                );
            })
            .then((response) => {
                setAnswers(response.data);
                setNewAnswer("");
            })
            .catch((error) => {
                console.error("Error posting the answer:", error);
            });
    };

    // 문의 상태 변경
    const handleStatusChange = (status) => {
        axios
            .put(`http://localhost:8080/course/${courseId}/course-inquiry/${selectedInquiry.inquiryId}/status`, {
                inquiryStatus: status,
            }, { withCredentials: true })
            .then(() => {
                alert("문의 상태가 변경되었습니다.");
                setInquiryStatus(status);
            })
            .catch((error) => {
                console.error("Error updating inquiry status:", error);
            });
    };

    // 문의 삭제
    const handleDeleteInquiry = (inquiryId) => {
        if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
            axios
                .delete(`http://localhost:8080/course/${courseId}/course-inquiry/${inquiryId}`, { withCredentials: true })
                .then(() => {
                    alert("문의가 성공적으로 삭제되었습니다.");
                    setInquiries(inquiries.filter((inquiry) => inquiry.inquiryId !== inquiryId));
                    setSelectedInquiry(null);
                })
                .catch((error) => {
                    console.error("Error deleting inquiry:", error);
                });
        }
    };

    // 답변 수정
    const handleEditAnswerClick = (answer) => {
        setEditAnswerId(answer.answerId); // 수정할 답변 ID 설정
        setUpdatedAnswer(answer.answerContent); // 기존 답변 내용을 수정란에 미리 설정
    };

    const handleEditAnswerSubmit = (answerId) => {
        axios
            .put(`http://localhost:8080/course/${courseId}/course-answer/${answerId}`, {
                answerContent: updatedAnswer,
            }, { withCredentials: true })
            .then(() => {
                alert("답변이 성공적으로 수정되었습니다.");
                setEditAnswerId(null);
                setUpdatedAnswer("");
                return axios.get(
                    `http://localhost:8080/course/${courseId}/course-answer/${selectedInquiry.inquiryId}`,
                    { withCredentials: true }
                );
            })
            .then((response) => {
                setAnswers(response.data);
            })
            .catch((error) => {
                console.error("Error updating answer:", error);
            });
    };

    // 답변 삭제
    const handleDeleteAnswer = (answerId, answerMemberId) => {
        // answerMemberId와 userId가 일치하는지 확인
        if (answerMemberId !== userId && userRole !== "admin" && userRole !== "instructor") {
            alert("작성자만 답변을 삭제할 수 있습니다.");
            return;
        }

        if (window.confirm("정말로 이 답변을 삭제하시겠습니까?")) {
            axios
                .delete(`http://localhost:8080/course/${courseId}/course-answer/${answerId}`, { withCredentials: true })
                .then(() => {
                    alert("답변이 성공적으로 삭제되었습니다.");
                    setAnswers(answers.filter((answer) => answer.answerId !== answerId));
                })
                .catch((error) => {
                    console.error("Error deleting answer:", error);
                });
        }
    };


    // 답변 수정 취소 함수 추가
    const handleCancelEdit = () => {
        setEditAnswerId(null);  // 수정 상태 해제
        setUpdatedAnswer("");   // 입력란 초기화
    };

    // 작성자 프로필 이동
    const handleMemberClick = (memberId) => {
        axios
            .get(`http://localhost:8080/members/${memberId}`, { withCredentials: true })
            .then((response) => {
                const memberData = response.data;
                navigate(`/members/${memberId}`, { state: { memberData } });  // 사용자 정보 페이지로 이동
            })
            .catch((error) => {
                console.error("Error fetching member details:", error);
            });
    };

    //프로필 이미지 처리 방식
    const profileImageSrc = selectedInquiry && selectedInquiry.profileImage
        ? `data:image/jpeg;base64,${selectedInquiry.profileImage}`
        : "http://localhost:8080/images/default_profile.jpg";

    return (
        <>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <>
                    <ButtonContainer>
                        {selectedInquiry ? (
                            <>
                                <BeforeButton onClick={() => setSelectedInquiry(null)}>이전 목록으로</BeforeButton>
                                {(userRole === "admin" || userRole === "instructor") && (
                                    <DeleteInquiryButton onClick={() => handleDeleteInquiry(selectedInquiry.inquiryId)}>
                                        문의 삭제
                                    </DeleteInquiryButton>
                                )}
                            </>
                        ) : (
                            <WriteButton onClick={() => navigate(`/courses/${courseId}/post`)}>글 작성하기</WriteButton>
                        )}
                    </ButtonContainer>

                    {selectedInquiry ? (
                        loadingDetail ? (
                            <p>문의 상세 정보를 로딩 중입니다...</p>
                        ) : (
                            <>
                                <InquiryDetail>
                                    <h3>{selectedInquiry.inquiryTitle}</h3>
                                    <p>
                                        <span style={{ whiteSpace: "pre-line" }}>{selectedInquiry.inquiryContent}</span>
                                    </p>
                                    <p style={{fontSize: "0.9rem", color: "#555", marginTop: "3rem"}}>
                                        <ProfileImage
                                            src={profileImageSrc}
                                            alt="작성자 프로필"
                                        />
                                        <span
                                            style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                                            onClick={() => handleMemberClick(selectedInquiry.memberId)}
                                        >
                                            작성자: {selectedInquiry.memberNickname || '알 수 없음'}
                                        </span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 작성일:{" "}
                                        {new Date(selectedInquiry.createdDate).toLocaleDateString()}
                                    </p>
                                </InquiryDetail>

                                {(userRole === "admin" || userRole === "instructor") && (
                                    <StatusSelect value={inquiryStatus} onChange={(e) => handleStatusChange(e.target.value)}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="ANSWERED">ANSWERED</option>
                                        <option value="RESOLVED">RESOLVED</option>
                                    </StatusSelect>
                                )}

                                <AnswerList>
                                    <h4>답변 목록</h4>
                                    {answers.length > 0 ? (
                                        answers.map((answer) => {
                                            const answerProfileImageSrc = answer && answer.member && answer.member.profileImage
                                                ? `data:image/jpeg;base64,${answer.member.profileImage}`
                                                : "http://localhost:8080/images/default_profile.jpg";

                                            return (
                                                <AnswerItem key={answer.answerId}>
                                                    {editAnswerId === answer.answerId ? (
                                                        // 수정 폼
                                                        <>
                                                            <textarea
                                                                style={{ width: "100%", height: "100px", fontSize: "1rem" }}
                                                                value={updatedAnswer}
                                                                onChange={(e) => setUpdatedAnswer(e.target.value)} // 수정된 내용 반영
                                                            />
                                                            <UpdateSubmitButton onClick={() => handleEditAnswerSubmit(answer.answerId)}>
                                                                수정 제출
                                                            </UpdateSubmitButton>
                                                            <CancelButton onClick={handleCancelEdit}>
                                                                취소
                                                            </CancelButton>
                                                        </>
                                                    ) : (
                                                        // 수정 중이 아닐 때 기존 답변 표시
                                                        <>
                                                            <p>{answer.answerContent}</p>
                                                            <p style={{fontSize: "0.9rem", color: "#555", marginTop: "3rem"}}>
                                                                <ProfileImage
                                                                    src={answerProfileImageSrc}
                                                                    alt="작성자 프로필"
                                                                />
                                                                <span
                                                                    style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                                                                    onClick={() => handleMemberClick(answer.member.memberId)}
                                                                >
                                                                    작성자: {answer.member.nickname || '알 수 없음'}
                                                                </span>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 작성일: {new Date(answer.answerCreateDate).toLocaleDateString()}
                                                            </p>
                                                            {(userRole === "admin" || userRole === "instructor") && (
                                                                <>
                                                                    <AnswerButton onClick={() => handleEditAnswerClick(answer)}>
                                                                        수정
                                                                    </AnswerButton>
                                                                    <AnswerButton
                                                                        onClick={() => handleDeleteAnswer(answer.answerId, answer.member.memberId)}
                                                                        style={{ marginLeft: "10px" }}
                                                                    >
                                                                        삭제
                                                                    </AnswerButton>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </AnswerItem>
                                            );
                                        })
                                    ) : (
                                        <p>답변이 없습니다.</p>
                                    )}
                                </AnswerList>

                                <AnswerForm>
                                    <textarea
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            fontSize: "1rem",
                                        }}
                                        value={newAnswer}
                                        onChange={(e) => setNewAnswer(e.target.value)}
                                        placeholder="답변 내용을 입력하세요"
                                    />
                                    <SubmitButton onClick={handleAnswerSubmit}>답변 달기</SubmitButton>
                                </AnswerForm>
                            </>
                        )
                    ) : (
                        inquiries.length > 0 ? (
                            <InquiryList>
                                {inquiries.map((inquiry) => {
                                    // inquiry 별로 개별적으로 inquiryProfileImageSrc 생성
                                    const inquiryProfileImageSrc = inquiry && inquiry.profileImage
                                        ? `data:image/jpeg;base64,${inquiry.profileImage}`
                                        : "http://localhost:8080/images/default_profile.jpg"; // 기본 이미지 경로

                                    return (
                                        <InquiryItem key={inquiry.inquiryId} onClick={() => handleInquiryClick(inquiry.inquiryId)}>
                                            <p>
                                                <strong>{inquiry.inquiryTitle}</strong>
                                            </p>
                                            <p style={{ fontSize: "0.9rem", color: "#555" }}>
                                                <ProfileImage
                                                    src={inquiryProfileImageSrc}  // 문의마다 다른 이미지 소스 사용
                                                    alt="작성자 프로필"
                                                />
                                                <span
                                                    style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
                                                    onClick={() => handleMemberClick(inquiry.memberId)}
                                                >
                                                    작성자: {inquiry.memberNickname || '알 수 없음'}
                                                </span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 작성일: {new Date(inquiry.createdDate).toLocaleDateString()}
                                            </p>
                                        </InquiryItem>
                                    );
                                })}
                            </InquiryList>
                        ) : (
                            <p>문의가 없습니다.</p>
                        )
                    )}
                </>
            )}
        </>
    );
};

export default CourseInquiryList;

// 스타일 컴포넌트들...

const InquiryList = styled.div`
    margin-top: 1rem;
`;

const InquiryItem = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

const InquiryDetail = styled.div`
    margin-top: 1rem;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnswerList = styled.div`
    margin-top: 1.5rem;
`;

const AnswerItem = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const AnswerForm = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
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

const UpdateSubmitButton = styled.button`
    padding: 0.25rem 0.75rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    background-color: #3cb371;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #2a9d63;
    }
`;

const CancelButton = styled.button`
    padding: 0.255rem 0.75rem;
    background-color: #ccc;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #bbb;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;

const WriteButton = styled.button`
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

const BeforeButton = styled.button`
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

const DeleteInquiryButton = styled.button`
    padding: 0.75rem 1.5rem;
    margin-left: 0.5rem;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    &:hover {
        background-color: #c0392b;
    }
`;

const StatusSelect = styled.select`
    margin-top: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
`;

const AnswerButton = styled.button`
    padding: 0.25rem 0.75rem;
    background-color: #3cb371;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #2a9d63;
    }
`;

const ProfileImage = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
    object-fit: cover;
    vertical-align: middle;
`;
