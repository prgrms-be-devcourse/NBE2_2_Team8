import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Courses from "./pages/Courses";
import PostCourse from "./pages/Course/PostCourse";
import PutCourse from "./pages/Course/PutCourse";
import CourseDetail from "./pages/CourseDetail";
import Orders from "./pages/Orders";
import OrderDetail from './pages/OrderDetail';
import OrderCreate from "./pages/OrderCreate";
import SignUp from "./pages/SignUp";
import LoginModal from "./components/LoginModal";
import PostCourseInquiry from "./pages/Course/PostCourseInquiry"
import CourseNews from "./pages/CourseNews";


function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Router>
            <Header openModal={openModal} />
            {isModalOpen && <LoginModal closeModal={closeModal} />}
            <Routes>
                <Route path="/" element={<Navigate to="/courses" />} /> {/* / 경로에서 /courses로 리다이렉트 */}
                <Route path="/courses" element={<Courses />} />
                <Route path="/post-course" element={<PostCourse />} />
                <Route path="/put-course/:courseId" element={<PutCourse />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/courses/:courseId/post" element={<PostCourseInquiry />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" component={<OrderDetail/>} />
                <Route path="/order/create" element={<OrderCreate/>} />
                <Route path="/courses/:courseId/news/:newsId" element={<CourseNews />} />
            </Routes>
        </Router>
    );
}

export default App;

