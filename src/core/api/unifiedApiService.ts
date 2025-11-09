import AsyncStorage from '@react-native-async-storage/async-storage';
import { vendorApiService } from './vendorApiService';
import { menuApiService } from './menuApiService';
import { ordersApiService } from './ordersApiService';
import { config } from '../config/environment';
import { handleApiError, ApiError } from './httpClient';

// Authentication types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    vendorId?: number;
    roles: string[];
  };
  tokens: AuthTokens;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  vendorId?: number;
  roles: string[];
  preferences: Record<string, any>;
}

// Unified API Service with authentication
export class UnifiedApiService {
  private static instance: UnifiedApiService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private user: UserProfile | null = null;

  private constructor() {
    this.initializeAuth();
  }

  static getInstance(): UnifiedApiService {
    if (!UnifiedApiService.instance) {
      UnifiedApiService.instance = new UnifiedApiService();
    }
    return UnifiedApiService.instance;
  }

  // Authentication methods
  private async initializeAuth(): Promise<void> {
    try {
      const storedToken = await AsyncStorage.getItem('@auth_token');
      const storedRefreshToken = await AsyncStorage.getItem('@refresh_token');
      const storedUser = await AsyncStorage.getItem('@user_profile');

      if (storedToken && storedRefreshToken && storedUser) {
        this.accessToken = storedToken;
        this.refreshToken = storedRefreshToken;
        this.user = JSON.parse(storedUser);
        
        // Update HTTP client with token
        this.updateHttpClientToken();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  private updateHttpClientToken(): void {
    // This would update the httpClient to include the auth token
    // For now, we'll assume httpClient has a method to update auth
    // Implementation depends on httpClient structure
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // In a real implementation, this would call the auth endpoint
      // For now, we'll simulate the login
      const mockResponse: LoginResponse = {
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: credentials.email,
          name: 'Restaurant Owner',
          vendorId: 1,
          roles: ['VENDOR', 'BRANCH_MANAGER'],
        },
        tokens: {
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          expiresIn: 3600,
        },
      };

      // Store auth data
      this.accessToken = mockResponse.tokens.accessToken;
      this.refreshToken = mockResponse.tokens.refreshToken;
      this.user = mockResponse.user;

      await AsyncStorage.setItem('@auth_token', this.accessToken);
      await AsyncStorage.setItem('@refresh_token', this.refreshToken);
      await AsyncStorage.setItem('@user_profile', JSON.stringify(this.user));

      this.updateHttpClientToken();

      return mockResponse;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear local storage
      await AsyncStorage.removeItem('@auth_token');
      await AsyncStorage.removeItem('@refresh_token');
      await AsyncStorage.removeItem('@user_profile');

      // Clear instance variables
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;

      this.updateHttpClientToken();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }

      // In a real implementation, this would call the refresh endpoint
      // For now, we'll return the existing token
      return this.accessToken;
    } catch (error) {
      // If refresh fails, logout the user
      await this.logout();
      throw handleApiError(error);
    }
  }

  // Getters
  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user;
  }

  get currentUser(): UserProfile | null {
    return this.user;
  }

  get currentVendorId(): number | null {
    return this.user?.vendorId || null;
  }

  get hasVendorRole(): boolean {
    return this.user?.roles.includes('VENDOR') || false;
  }

  get hasBranchManagerRole(): boolean {
    return this.user?.roles.includes('BRANCH_MANAGER') || false;
  }

  // API service methods (delegating to specific services)
  // Vendor APIs
  async getVendor(vendorId: number) {
    return vendorApiService.getVendor(vendorId);
  }

  async createVendor(vendorData: any) {
    return vendorApiService.createVendor(vendorData);
  }

  async updateVendor(vendorId: number, vendorData: any) {
    return vendorApiService.updateVendor(vendorId, vendorData);
  }

  async getVendorBranches(vendorId: number) {
    return vendorApiService.getVendorBranches(vendorId);
  }

  // Branch APIs
  async createBranch(vendorId: number, branchData: any) {
    return vendorApiService.createBranch(vendorId, branchData);
  }

  async getBranch(branchId: number) {
    return vendorApiService.getBranch(branchId);
  }

  async updateBranch(vendorId: number, branchId: number, branchData: any) {
    return vendorApiService.updateBranch(vendorId, branchId, branchData);
  }

  async toggleBranchStatus(branchId: number, statusData: any) {
    return vendorApiService.toggleBranchStatus(branchId, statusData);
  }

  async updateOperatingHours(branchId: number, hoursData: any) {
    return vendorApiService.updateOperatingHours(branchId, hoursData);
  }

  async getOperatingHours(branchId: number) {
    return vendorApiService.getOperatingHours(branchId);
  }

  async checkBranchAvailability(branchId: number) {
    return vendorApiService.checkBranchAvailability(branchId);
  }

  // Document APIs
  async uploadDocument(branchId: number, documentData: any) {
    return vendorApiService.uploadDocument(branchId, documentData);
  }

  async getBranchDocuments(branchId: number) {
    return vendorApiService.getBranchDocuments(branchId);
  }

  async deleteDocument(documentId: number) {
    return vendorApiService.deleteDocument(documentId);
  }

  // Menu APIs
  async createMenuItem(branchId: number, menuItemData: any) {
    return menuApiService.createMenuItem(branchId, menuItemData);
  }

  async getMenuItem(menuItemId: string) {
    return menuApiService.getMenuItem(menuItemId);
  }

  async updateMenuItem(menuItemId: string, menuItemData: any) {
    return menuApiService.updateMenuItem(menuItemId, menuItemData);
  }

  async deleteMenuItem(menuItemId: string) {
    return menuApiService.deleteMenuItem(menuItemId);
  }

  async getBranchMenuItems(branchId: number, options?: {
    page?: number;
    size?: number;
    category?: string;
    availableOnly?: boolean;
  }) {
    return menuApiService.getBranchMenuItems(
      branchId,
      options?.page,
      options?.size,
      options?.category,
      options?.availableOnly
    );
  }

  async searchMenuItems(branchId: number, query: string, options?: {
    page?: number;
    size?: number;
  }) {
    return menuApiService.searchMenuItems(
      branchId,
      query,
      options?.page,
      options?.size
    );
  }

  async getMenuItemCategories(branchId: number) {
    return menuApiService.getMenuItemCategories(branchId);
  }

  // Orders APIs
  async getOrders(branchId: number, options?: {
    status?: string;
    page?: number;
    size?: number;
    dateFrom?: string;
    dateTo?: string;
  }) {
    return ordersApiService.getOrders(
      branchId,
      options?.status as any,
      options?.page,
      options?.size,
      options?.dateFrom,
      options?.dateTo
    );
  }

  async getOrder(orderId: string) {
    return ordersApiService.getOrder(orderId);
  }

  async updateOrderStatus(orderId: string, statusData: any) {
    return ordersApiService.updateOrderStatus(orderId, statusData);
  }

  async getDashboardStats(branchId: number, dateRange?: string) {
    return ordersApiService.getDashboardStats(branchId, dateRange as any);
  }

  async getTopItems(branchId: number, options?: {
    period?: string;
    limit?: number;
  }) {
    return ordersApiService.getTopItems(
      branchId,
      options?.period as any,
      options?.limit
    );
  }

  // File upload APIs
  async uploadImage(file: any, category?: string) {
    return vendorApiService.uploadImage(file, category);
  }

  async uploadDocumentFile(file: any, documentType: string) {
    return vendorApiService.uploadDocumentFile(file, documentType);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${config.apiUrl.replace('/api/v1', '')}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiService = UnifiedApiService.getInstance();
export default apiService;