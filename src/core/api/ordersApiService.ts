import { httpClient } from './httpClient';
import {
  ApiResponse,
  Order,
  OrderStatusUpdateRequest,
  PaginatedResponse,
  DashboardStats,
  TopItem
} from '../types/api';

// Orders API Service
export class OrdersApiService {
  
  // Order endpoints
  async getOrders(
    branchId: number,
    status?: Order['status'],
    page: number = 0,
    size: number = 20,
    dateFrom?: string,
    dateTo?: string
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }
    
    if (dateFrom) {
      params.append('dateFrom', dateFrom);
    }
    
    if (dateTo) {
      params.append('dateTo', dateTo);
    }

    const response = await httpClient.get(`/orders/branches/${branchId}?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.get(`/orders/${orderId}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async updateOrderStatus(
    orderId: string,
    statusData: OrderStatusUpdateRequest
  ): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/status`, statusData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async cancelOrder(orderId: string, reason?: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/cancel`, { reason });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async assignDeliveryPartner(orderId: string, partnerId: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/assign-delivery`, { partnerId });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async updateDeliveryTime(orderId: string, estimatedTime: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/delivery-time`, { estimatedDeliveryTime: estimatedTime });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Order statistics and analytics
  async getDashboardStats(
    branchId: number,
    dateRange: 'today' | 'week' | 'month' | 'quarter' | 'year' = 'today'
  ): Promise<ApiResponse<DashboardStats>> {
    const response = await httpClient.get(`/orders/branches/${branchId}/dashboard/stats?dateRange=${dateRange}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getTopItems(
    branchId: number,
    period: 'week' | 'month' | 'quarter' = 'month',
    limit: number = 10
  ): Promise<ApiResponse<TopItem[]>> {
    const params = new URLSearchParams({
      period,
      limit: limit.toString(),
    });

    const response = await httpClient.get(`/orders/branches/${branchId}/analytics/top-items?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getOrderAnalytics(
    branchId: number,
    period: 'week' | 'month' | 'quarter' = 'month'
  ): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({ period });
    const response = await httpClient.get(`/orders/branches/${branchId}/analytics?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getRevenueAnalytics(
    branchId: number,
    period: 'week' | 'month' | 'quarter' = 'month',
    granularity: 'hour' | 'day' | 'week' = 'day'
  ): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({
      period,
      granularity,
    });

    const response = await httpClient.get(`/orders/branches/${branchId}/analytics/revenue?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Order management
  async acceptOrder(orderId: string, estimatedPrepTime?: number): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/accept`, { estimatedPrepTime });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async rejectOrder(orderId: string, reason: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/reject`, { reason });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async markOrderReady(orderId: string): Promise<ApiResponse<Order>> {
    const response = await httpClient.patch(`/orders/${orderId}/ready`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Bulk operations
  async bulkUpdateOrderStatus(orderIds: string[], status: Order['status']): Promise<ApiResponse<Order[]>> {
    const response = await httpClient.patch('/orders/bulk/status', {
      orderIds,
      status,
    });
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Order search
  async searchOrders(
    branchId: number,
    query: string,
    page: number = 0,
    size: number = 20
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      size: size.toString(),
    });

    const response = await httpClient.get(`/orders/branches/${branchId}/search?${params.toString()}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }
}

// Export singleton instance
export const ordersApiService = new OrdersApiService();
export default ordersApiService;