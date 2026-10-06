
import { Routes, Route } from "react-router-dom";
import { CommandLayout } from "./layouts/CommandLayout";
import { CommandPage } from "./features/command/CommandPage";
import { SectionPage } from "./features/command/SectionPage";
import { AcademicUniverse } from "./features/academic/AcademicUniverse";
import { CoursesPage } from "./features/academic/CoursesPage";
import { CourseCommandView } from "./features/academic/CourseCommandView";
import { ReviewQueue } from "./features/review/ReviewQueue";
import { ReviewTheater } from "./features/review/ReviewTheater";
import { DocumentStudio } from "./features/documents/DocumentStudio";
import { DocumentDetail } from "./features/documents/DocumentDetail";
import { TruthLog } from "./features/audit/TruthLog";
import { SecurityCenter } from "./features/security/SecurityCenter";
import { PeopleUniverse } from "./features/people/PeopleUniverse";
import { AIOperations } from "./features/ai/AIOperations";
import { BotCommandCenter } from "./features/bots/BotCommandCenter";
import { SystemOperations } from "./features/operations/SystemOperations";

export default function App() {
  return (
    <Routes>
      <Route element={<CommandLayout />}>
        <Route path="/" element={<CommandPage />} />
        <Route path="/academic" element={<AcademicUniverse />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseCommandView />} />
        <Route path="/review" element={<ReviewQueue />} />
        <Route path="/review/:id" element={<ReviewTheater />} />
        <Route path="/documents" element={<DocumentStudio />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/audit" element={<TruthLog />} />
        <Route path="/security" element={<SecurityCenter />} />
        <Route path="/people" element={<PeopleUniverse />} />
        <Route path="/ai" element={<AIOperations />} />
        <Route path="/bots" element={<BotCommandCenter />} />
        <Route path="/operations" element={<SystemOperations />} />
        <Route path="/section/:slug" element={<SectionPage />} />
      </Route>
    </Routes>
  );
}
