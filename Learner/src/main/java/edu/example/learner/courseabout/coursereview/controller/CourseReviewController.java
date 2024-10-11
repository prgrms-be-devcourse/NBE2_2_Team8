package edu.example.learner.courseabout.coursereview.controller;

import edu.example.learner.courseabout.course.service.CourseServiceImpl;
import edu.example.learner.courseabout.coursereview.dto.ReviewDTO;
import edu.example.learner.courseabout.coursereview.entity.ReviewType;
import edu.example.learner.courseabout.coursereview.service.ReviewServiceImpl;
import edu.example.learner.member.service.MemberService;
import edu.example.learner.security.auth.CustomUserPrincipal;
import io.lettuce.core.dynamic.annotation.Param;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/course/{courseId}/reviews")
@Log4j2
@Tag(name = "강의 리뷰 컨트롤러", description = "강의 리뷰 CRUD를 담당하는 컨트롤러입니다.")
public class CourseReviewController {

    private final ReviewServiceImpl reviewService;

    @PostMapping("/create")
    @Operation(summary = "Course Review 생성", description = "강의 리뷰를 생성합니다.")
    public ResponseEntity<ReviewDTO> create(
            @Parameter(description = "강의 리뷰 데이터") @RequestBody ReviewDTO reviewDTO) {
        log.info("Create review: " + reviewDTO);
        return ResponseEntity.ok(reviewService.createReview(reviewDTO, ReviewType.COURSE));
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "Course Review 조회", description = "강의 리뷰를 조회합니다.")
    public ResponseEntity<ReviewDTO> read(
            @Parameter(description = "강의 ID") @PathVariable Long courseId,
            @Parameter(description = "강의 리뷰 ID") @PathVariable("reviewId") Long reviewId) {
        return ResponseEntity.ok(reviewService.readReview(courseId, reviewId));
    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "Course Review 수정", description = "강의 리뷰를 수정합니다.")
    public ResponseEntity<ReviewDTO> update(
            @Parameter(description = "강의 리뷰 ID") @PathVariable("reviewId") Long reviewId,
            @Parameter(description = "강의 리뷰 데이터") @RequestBody ReviewDTO reviewDTO) {
        log.info("update Review: " + reviewDTO);
        return ResponseEntity.ok(reviewService.updateReview(reviewId, reviewDTO));
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Course Review 삭제", description = "강의 리뷰를 삭제합니다.")
    public ResponseEntity<Map<String, String>> remove(
            @Parameter(description = "강의 리뷰 ID") @PathVariable("reviewId") Long reviewId,
            @Parameter(description = "강의 리뷰 데이터") @RequestBody ReviewDTO reviewDTO) {
        log.info("Delete Review: " + reviewId);
        reviewService.deleteReview(reviewId, reviewDTO);
        return ResponseEntity.ok(Map.of("result", "success"));
    }

    @GetMapping("/list")
    @Operation(summary = "Course Review list 조회", description = "강의 리뷰 리스트를 조회합니다.")
    public ResponseEntity<List<ReviewDTO>> reviewList(
            @Parameter(description = "강의 ID")@PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok(reviewService.getCourseReviewList(courseId));
    }
}
