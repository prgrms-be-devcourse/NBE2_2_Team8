package edu.example.learner.courseabout.coursereview.service;

import edu.example.learner.courseabout.coursereview.dto.ReviewDTO;
import edu.example.learner.courseabout.coursereview.entity.ReviewType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO, ReviewType reviewType);
    ReviewDTO getReviewById(Long reviewId);
    ReviewDTO updateReview(Long reviewId, ReviewDTO reviewDTO);
    void deleteReview(Long reviewId);

    List<ReviewDTO> getCourseReviewList(Long courseId, ReviewDTO reviewDTO);
    List<ReviewDTO> getInstructorReviewList(Long courseId, String nickname, ReviewDTO reviewDTO);
}

