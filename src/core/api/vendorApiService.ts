import { httpClient } from './httpClient';
import {
  ApiResponse,
  Vendor,
  Branch,
  BranchCreateRequest,
  BranchStatusRequest,
  OperatingHoursRequest,
  BranchAvailabilityResponse,
  OperatingHoursResponse,
  DocumentUploadRequest,
  DocumentResponse,
  PaginatedResponse
} from '../types/api';

// Vendor API Service
export class VendorApiService {
  
  // Vendor endpoints
  async getVendor(vendorId: number): Promise<ApiResponse<Vendor>> {
    const response = await httpClient.get(`/vendors/${vendorId}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async createVendor(vendorData: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
    const response = await httpClient.post('/vendors', vendorData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async updateVendor(vendorId: number, vendorData: Partial<Vendor>): Promise<ApiResponse<Vendor>> {
    const response = await httpClient.put(`/vendors/${vendorId}`, vendorData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Branch endpoints
  async createBranch(vendorId: number, branchData: BranchCreateRequest): Promise<ApiResponse<Branch>> {
    const response = await httpClient.post(`/vendors/${vendorId}/branches`, branchData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getBranch(branchId: number): Promise<ApiResponse<Branch>> {
    const response = await httpClient.get(`/branches/${branchId}`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async updateBranch(vendorId: number, branchId: number, branchData: BranchCreateRequest): Promise<ApiResponse<Branch>> {
    const response = await httpClient.put(`/vendors/${vendorId}/branches/${branchId}`, branchData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getVendorBranches(vendorId: number): Promise<ApiResponse<Branch[]>> {
    const response = await httpClient.get(`/vendors/${vendorId}/branches`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async toggleBranchStatus(branchId: number, statusData: BranchStatusRequest): Promise<ApiResponse<Branch>> {
    const response = await httpClient.put(`/branches/${branchId}/status`, statusData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Operating Hours endpoints
  async updateOperatingHours(branchId: number, hoursData: OperatingHoursRequest): Promise<ApiResponse<Branch>> {
    const response = await httpClient.put(`/branches/${branchId}/operating-hours`, hoursData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getOperatingHours(branchId: number): Promise<ApiResponse<OperatingHoursResponse>> {
    const response = await httpClient.get(`/branches/${branchId}/operating-hours`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Branch Availability endpoints
  async checkBranchAvailability(branchId: number): Promise<ApiResponse<BranchAvailabilityResponse>> {
    const response = await httpClient.get(`/branches/${branchId}/availability`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  // Document endpoints
  async uploadDocument(branchId: number, documentData: DocumentUploadRequest): Promise<ApiResponse<DocumentResponse>> {
    const response = await httpClient.post(`/branches/${branchId}/documents`, documentData);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async getBranchDocuments(branchId: number): Promise<ApiResponse<DocumentResponse[]>> {
    const response = await httpClient.get(`/branches/${branchId}/documents`);
    return {
      data: response.data,
      success: true,
      status: response.status,
    };
  }

  async deleteDocument(documentId: number): Promise<ApiResponse<void>> {
    const response = await httpClient.delete(`/documents/${documentId}`);
    return {
      data: undefined,
      success: true,
      status: response.status,
    };
  }

  // File upload endpoints
  async uploadImage(file: { uri: string; name: string; type: string }, category: string = 'menu') {
    const additionalData = { category };
    return httpClient.uploadFile('/upload/image', file, additionalData);
  }

  async uploadDocumentFile(file: { uri: string; name: string; type: string }, documentType: string) {
    const additionalData = { documentType };
    return httpClient.uploadFile('/upload/document', file, additionalData);
  }
}

// Export singleton instance
export const vendorApiService = new VendorApiService();
export default vendorApiService;