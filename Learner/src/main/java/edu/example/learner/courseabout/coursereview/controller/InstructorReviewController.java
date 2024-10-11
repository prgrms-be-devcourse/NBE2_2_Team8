package edu.example.learner.courseabout.coursereview.controller;

import edu.example.learner.courseabout.coursereview.dto.ReviewDTO;
import edu.example.learner.courseabout.coursereview.entity.ReviewType;
import edu.example.learner.courseabout.coursereview.service.ReviewServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/instructor/{nickname}/reviews")
@Log4j2
public class InstructorReviewController {

    private final ReviewServiceImpl reviewService;

    @PostMapping("/create")
    @Operation(summary = "Instructor Review 생성", description = "강사 리뷰를 생성합니다.")
    public ResponseEntity<ReviewDTO> create(
            @Parameter(description = "강사 리뷰 데이터")@RequestBody ReviewDTO reviewDTO) {
        log.info(reviewDTO.getWriterId());

        reviewDTO.setCourseId(reviewDTO.getCourseId());
        log.info("Create review: " + reviewDTO);

        return ResponseEntity.ok(reviewService.createReview(reviewDTO, ReviewType.INSTRUCTOR));
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "Instructor Review 조회", description = "강사 리뷰를 조회합니다.")
    public ResponseEntity<ReviewDTO> read(
            @Parameter(description = "강사 이름")@PathVariable String nickname,
            @Parameter(description = "강사 리뷰 ID")@PathVariable("reviewId") Long reviewId) {
        return ResponseEntity.ok(reviewService.readReview(nickname, reviewId));
    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "Instructor Review 수정", description = "강사 리뷰를 수정합니다.")
    public ResponseEntity<ReviewDTO> update(
            @Parameter(description = "강사 리뷰 ID") @PathVariable("reviewId") Long reviewId,
            @Parameter(description = "강사 리뷰 데이터") @RequestBody ReviewDTO reviewDTO) {

        log.info("update Review: " + reviewDTO);
        return ResponseEntity.ok(reviewService.updateReview(reviewId, reviewDTO));
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Instructor Review 삭제", description = "강사 리뷰를 삭제합니다.")
    public ResponseEntity<Map<String, String>> remove(
            @Parameter(description = "강사 리뷰 ID") @PathVariable("reviewId") Long reviewId,
            @Parameter(description = "강사 리뷰 데이터") @RequestBody ReviewDTO reviewDTO) {

        log.info("Delete Review: " + reviewId);

        reviewService.deleteReview(reviewId,reviewDTO);
        return ResponseEntity.ok(Map.of("result", "success"));
    }

    @GetMapping("/list")
    @Operation(summary = "Instructor Review list 조회", description = "강사 리뷰 리스트를 조회합니다.")
    public ResponseEntity<List<ReviewDTO>> reviewList(
            @Parameter(description = "강사 이름") @PathVariable("nickname") String nickname,
            @Parameter(description = "강사 리뷰 데이터") ReviewDTO reviewDTO) {
        Long courseId = reviewDTO.getCourseId();
        return ResponseEntity.ok(reviewService.getInstructorReviewList(courseId, nickname));
    }
}
