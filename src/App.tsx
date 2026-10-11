
import { Routes, Route } from "react-router-dom";
import { CommandLayout } from "./layouts/CommandLayout";
import { CommandPage } from "./features/command/CommandPage";
import { SystemOverview } from "./features/command/SystemOverview";
import { SectionPage } from "./features/command/SectionPage";
import { AcademicUniverse } from "./features/academic/AcademicUniverse";
import { CoursesPage } from "./features/academic/CoursesPage";
import { CourseCommandView } from "./features/academic/CourseCommandView";
import { ReviewQueue } from "./features/review/ReviewQueue";
import { ReviewTheater } from "./features/review/ReviewTheater";
import { DocumentStudio } from "./features/documents/DocumentStudio";
import { DocumentDetail } from "./features/documents/DocumentDetail";
import { TemplateCenter } from "./features/documents/TemplateCenter";
import { PublishedDocuments } from "./features/documents/PublishedDocuments";
import { TruthLog } from "./features/audit/TruthLog";
import { SecurityCenter } from "./features/security/SecurityCenter";
import { PeopleUniverse } from "./features/people/PeopleUniverse";
import { UserDetail } from "./features/people/UserDetail";
import { AIOperations } from "./features/ai/AIOperations";
import { AIKeyCenter } from "./features/ai/AIKeyCenter";
import { BotCommandCenter } from "./features/bots/BotCommandCenter";
import { BotFlowVisualizer } from "./features/bots/BotFlowVisualizer";
import { CommunicationCenter } from "./features/bots/CommunicationCenter";
import { SystemOperations } from "./features/operations/SystemOperations";
import { JobControl } from "./features/operations/JobControl";
import { FeatureFlags } from "./features/operations/FeatureFlags";
import { DataVault } from "./features/storage/DataVault";
import { BackupCenter } from "./features/backup/BackupCenter";
import { PermissionMatrix } from "./features/permissions/PermissionMatrix";
import { SummaryStudio } from "./features/summaries/SummaryStudio";
import { TranscriptReview } from "./features/summaries/TranscriptReview";
import { LiveSystemMap } from "./features/operations/LiveSystemMap";
import { CodeCenter } from "./features/code/CodeCenter";
import { GlobalSearch } from "./features/search/GlobalSearch";
import { ActivityRiver } from "./features/activity/ActivityRiver";
import { AcademicEntityDetail } from "./features/academic/AcademicEntityDetail";
import { ContentUniverse } from "./features/content/ContentUniverse";
import { ContentPipeline } from "./features/content/ContentPipeline";
import { ContentDetail } from "./features/content/ContentDetail";
import { AttentionCenter } from "./features/attention/AttentionCenter";

export default function App() {
  return (
    <Routes>
      <Route element={<CommandLayout />}>
        <Route path="/" element={<CommandPage />} />
        <Route path="/overview" element={<SystemOverview />} />
        <Route path="/academic" element={<AcademicUniverse />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseCommandView />} />
        <Route path="/review" element={<ReviewQueue />} />
        <Route path="/review/:id" element={<ReviewTheater />} />
        <Route path="/documents" element={<DocumentStudio />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/templates" element={<TemplateCenter />} />
        <Route path="/published" element={<PublishedDocuments />} />
        <Route path="/audit" element={<TruthLog />} />
        <Route path="/security" element={<SecurityCenter />} />
        <Route path="/people" element={<PeopleUniverse />} />
        <Route path="/people/:id" element={<UserDetail />} />
        <Route path="/ai" element={<AIOperations />} />
        <Route path="/ai/keys" element={<AIKeyCenter />} />
        <Route path="/bots" element={<BotCommandCenter />} />
        <Route path="/bot-flow" element={<BotFlowVisualizer />} />
        <Route path="/communication" element={<CommunicationCenter />} />
        <Route path="/operations" element={<SystemOperations />} />
        <Route path="/jobs" element={<JobControl />} />
        <Route path="/flags" element={<FeatureFlags />} />
        <Route path="/vault" element={<DataVault />} />
        <Route path="/backup" element={<BackupCenter />} />
        <Route path="/permissions" element={<PermissionMatrix />} />
        <Route path="/summaries/:id" element={<SummaryStudio />} />
        <Route path="/transcripts/:id" element={<TranscriptReview />} />
        <Route path="/system-map" element={<LiveSystemMap />} />
        <Route path="/code" element={<CodeCenter />} />
        <Route path="/search" element={<GlobalSearch />} />
        <Route path="/activity" element={<ActivityRiver />} />
        <Route path="/academic/entity/:id" element={<AcademicEntityDetail />} />
        <Route path="/content" element={<ContentUniverse />} />
        <Route path="/pipeline" element={<ContentPipeline />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/attention" element={<AttentionCenter />} />
        <Route path="/section/:slug" element={<SectionPage />} />
      </Route>
    </Routes>
  );
}
