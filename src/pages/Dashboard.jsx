import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardUI from "../components/DashboardUI";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Shatakshee Mishra",
    email: "shatakshee@gmail.com",
    // role: "Admin",
  });
  const [pipelines, setPipelines] = useState([]);
  const [currentPipeline, setCurrentPipeline] = useState(null);
  const navigate = useNavigate();

  const handleCreatePipeline = () => {
    navigate("/createpipeline");
  };

  const handleExecutePipeline = (pipeline) => {
    // Logic to execute pipeline goes here
    alert(`Executing pipeline: ${pipeline.name}`);
  };

  const handlePipelineCreated = (pipeline) => {
    setPipelines([...pipelines, pipeline]);
  };

  return (
    <DashboardUI
      userInfo={userInfo}
      pipelines={pipelines}
      currentPipeline={currentPipeline}
      handleCreatePipeline={handleCreatePipeline}
      handleExecutePipeline={handleExecutePipeline}
      handlePipelineCreated={handlePipelineCreated}
    />
  );
};

export default Dashboard;