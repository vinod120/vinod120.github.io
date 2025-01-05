import api from './api';
// REGIONS APIS


// STATES
export const fetchStates = async (payload) => {
  const response = await api.get('/countries/states', payload);
  return response?.data;
};
// Create New Region
export const createNewRegion = async (payload) => {
  const response = await api.post('/create-region', payload);
  return response?.data;
};
// Get All Regions
export const fetchAllRegions = async (payload) => {
  const response = await api.get('/get-all-regions', payload);
  return response?.data;
};

// ZONE APIS

// Create New Zone
export const createNewZone = async (payload) => {
  const response = await api.post('/create-zone', payload);
  return response?.data;
};
// Get All Zones
export const fetchAllZones = async (payload) => {
  const response = await api.get('/get-all-zones', payload);
  return response?.data;
};

//Get Zones By Region
export const fetchZonesByRegion = async (regionId) => {
  const response = await api.get(`/get-zones-by-region?region=${regionId}`);
  return response?.data;
};

//BRANCH APIS

//Create New Branch
export const createNewBranch = async (credentials) => {
  const response = await api.post('/create-branch', credentials);
  return response?.data;
};

// Get all Branches
export const fetchAllBranches = async (credentials) => {
  const response = await api.get('/get-all-branches', credentials);
  return response?.data;
};

// Delete branch
export const deleteBranch = async (branchId) => {
  console.log("deleteBranch", branchId)
  const response = await api.delete(`/delete-branch/${branchId}`);
  return response?.data;
};
// Update branch
export const updateBranch = async (branchId, updatedData) => {
  console.log("Updating branch with ID:", branchId, "Data:", updatedData);
  const response = await api.put(`/update-branch/${branchId}`, updatedData);
  return response?.data;
};
//ADMIN APIS

// Admin login user
export const loginAdminUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response?.data;
};

// Admin user profile
export const getAdminUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response?.data;
};
