
import { Routes, Route } from "react-router-dom";
import { CommandLayout } from "./layouts/CommandLayout";
import { CommandPage } from "./features/command/CommandPage";
import { SectionPage } from "./features/command/SectionPage";
import { AcademicUniverse } from "./features/academic/AcademicUniverse";
import { CoursesPage } from "./features/academic/CoursesPage";
import { CourseCommandView } from "./features/academic/CourseCommandView";

export default function App() {
  return (
    <Routes>
      <Route element={<CommandLayout />}>
        <Route path="/" element={<CommandPage />} />
        <Route path="/academic" element={<AcademicUniverse />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseCommandView />} />
        <Route path="/section/:slug" element={<SectionPage />} />
      </Route>
    </Routes>
  );
}
