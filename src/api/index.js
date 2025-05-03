const BASE_URL = 'http://localhost:8000/api'; // or your Spring Boot backend URL
// keep this elsewhere


//  login method
export const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    return res;
};

export const signup = async (first_name, last_name, email, password) => {
    
    const res = await fetch(`${BASE_URL}/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name, email, password })
    });
    console.log(res)
    if (!res.ok) {
        alert("signup failed");
    }
    return res.json();
};

//get all the actions
// this is the method that will be called when the user clicks on create pipeline
export const getActions = async () => {
    const res = await fetch(`${BASE_URL}/actions/all`,
      {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
      });
    if (!res.ok) {
        throw new Error('Failed to fetch actions');
    }
    return res.json();
};

//create new stage
// this is the method that will be called when the user clicks on create stage
// it will send a post request to the backend with the stage data
export const createStage = async (stageData) => {
    const res = await fetch(`${BASE_URL}/stages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stageData)
    });
    return res.json();
  };

//get stage by id
// this is the method that will be called when the user clicks on edit stage
// it will send a get request to the backend with the stage id
export const getStage = async (id) => {
    const res = await fetch(`${BASE_URL}/stages/${id}`);
    return res.json();
}

//save the pipeline
// this is the method that will be called when the user clicks on save pipeline
// it will send a post request to the backend with the pipeline data
export const savePipeline = async (pipelineData) => {
    const res = await fetch(`${BASE_URL}/design/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`, },
      
      body: JSON.stringify(pipelineData)
    });
    return res;
  };

export const fetchPipelines = async (userId) => {
    const res = await fetch(`${BASE_URL}/fetch/dashboard?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch pipelines');
    }
    return res.json();
}

export const fetchPipeline = async (pId) => {
  const res = await fetch(`${BASE_URL}/fetch/pipeline?pId=${pId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) {
      throw new Error('Failed to fetch pipeline');
  }
  return res.json();
}

export const deletePipeline = async (pId) => {
  const res = await fetch(`${BASE_URL}/delete/pipeline?pId=${pId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) {
      throw new Error('Failed to delete pipeline');
  }
  return res.json();
}

export const runPipeline = async (pid) => {
  console.log("Running pipeline with ID:", pid);
  const res = await fetch(`${BASE_URL}/execute/create/pipelineX`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({pid})
  });
  console.log(res)

  if (!res.ok) {
      throw new Error('Failed to run pipeline');
  }
  return res.json();
} 

export const fetchPipelineX = async (pxId) => {
  const res = await fetch(`${BASE_URL}/fetch/pipelineX?pxId=${pxId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) {
      throw new Error('Failed to fetch pipelineX');
  }
  return res.json();
}

export const polling = async (pxId) => {
  const res = await fetch(`${BASE_URL}/polling?pxId=${pxId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) {
      throw new Error('Failed to do polling');
  }
  return res.json();
}

export const updatePipeline = async (pipelineData) => {
  const res = await fetch(`${BASE_URL}/update-stages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify(pipelineData)
  });
  return res.json();
};