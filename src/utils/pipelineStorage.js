const STORAGE_KEY = "pipelineList";

export const getPipelines = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const savePipeline = (pipeline) => {
  const pipelines = getPipelines();
  pipelines.push(pipeline);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pipelines));
};