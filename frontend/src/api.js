/**
 * API Configuration and HTTP Client
 * Handles all communication with the backend API
 */

// API Base URL - uses environment variable or defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint (without /api prefix)
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    // Parse JSON response
    const data = await response.json();
    
    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ========================================
// Contact API
// ========================================

/**
 * Send a contact form message
 * @param {object} messageData - Contact form data
 * @param {string} messageData.name - Sender name
 * @param {string} messageData.email - Sender email
 * @param {string} messageData.subject - Message subject
 * @param {string} messageData.budget - Optional budget
 * @param {string} messageData.message - Message content
 * @returns {Promise<object>} Success response
 */
export async function sendContactMessage(messageData) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(messageData),
  });
}

/**
 * Get all contact messages (admin)
 * @param {object} params - Query parameters
 * @param {string} params.status - Filter by status (new, read, replied)
 * @param {number} params.limit - Results per page
 * @param {number} params.offset - Pagination offset
 * @returns {Promise<object>} List of messages
 */
export async function getContactMessages(params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = queryParams ? `/contact?${queryParams}` : '/contact';
  return apiRequest(endpoint);
}

// ========================================
// Resume API
// ========================================

/**
 * Get complete resume data (all sections)
 * @returns {Promise<object>} Complete resume
 */
export async function getFullResume() {
  return apiRequest('/resume');
}

/**
 * Get personal information
 * @returns {Promise<object>} Personal info
 */
export async function getPersonalInfo() {
  return apiRequest('/resume/personal');
}

/**
 * Get work experiences
 * @returns {Promise<object>} List of experiences
 */
export async function getExperiences() {
  return apiRequest('/resume/experience');
}

/**
 * Get education history
 * @returns {Promise<object>} List of education
 */
export async function getEducation() {
  return apiRequest('/resume/education');
}

/**
 * Get skills grouped by category
 * @returns {Promise<object>} Skills by category
 */
export async function getSkills() {
  return apiRequest('/resume/skills');
}

/**
 * Get projects
 * @returns {Promise<object>} List of projects
 */
export async function getProjects() {
  return apiRequest('/resume/projects');
}

/**
 * Get certifications
 * @returns {Promise<object>} List of certifications
 */
export async function getCertifications() {
  return apiRequest('/resume/certifications');
}

// ========================================
// Health Check
// ========================================

/**
 * Check API health status
 * @returns {Promise<object>} Health status
 */
export async function checkHealth() {
  const url = API_BASE_URL.replace('/api', '/health');
  const response = await fetch(url);
  return response.json();
}

// ========================================
// Utility Functions
// ========================================

/**
 * Get the current API base URL
 * @returns {string} API base URL
 */
export function getApiUrl() {
  return API_BASE_URL;
}

/**
 * Check if API is in production mode
 * @returns {boolean} True if using production API
 */
export function isProduction() {
  return !API_BASE_URL.includes('localhost');
}

// Default export with all API functions
export default {
  // Contact
  sendContactMessage,
  getContactMessages,
  
  // Resume
  getFullResume,
  getPersonalInfo,
  getExperiences,
  getEducation,
  getSkills,
  getProjects,
  getCertifications,
  
  // Health
  checkHealth,
  
  // Utils
  getApiUrl,
  isProduction,
};
