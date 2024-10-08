-- 초기 멤버 3명 삽입
INSERT IGNORE INTO member (member_id, email, password, nickname, role,  phone_number, introduction, create_date)
                VALUES (1, 'ADMIN@gmail.com', '$2a$10$LCxJ1iaCREr0B7tWaNtIT.acyqGUZirHEiHdBMt0DzsOaH.ZYnz02', '관리자', 'ADMIN', '010-1234-5678', '안녕하세요 관리자입니다.', NOW());

INSERT IGNORE INTO member (member_id, email, password, nickname, role,  phone_number, introduction, create_date)
                VALUES (2, 'customer@gmail.com', '$2a$10$XT9BcCo4dRRXdZAo9aQFRuYR3nGg2cUjGSX9Mgb0nHcWWemSaetI6', '학생', 'USER', '010-1111-2222', '안녕하세요 학생입니다.', NOW());

INSERT IGNORE INTO member (member_id, email, password, nickname, role,  phone_number, introduction, create_date)
                VALUES (3, 'instructor@gmail.com', '$2a$10$eYec.uEZMP5yrBt8DtsifuQn14svVZOiD2qKq7sg4RjJT1c2OG0ra', '김영한', 'INSTRUCTOR', '010-3333-4444', '안녕하세요 김영한입니다.', NOW());

INSERT IGNORE INTO member (member_id, email, password, nickname, role,  phone_number, introduction, create_date)
        VALUES (4, 'instructor2@gmail.com', '$2a$10$eYec.uEZMP5yrBt8DtsifuQn14svVZOiD2qKq7sg4RjJT1c2OG0ra', '동빈나', 'INSTRUCTOR', '010-5555-6666', '안녕하세요 동빈나입니다.', NOW());

INSERT IGNORE INTO member (member_id, email, password, nickname, role,  phone_number, introduction, create_date)
        VALUES (5, 'instructor3@gmail.com', '$2a$10$eYec.uEZMP5yrBt8DtsifuQn14svVZOiD2qKq7sg4RjJT1c2OG0ra', '조코딩', 'INSTRUCTOR', '010-7777-8888', '안녕하세요 조코딩입니다.', NOW());

-- 초기 강의 데이터  삽입.
INSERT IGNORE INTO course (course_id, course_attribute, course_name,course_description, course_level, course_price, member_nickname, sale, course_created_date)
                   VALUES (1, 'JAVA', 'JPA 강의', 'JPA 학습', 5, 63000, '김영한', false, NOW());

INSERT IGNORE INTO course (course_id, course_attribute, course_name,course_description, course_level, course_price, member_nickname, sale, course_created_date)
                   VALUES (2, 'JAVA', '스프링 입문', '코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술', 3, 35000, '김영한', false, NOW());

INSERT IGNORE INTO course (course_id, course_attribute, course_name,course_description, course_level, course_price, member_nickname, sale, course_created_date)
                   VALUES (3, 'C', 'C 입문', '코드로 배우는 C언어', 4, 20000, '동빈나', false, NOW());

INSERT IGNORE INTO course (course_id, course_attribute, course_name,course_description, course_level, course_price, member_nickname, sale, course_created_date)
           VALUES (4, 'JAVASCRIPT', '자바스크립트 입문', '자바스크립트 기초 입문 강의 30분 완성', 1, 0, '조코딩', false, NOW());

INSERT IGNORE INTO course (course_id, course_attribute, course_name,course_description, course_level, course_price, member_nickname, sale, course_created_date)
                   VALUES (5, 'PYHTON', '파이썬 입문', '최신 파이썬  코딩 강의', 2, 5000, '조코딩', false, NOW());

-- 초기 동영상 데이터  삽입 --
INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (1, 1, 'SQL 중심적인 개발의 문제점' , 'JPA', 'https://www.youtube.com/watch?v=_tMJPysViNU&list=PLumVmq_uRGHgP87Jf1-up391q_es9KiZ9&index=4' , 0.0, 1554);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (2, 1, 'JPA 소개' , 'JPA', 'https://www.youtube.com/watch?v=nNNVb4l8tiA&list=PLumVmq_uRGHgP87Jf1-up391q_es9KiZ9&index=3' , 0.0, 1721);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (3, 2, '스프링 입문 강의 소개' , '스프링', 'https://www.youtube.com/watch?v=qyGjLVQ0Hog&list=PLumVmq_uRGHgBrimIp2-7MCnoPUskVMnd&index=1' , 0.0, 301);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (4, 2, '프로젝트생성' , '스프링', 'https://www.youtube.com/watch?v=NNClHeXzIBA&list=PLumVmq_uRGHgBrimIp2-7MCnoPUskVMnd&index=2' , 0.0, 990);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (5, 3, 'C언어 Hello Word' , 'C언어', 'https://www.youtube.com/watch?v=dh4hdtZ00EU&t=1s' , 0.0, 645);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (6, 3, 'C언어 변수' , 'C언어', 'https://www.youtube.com/watch?v=V7TXlm7kpaE' , 0.0, 915);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (7, 4, '자바스크립트 기초' , '자바스크립트', 'https://www.youtube.com/watch?v=E-PzX2mKGUQ&t=485s' , 0.0, 1889);

INSERT IGNORE INTO videos (video_id , course_id, description, title, url, current_video_time, total_video_duration)
                   VALUES (8, 5, '파이썬 기초' , '파이썬', 'https://www.youtube.com/watch?v=7ttbyGI5igA' , 0.0, 556);

-- 초기 강의 리뷰 데이터 2개 삽입
INSERT IGNORE INTO review (review_id,review_name, review_detail ,rating,review_type,course_id,member_id,review_created_date,review_updated_date)
VALUES (1, '강추합니다!' ,'유익해요!', 5, 'COURSE', 1, 2, NOW(),NOW());

INSERT IGNORE INTO review (review_id,review_name, review_detail ,rating,review_type,course_id,member_id,review_created_date,review_updated_date)
VALUES (2, '그냥 돈값해요!' ,'감안하고 들으세요', 3, 'COURSE', 1, 2, NOW(),NOW());

INSERT IGNORE INTO review (review_id,review_name, review_detail ,rating,review_type,course_id,member_id,review_created_date,review_updated_date)
VALUES (3, '강추합니다!' ,'유익해요!', 5, 'INSTRUCTOR', 2, 2, NOW(),NOW());

INSERT IGNORE INTO review (review_id,review_name, review_detail ,rating,review_type,course_id,member_id,review_created_date,review_updated_date)
VALUES (4, '그냥 돈값해요!' ,'감안하고 들으세요', 3, 'INSTRUCTOR', 2, 2, NOW(),NOW());


-- 초기 강의 새소식 데이터
-- 강의 1번
INSERT IGNORE INTO news (news_id, like_count, view_count, course_id, news_date, news_description, news_name)
VALUES (1, 0, 0, 1, NOW(), '강의의 일부분이 바뀌었습니다!!', '강의 변경공지');

INSERT IGNORE INTO news (news_id, like_count, view_count, course_id, news_date, news_description, news_name)
VALUES (2, 0, 0, 1, NOW(), '강의 30% 할인 이벤트입니다.', '강의 할인공지');
-- 강의 2번
INSERT IGNORE INTO news (news_id, like_count, view_count, course_id, news_date, news_description, news_name)
VALUES (3, 0, 0, 2, NOW(), '강의가 출시되었습니다.!!', '강의 출시공지');

INSERT IGNORE INTO news (news_id, like_count, view_count, course_id, news_date, news_description, news_name)
VALUES (4, 0, 0, 2, NOW(), '오픈기념 33% 할인 이벤트입니다.', '강의 할인공지');

-- 초기 수강 구매 목록 데이터 1개 삽입
INSERT IGNORE INTO member_course (member_course_id, member_id, course_id, purchase_date) VALUES (1, 2, 1, NOW());


-- 초기 강의 문의 데이터
INSERT IGNORE INTO course_inquiry(inquiry_id, course_id, member_id ,created_date ,inquiry_title, inquiry_content, inquiry_status)
VALUES(1, 1, 2, NOW(),'JAVA 설치 오류 문의합니다.', '설치에 대한 강의를 따로 만들어주세요.', 'PENDING');

INSERT IGNORE INTO course_inquiry(inquiry_id, course_id, member_id ,created_date ,inquiry_title, inquiry_content, inquiry_status)
VALUES(2, 1, 2, NOW(), '동영상 목소리가 너무 작습니다.', '목소리를 더 크게 내주세요.', 'PENDING');

INSERT IGNORE INTO course_inquiry(inquiry_id, course_id, member_id ,created_date ,inquiry_title, inquiry_content, inquiry_status)
VALUES(3, 2, 2, NOW(), '강의가 어려워요', '자세한 설명 부탁드립니다.', 'PENDING');

-- 초기 강의 문의 답변 데이터
INSERT IGNORE INTO course_answer(answer_id, inquiry_id, member_id, answer_content, answer_create_date)
VALUES(1, 1, 3, '추후 자세한 설치 강의 올리도록 하겠습니다.',NOW());

INSERT IGNORE INTO course_answer(answer_id, inquiry_id, member_id, answer_content, answer_create_date)
VALUES(2, 2, 3, '강의 소리를 더 크게 만들어서 재업로드 하겠습니다.',NOW());

INSERT IGNORE INTO course_answer(answer_id, inquiry_id, member_id, answer_content, answer_create_date)
VALUES(3, 3, 3, '어느 부분의 설명이 더 필요하실까요?',NOW());

INSERT IGNORE INTO course_answer(answer_id, inquiry_id, member_id, answer_content, answer_create_date)
VALUES(4, 3, 2, '스프링 빈에 대해서 더 설명해주세요.',NOW());

-- 초기 문의 데이터
INSERT IGNORE INTO inquiry(inquiry_id, inquiry_content, inquiry_create_date, inquiry_status, inquiry_title,
                           inquiry_update_date, member_id)
VALUES (1, CONCAT('러너 서비스 이용 중 오류가 발생했어요.', ' 로그인, 강의 수강 등 서비스 이용이 불가능합니다.'), NOW(),
        'CONFIRMING', '서비스 이용 오류', NOW(), 2);
INSERT IGNORE INTO inquiry(inquiry_id, inquiry_content, inquiry_create_date, inquiry_status, inquiry_title,
                           inquiry_update_date, member_id)
VALUES (2, CONCAT('구매했던 강의가 전부 사라졌어요.', ' 뭐가 문제일까요?'), NOW(),
        'ANSWERED', '강의 구매 관련 문의', NOW(), 2);
INSERT IGNORE INTO inquiry(inquiry_id, inquiry_content, inquiry_create_date, inquiry_status, inquiry_title,
                           inquiry_update_date, member_id)
VALUES (3, CONCAT('비밀번호를 찾고 싶어요.'), NOW(),
        'RESOLVED', '계정 문의', NOW(), 2);
INSERT IGNORE INTO inquiry(inquiry_id, inquiry_content, inquiry_create_date, inquiry_status, inquiry_title,
                           inquiry_update_date, member_id)
VALUES (4, CONCAT('회원 탈퇴하고 싶습니다.', ' 어떻게 해야 하나요?'), NOW(),
        'CONFIRMING', '회원 탈퇴 문의', NOW(), 1);

-- 초기 문의 답변 데이터
INSERT IGNORE INTO answer(answer_id, answer_content, answer_create_date, inquiry_id)
VALUES (1, CONCAT('잠깐! 지금 로그인하신 계정으로 구매하신 것이 맞으신가요?', ' 러너는 여러 개의 계정을 동시에 사용할 수 있어요. 소유하신 다른 계정이 있다면 확인 부탁드려요.'), NOW(),
        2);
INSERT IGNORE INTO answer(answer_id, answer_content, answer_create_date, inquiry_id)
VALUES (2, CONCAT('로그인 화면에서 ''비밀번호 찾기''를 클릭해주세요.', ' 사용 중인 계정을 입력하면 이메일을 통해 비밀번호 변경 링크를 보내드려요.'), NOW(),
        3);

-- 초기 학습테이블 데이터
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (1, 3, '2024-10-06', 55, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (2, 2, '2024-10-08', 30, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (3, 1, '2024-10-09', 25, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (4, 5, '2024-10-03', 70, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (5, 1, '2024-10-04', 15, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (6, 3, '2023-01-06', 55, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (7, 1, '2023-01-25', 15, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (8, 6, '2023-02-17', 100, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (9, 3, '2023-11-06', 55, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (10, 21, '2023-11-15', 120, 2);
INSERT IGNORE INTO study_table(study_table_id, completed, study_date, study_time, member_id)
VALUES (11, 8, '2023-12-06', 100, 2);