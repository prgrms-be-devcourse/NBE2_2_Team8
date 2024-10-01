package edu.example.learner.courseabout.course.controller;

import edu.example.learner.courseabout.course.dto.CourseDTO;
import edu.example.learner.courseabout.course.service.CourseService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/course")
public class CourseController {
    private final CourseService courseService;

    @PostMapping()
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {

        log.info("Creating course {}", courseDTO);

        return ResponseEntity.ok(courseService.addCourse(courseDTO));
    }

    @GetMapping("{courseId}")
    public ResponseEntity<CourseDTO> readCourse(@PathVariable Long courseId) {

        log.info("Reading course {}", courseId);
        return ResponseEntity.ok(courseService.read(courseId));
    }

    @GetMapping("/list")
    public ResponseEntity<List<CourseDTO>> readCourseList() {
        log.info("Reading course list");
        return ResponseEntity.ok(courseService.readAll());
    }

    @PutMapping("/update")
    public ResponseEntity<CourseDTO> updateCourse(@RequestBody CourseDTO courseDTO) {
        log.info("Updating course {}", courseDTO);
        return ResponseEntity.ok(courseService.updateCourse(courseDTO));
    }

    @DeleteMapping("{courseId}")
    public ResponseEntity<?> deleteCourse(@RequestParam Long courseId) {
        log.info("Deleting course {}", courseId);
        return ResponseEntity.ok(Map.of("delete","success"));
    }
}
