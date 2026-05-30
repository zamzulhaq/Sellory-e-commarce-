/**
 * Sellory Authentication Module
 * Handles JWT token management and API communication with FastAPI backend
 */

const AUTH = {
  // API Configuration
  API_BASE_URL: 'http://127.0.0.1:8000',
  API_PREFIX: '/api/v1/auth',
  STORAGE_KEY: 'sellory_auth_token',
  USER_STORAGE_KEY: 'sellory_user',

  /**
   * Get stored JWT token from localStorage
   * @returns {string|null} JWT token or null
   */
  getToken() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  /**
   * Save JWT token to localStorage
   * @param {string} token JWT token from API
   */
  saveToken(token) {
    localStorage.setItem(this.STORAGE_KEY, token);
  },

  /**
   * Remove JWT token from localStorage
   */
  removeToken() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /**
   * Save user data to localStorage
   * @param {object} user User object from API response
   */
  saveUser(user) {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  },

  /**
   * Get stored user data from localStorage
   * @returns {object|null} User object or null
   */
  getUser() {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Remove user data from localStorage
   */
  removeUser() {
    localStorage.removeItem(this.USER_STORAGE_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated() {
    return this.getToken() !== null;
  },

  /**
   * Get Authorization header with Bearer token
   * @returns {object} Headers object with Authorization
   */
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  /**
   * Register new user
   * @param {string} email User email
   * @param {string} password User password
   * @param {string} fullName User full name
   * @returns {Promise<object>} API response
   */
  async register(email, password, fullName) {
    try {
      const response = await fetch(`${this.API_BASE_URL}${this.API_PREFIX}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          full_name: fullName
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Register failed');
      }

      // Save token and user data
      if (data.data && data.data.access_token) {
        this.saveToken(data.data.access_token);
        this.saveUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise<object>} API response
   */
  async login(email, password) {
    try {
      const response = await fetch(`${this.API_BASE_URL}${this.API_PREFIX}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Save token and user data
      if (data.data && data.data.access_token) {
        this.saveToken(data.data.access_token);
        this.saveUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout() {
    this.removeToken();
    this.removeUser();
    window.location.href = '/';
  },

  /**
   * Get current user profile from backend
   * @returns {Promise<object>} User profile data
   */
  async getCurrentUser() {
    try {
      if (!this.isAuthenticated()) {
        return null;
      }

      const response = await fetch(`${this.API_BASE_URL}${this.API_PREFIX}/me`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        // Token invalid, logout
        this.logout();
        return null;
      }

      const data = await response.json();
      if (data.data) {
        this.saveUser(data.data);
        return data.data;
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      // Token invalid, logout
      this.logout();
      return null;
    }
  },

  /**
   * Redirect to login if not authenticated
   */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/login/';
    }
  },

  /**
   * Redirect to dashboard if authenticated
   */
  redirectIfAuthenticated() {
    if (this.isAuthenticated()) {
      window.location.href = '/pages/dashboard/';
    }
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AUTH;
}
