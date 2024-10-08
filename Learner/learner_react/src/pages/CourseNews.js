import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

export default function CourseNews() {
    const { courseId, newsId } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [liked, setLiked] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    const [instructorName, setInstructorName] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        checkUserRole();
        fetchInstructorName();
        if (localStorage.getItem('memberId')) {
            checkLikeStatus(); // 좋아요 여부 체크
        }
        fetchNewsData();
    }, [courseId, newsId]);

    const fetchInstructorName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/course/${courseId}/member-nickname`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const nickname = await response.text();
            setInstructorName(nickname);
        } catch (err) {
            console.error("Failed to fetch instructor nickname:", err);
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    const checkUserRole = async () => {
        try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authorization='))
                ?.split('=')[1];

            if (token) {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.role);
                const nickname = decodedToken.mid;
                setUserName(nickname); // 닉네임을 상태에 설정
            }
        } catch (error) {
            console.error("토큰 확인 중 오류 발생:", error);
        }
    };

    const checkLikeStatus = async () => {
        const memberId = localStorage.getItem('memberId');
        try {
            const res = await fetch(`http://localhost:8080/course/${courseId}/news/${newsId}/like?memberId=${memberId}`, {
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Failed to fetch like status');

            const data = await res.json();
            setLiked(data); // 현재 좋아요 상태 설정
        } catch (err) {
            console.error("좋아요 상태 확인 실패:", err);
        }
    };

    const fetchNewsData = async () => {
        try {
            const res = await fetch(`http://localhost:8080/course/${courseId}/news/${newsId}`, {
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to fetch news');
            const data = await res.json();
            setNews(data);
            // 좋아요 여부는 checkLikeStatus에서 설정하므로 여기서 초기화하지 않음
        } catch (err) {
            console.error("새소식 가져오기 실패:", err);
            alert('새소식을 불러오는데 실패했습니다.');
            navigate(`/courses/${courseId}`);
        }
    };

    const likeNews = async () => {
        const memberId = localStorage.getItem('memberId');

        // memberId가 없으면 알림 표시하고 함수 종료
        if (!memberId) {
            alert('로그인 후 시도해주세요.');
            return;
        }

        const requestData = {
            memberId: parseInt(memberId),
            newsId: parseInt(newsId)
        };

        try {
            const method = liked ? 'DELETE' : 'PATCH'; // 상태에 따라 메소드 결정

            // 좋아요 상태 업데이트 요청
            const likeRes = await fetch(`http://localhost:8080/course/${courseId}/news/${newsId}/like`, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!likeRes.ok) throw new Error('Failed to update like status');

            await likeRes.text();

            // 상태를 반전시키고 좋아요 수 업데이트
            setLiked(!liked);
            setNews(prev => ({
                ...prev,
                likeCount: liked ? prev.likeCount - 1 : prev.likeCount + 1
            }));
        } catch (err) {
            console.error(`${liked ? '좋아요 취소 실패' : '좋아요 실패'}:`, err);
            alert('좋아요 처리 중 오류가 발생했습니다.');
        }
    };


    const deleteNews = () => {
        if (!window.confirm('정말로 이 새소식을 삭제하시겠습니까?')) {
            return;
        }

        fetch(`http://localhost:8080/course/${courseId}/news/${newsId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete news');
                alert('새소식이 성공적으로 삭제되었습니다.');
                navigate(`/courses/${courseId}`);
            })
            .catch(err => {
                console.error("새소식 삭제 실패:", err);
                alert('새소식 삭제 중 오류가 발생했습니다.');
            });
    };

    const canCreateNews = () => {
        return (userRole === 'INSTRUCTOR' && userName === instructorName) ||
            userRole === 'ADMIN';
    };

    const handleUpdateNews = () => {
        if (canCreateNews()) {
            navigate(`/courses/${courseId}/news/${newsId}/edit`);
        } else {
            alert('새소식 수정은 강사 또는 관리자만 가능합니다.');
        }
    };

    if (isLoading) {
        return <div>로딩 중...</div>; // Show loading state
    }

    if (!news) {
        return <div>뉴스를 찾을 수 없습니다.</div>; // Handle the case where news is not found
    }

    return (
        <NewsContainer>
            <NewsHeader>{news.newsName}</NewsHeader>
            <NewsMetaInfo>
                <span>작성일: {new Date(news.newsDate).toLocaleDateString()}</span>
                <span>조회수: {news.viewCount}</span>
                <span>좋아요: {news.likeCount}</span>
            </NewsMetaInfo>
            <NewsContent>{news.newsDescription}</NewsContent>
            <NewsFooter>
                <span>마지막 수정일: {new Date(news.lastModifiedDate).toLocaleString()}</span>
                <ButtonContainer>
                    <LikeButton onClick={likeNews} $liked={liked}>
                        {liked ? '좋아요 취소' : '좋아요'}
                    </LikeButton>
                    {canCreateNews() && (
                        <>
                            <EditButton onClick={handleUpdateNews}>
                                수정하기
                            </EditButton>
                            <DeleteButton onClick={deleteNews}>
                                삭제하기
                            </DeleteButton>
                        </>
                    )}
                </ButtonContainer>
            </NewsFooter>
        </NewsContainer>
    );
}

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const NewsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NewsHeader = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
`;

const NewsMetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    span {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
`;

const NewsContent = styled.div`
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 20px;
    min-height: 200px;
    white-space: pre-wrap;
`;

const NewsFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
    padding-top: 10px;
    border-top: 1px solid #eee;
`;

const LikeButton = styled.button`
    padding: 8px 16px;
    background-color: ${props => (props.$liked ? '#e74c3c' : '#3498db')};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => (props.$liked ? '#c0392b' : '#2980b9')};
    }
`;

const EditButton = styled.button`
    padding: 8px 16px;
    background-color: #f39c12;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #e67e22;
    }
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #c0392b;
    }
`;
