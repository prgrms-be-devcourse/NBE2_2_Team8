package edu.example.learner.courseInquiry.repository;

import edu.example.learner.courseabout.courseqna.dto.CourseInquiryDTO;
import edu.example.learner.courseabout.courseqna.entity.CourseInquiry;
import edu.example.learner.courseabout.courseqna.entity.InquiryStatus;
import edu.example.learner.courseabout.courseqna.repository.CourseInquiryRepository;
import edu.example.learner.courseabout.courseqna.service.CourseInquiryService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static edu.example.learner.courseabout.courseqna.entity.InquiryStatus.ANSWERED;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Log4j2
public class CourseInquiryRepositoryTests {
    @Autowired
    private CourseInquiryRepository courseInquiryRepository;
    @Autowired
    private CourseInquiryService courseInquiryService;


    @Test
    @DisplayName("강의 문의 등록 테스트")
    public void testRegister() {
        CourseInquiryDTO courseInquiryDTO = CourseInquiryDTO.builder()
                .courseId(1L)
                .memberId(1L)
                .inquiryTitle("Test Inquiry Title")
                .inquiryContent("Test Inquiry Content")
                .createdDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .inquiryStatus(InquiryStatus.PENDING)
                .inquiryGood(0L)
                .build();

        CourseInquiryDTO savedInquiry = courseInquiryService.register(courseInquiryDTO);

        assertThat(savedInquiry).isNotNull();
        assertThat(savedInquiry.getInquiryId()).isNotNull();
        assertThat(savedInquiry.getInquiryTitle()).isEqualTo(courseInquiryDTO.getInquiryTitle());
    }

    @Test
    @DisplayName("강의 문의 전체 조회 테스트")
    public void testReadAll() {
        List<CourseInquiry> inquiries = courseInquiryRepository.findAll();
        assertThat(inquiries).isNotEmpty();
    }

    @Test
    @DisplayName("강의 문의 조회 테스트")
    public void testRead(){
        Long inquiryId = 1L;

        CourseInquiryDTO foundInquiry = courseInquiryService.read(inquiryId);

        assertThat(foundInquiry).isNotNull();
        assertThat(foundInquiry.getInquiryId()).isEqualTo(inquiryId);
    }


    @Test
    @DisplayName("강의 문의 수정 테스트")
    public void testUpdate() {
        // 초기 데이터 세팅
        CourseInquiryDTO courseInquiryDTO = CourseInquiryDTO.builder()
                .courseId(1L)
                .memberId(1L)
                .inquiryTitle("Update Test")
                .inquiryContent("Before update.")
                .inquiryStatus(InquiryStatus.PENDING)
                .createdDate(LocalDateTime.now())
                .build();

        CourseInquiryDTO registeredDTO = courseInquiryService.register(courseInquiryDTO);

        registeredDTO.setInquiryTitle("Updated Title");
        registeredDTO.setInquiryContent("After update.");

        CourseInquiryDTO updatedDTO = courseInquiryService.update(registeredDTO);

        assertThat(updatedDTO.getInquiryTitle()).isEqualTo("Updated Title");
        assertThat(updatedDTO.getInquiryContent()).isEqualTo("After update.");
    }

    @Test
    @DisplayName("강의 문의 상태 변경 테스트")
    public void testStatusUpdate(){
        Long inquiryId = 1L;
        InquiryStatus inquiryStatus = ANSWERED;

        Optional<CourseInquiry> foundCourseInquiry = courseInquiryRepository.findById(inquiryId);
        CourseInquiry updateCourseInquiry = foundCourseInquiry.get();
        updateCourseInquiry.changeInquiryStatus(inquiryStatus);

        courseInquiryRepository.save(updateCourseInquiry);

        foundCourseInquiry = courseInquiryRepository.findById(inquiryId);
        assertThat(foundCourseInquiry.get().getInquiryStatus()).isEqualTo(inquiryStatus);
    }


    @Test
    @DisplayName("강의 문의 삭제 테스트")
    public void testDelete() {
        CourseInquiry courseInquiry = CourseInquiry.builder()
                .courseId(1L)
                .memberId(1L)
                .inquiryTitle("Delete Test")
                .inquiryContent("This will be deleted.")
                .inquiryStatus(InquiryStatus.PENDING)
                .createdDate(LocalDateTime.now())
                .build();

        CourseInquiry savedCourseInquiry = courseInquiryRepository.save(courseInquiry);

        courseInquiryRepository.deleteById(savedCourseInquiry.getInquiryId());

        Optional<CourseInquiry> deletedCourseInquiry = courseInquiryRepository.findById(savedCourseInquiry.getInquiryId());
        assertThat(deletedCourseInquiry).isEmpty();
    }

}
