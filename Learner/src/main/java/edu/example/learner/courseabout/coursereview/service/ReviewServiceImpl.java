package edu.example.learner.courseabout.coursereview.service;

import edu.example.learner.courseabout.course.entity.Course;
import edu.example.learner.courseabout.course.service.CourseServiceImpl;
import edu.example.learner.courseabout.coursereview.dto.ReviewDTO;
import edu.example.learner.courseabout.coursereview.entity.Review;
import edu.example.learner.courseabout.coursereview.entity.ReviewType;
import edu.example.learner.courseabout.exception.ReviewException;
import edu.example.learner.courseabout.coursereview.repository.ReviewRepository;
import edu.example.learner.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final CourseServiceImpl courseService;
    private final MemberService memberService;

    @Override
    @Transactional
    public ReviewDTO createReview(ReviewDTO reviewDTO, ReviewType reviewType) {
        try {
            Course course = courseService.readReview(reviewDTO.getCourseId()).toEntity();
            System.out.println(course);

            log.info("Creating review for course {}", course);

            if (reviewDTO.getWriterId() == null) {
                throw ReviewException.NOT_LOGIN.get();
            }

            reviewDTO.setReviewType(reviewType);

            Review review = reviewDTO.toEntity();
            System.out.println(review);
            reviewRepository.save(review);
            return new ReviewDTO(review);
        } catch (Exception e) {
            log.error("--- e : " + e);
            log.error("--- " + e.getMessage()); //에러 로그로 발생 예외의 메시지를 기록하고
            throw ReviewException.NOT_REGISTERED.get();
        }
    }

    @Override
    public ReviewDTO getReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewException.NOT_FOUND::get);
        return new ReviewDTO(review);
    }

    @Override
    public ReviewDTO updateReview(Long reviewId, ReviewDTO reviewDTO) {
        Course course = courseService.read(reviewDTO.getCourseId()).toEntity();
        System.out.println(course);

        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewException.NOT_FOUND::get);
        if (review.getMember().getMemberId() != reviewDTO.getWriterId()) {
            throw ReviewException.NOT_MATCHED_REVIEWER.get();
        }
        if (reviewDTO.getRating() == 0) {
            reviewDTO.setRating(1);
        }
        reviewDTO.setReviewDetail(review.getReviewDetail());

        Review newReview = reviewDTO.toEntity();

        try {
            review.changeReviewName(newReview.getReviewName());
            review.changeReviewDetail(newReview.getReviewDetail());
            review.changeRating(newReview.getRating());

            reviewRepository.save(review);
            return new ReviewDTO(review);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw ReviewException.NOT_MODIFIED.get();
        }
    }

    @Override
    public void deleteReview(Long reviewId, ReviewDTO reviewDTO) {
        log.info(reviewDTO);
        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewException.NOT_FOUND::get);

        if (review.getMember().getMemberId() != reviewDTO.getWriterId()) {
            throw ReviewException.NOT_MATCHED_REVIEWER.get();
        }

        try {
            reviewRepository.delete(review);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw ReviewException.NOT_REMOVED.get();
        }
    }

    @Override
    public List<ReviewDTO> getCourseReviewList(Long courseId) {

        // COURSE인 리뷰만 가져오기 위해 필터링
        List<Review> reviewList = reviewRepository.getCourseReview(courseId).orElse(null);
        List<ReviewDTO> reviewDTOList = new ArrayList<>();

        if (reviewList == null || reviewList.isEmpty()) {
            return reviewDTOList;
        }

        // 리뷰 타입이 COURSE인 것만 필터링
        reviewList.stream()
                .filter(review -> review.getReviewType() == ReviewType.COURSE)
                .forEach(review -> {
                    reviewDTOList.add(ReviewDTO.builder()
                            .reviewId(review.getReviewId())
                            .reviewName(review.getReviewName())
                            .reviewDetail(review.getReviewDetail())
                            .rating(review.getRating())
                            .reviewType(review.getReviewType())
                            .reviewUpdatedDate(review.getReviewUpdatedDate())
                            .writerId(review.getMember().getMemberId())
                            .courseId(courseId)
                            .writerName(review.getMember().getNickname())
                            .nickname(review.getCourse().getMember().getNickname())
                            .build());
                });

        return reviewDTOList;
    }


    @Override
    public List<ReviewDTO> getInstructorReviewList(Long courseId, String nickname) {
        List<Review> reviewList = reviewRepository.getInstructorReview(nickname).orElse(null);

        List<ReviewDTO> reviewDTOList = new ArrayList<>();
        if (reviewList == null || reviewList.isEmpty()) {
            return reviewDTOList;
        }

        // 리뷰 타입이 INSTRUCTOR인 것만 필터링
        reviewList.stream()
                .filter(review -> review.getReviewType() == ReviewType.INSTRUCTOR)
                .forEach(review -> {
                    reviewDTOList.add(ReviewDTO.builder()
                            .reviewId(review.getReviewId())
                            .reviewName(review.getReviewName())
                            .reviewDetail(review.getReviewDetail())
                            .rating(review.getRating())
                            .reviewType(review.getReviewType())
                            .reviewUpdatedDate(review.getReviewUpdatedDate())
                            .writerId(review.getMember().getMemberId())
                            .courseName(review.getCourse().getCourseName())
                            .courseId(courseId)
                            .nickname(nickname)
                            .writerName(review.getMember().getNickname())
                            .build());
                });

        return reviewDTOList;
    }

    @Override
    public ReviewDTO readReview(String nickname, Long reviewId) {
        List<Review> reviewList = reviewRepository.getInstructorReview(nickname).orElse(null);

        if (reviewList == null || reviewList.isEmpty()) {
            return new ReviewDTO();
        }

        // 리뷰 타입이 INSTRUCTOR이고, reviewId가 일치하는 리뷰 필터링
        return reviewList.stream()
                .filter(review -> review.getReviewType() == ReviewType.INSTRUCTOR && review.getReviewId().equals(reviewId))
                .findFirst() // 첫 번째 일치하는 리뷰 찾기
                .map(review -> ReviewDTO.builder()
                        .reviewId(review.getReviewId())
                        .reviewName(review.getReviewName())
                        .reviewDetail(review.getReviewDetail())
                        .rating(review.getRating())
                        .reviewType(review.getReviewType())
                        .reviewUpdatedDate(review.getReviewUpdatedDate())
                        .writerId(review.getMember().getMemberId())
                        .courseName(review.getCourse().getCourseName())
                        .courseId(review.getCourse().getCourseId())
                        .nickname(nickname)
                        .writerName(review.getMember().getNickname())
                        .build())
                .orElse(null); // 조건에 맞는 리뷰가 없을 경우 null 반환
    }

    public ReviewDTO readReview(Long courseId, Long reviewId) {
        List<Review> reviewList = reviewRepository.getCourseReview(courseId).orElse(null);

        if (reviewList == null || reviewList.isEmpty()) {
            return new ReviewDTO();
        }

        // 리뷰 타입이 COURSE이고, reviewId가 일치하는 리뷰 필터링
        ReviewDTO reviewDTO = reviewList.stream()
                .filter(review -> review.getReviewType() == ReviewType.COURSE && review.getReviewId().equals(reviewId))
                .findFirst() // 첫 번째 일치하는 리뷰 찾기
                .map(review -> ReviewDTO.builder()
                        .reviewId(review.getReviewId())
                        .reviewName(review.getReviewName())
                        .reviewDetail(review.getReviewDetail())
                        .rating(review.getRating())
                        .reviewType(review.getReviewType())
                        .reviewUpdatedDate(review.getReviewUpdatedDate())
                        .writerId(review.getMember().getMemberId())
                        .courseName(review.getCourse().getCourseName())
                        .courseId(courseId)
                        .nickname(review.getCourse().getMember().getNickname())
                        .writerName(review.getMember().getNickname())
                        .build())
                .orElse(null);// 조건에 맞는 리뷰가 없을 경우 null 반환
        System.out.println(reviewDTO);
        return reviewDTO;
    }


}