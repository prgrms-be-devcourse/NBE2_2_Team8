
//package edu.example.learner.course.service;
//
//import edu.example.learner.course.entity.Alarm;
//import edu.example.learner.alarm.entity.Priority;
//import edu.example.learner.course.entity.TemporaryMember;
//import edu.example.learner.course.repository.AlarmRepository;
//import jakarta.transaction.Transactional;
//import lombok.extern.log4j.Log4j2;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Log4j2
//@Transactional
//@Rollback(false)
//class AlarmServiceImplTest {
//
//    @Autowired
//    private AlarmService alarmService;
//    @Autowired
//    private TemporaryMemberService temporaryMemberService;
//    @Autowired
//    private AlarmRepository alarmRepository;
//
//    @BeforeEach
//    void setUp() {
//        TemporaryMember test = TemporaryMember.builder()
//                .name("test")
//                .email("test@example.com")
//                .build();
//        temporaryMemberService.register(test);
//        Alarm alarm = Alarm.builder().alarmId(1L)
//                .alarmTitle("test")
//                .priority(Priority.LOW)
//                .temporaryMember(test)
//                .alarmStatus(false)
//                .alarmType(edu.example.learner.course.entity.AlarmType.INQUIRY)
//                .build();
//        alarm = alarmRepository.save(alarm);
//
//    }
//    @Test
//    void add(){
//
//    }
//    @Test
//    void read(){
//        Alarm alarm = alarmRepository.findById(1L).orElseThrow();
//        System.out.println(alarm);
//    }
//
//}
