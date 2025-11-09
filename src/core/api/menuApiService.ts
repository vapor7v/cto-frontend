import { httpClient } from './httpClient';
import {
  ApiResponse,
  MenuItem,
  MenuItemCreateRequest,
  MenuItemUpdateRequest,
  MenuItemResponse,
  PaginatedResponse
} from '../types/api';

// Menu API Service
export class MenuApiService {
  
  // Menu Item endpoints
  async createMenuItem(branchId: number, menuItemData: MenuItemCreateRequest): Promise<ApiResponse<MenuItemResponse>> {
    const response = await httpClient.post(`/menu-items/branches/${branchId}`, menuItemData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getMenuItem(menuItemId: string): Promise<ApiResponse<MenuItemResponse>> {
    const response = await httpClient.get(`/menu-items/${menuItemId}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async updateMenuItem(menuItemId: string, menuItemData: MenuItemUpdateRequest): Promise<ApiResponse<MenuItemResponse>> {
    const response = await httpClient.put(`/menu-items/${menuItemId}`, menuItemData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async deleteMenuItem(menuItemId: string): Promise<ApiResponse<void>> {
    const response = await httpClient.delete(`/menu-items/${menuItemId}`);
    return {
      data: undefined,
      success: true,
      status: response.status,
    };
  }

  async getBranchMenuItems(
    branchId: number,
    page: number = 0,
    size: number = 50,
    category?: string,
    availableOnly: boolean = true
  ): Promise<ApiResponse<PaginatedResponse<MenuItemResponse>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      availableOnly: availableOnly.toString(),
    });
    
    if (category) {
      params.append('category', category);
    }

    const response = await httpClient.get(`/menu-items/branches/${branchId}?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async searchMenuItems(
    branchId: number,
    query: string,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<MenuItemResponse>>> {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      size: size.toString(),
    });

    const response = await httpClient.get(`/menu-items/branches/${branchId}/search?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getMenuItemCategories(branchId: number): Promise<ApiResponse<string[]>> {
    const response = await httpClient.get(`/menu-items/branches/${branchId}/categories`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async bulkUpdateMenuItemAvailability(
    menuItemIds: string[],
    isAvailable: boolean
  ): Promise<ApiResponse<MenuItemResponse[]>> {
    const response = await httpClient.patch('/menu-items/bulk/availability', {
      menuItemIds,
      isAvailable,
    });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async duplicateMenuItem(menuItemId: string, newName?: string): Promise<ApiResponse<MenuItemResponse>> {
    const response = await httpClient.post(`/menu-items/${menuItemId}/duplicate`, {
      newName,
    });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Menu analytics
  async getPopularMenuItems(
    branchId: number,
    period: 'week' | 'month' | 'quarter' = 'month',
    limit: number = 10
  ): Promise<ApiResponse<MenuItemResponse[]>> {
    const params = new URLSearchParams({
      period,
      limit: limit.toString(),
    });

    const response = await httpClient.get(`/menu-items/branches/${branchId}/popular?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getMenuAnalytics(branchId: number, period: 'week' | 'month' | 'quarter' = 'month') {
    const params = new URLSearchParams({ period });
    const response = await httpClient.get(`/menu-items/branches/${branchId}/analytics?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Menu item image management
  async uploadMenuItemImage(
    menuItemId: string,
    file: { uri: string; name: string; type: string }
  ) {
    return httpClient.uploadFile(`/menu-items/${menuItemId}/image`, file);
  }

  async deleteMenuItemImage(menuItemId: string): Promise<ApiResponse<void>> {
    const response = await httpClient.delete(`/menu-items/${menuItemId}/image`);
    return {
      data: undefined,
      success: true,
      status: response.status,
    };
  }
}

// Export singleton instance
export const menuApiService = new MenuApiService();
export default menuApiService;