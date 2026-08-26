import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import ServerInfo from "../pages/ServerInfo.jsx";
import Staff from "../pages/Staff.jsx";
import Resources from "../pages/Resources.jsx";
import CybersecurityResources from "../pages/CybersecurityResources.jsx";
import DeveloperResources from "../pages/DeveloperResources.jsx";
import ResourceSubtypeView from "../components/ResourceSubtypeView.jsx";
import BotCommands from "../pages/BotCommands.jsx";
import Articles from "../pages/Articles.jsx";
import ArticleDetail from "../pages/ArticleDetail.jsx";
import SubmitResource from "../pages/SubmitResource.jsx";
import Admin from "../pages/Admin.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/server-info" element={<ServerInfo />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/resources" element={<Resources />} />

        <Route path="/resources/cybersecurity" element={<CybersecurityResources />}>
          <Route index element={<Navigate to="osint" replace />} />
          <Route path=":subtype" element={<ResourceSubtypeView />} />
        </Route>

        <Route path="/resources/developers" element={<DeveloperResources />}>
          <Route index element={<Navigate to="learn" replace />} />
          <Route path=":subtype" element={<ResourceSubtypeView />} />
        </Route>

        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />

        <Route path="/submit-resource" element={<SubmitResource />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/bot" element={<BotCommands />} />
      </Route>
    </Routes>
  );
}
