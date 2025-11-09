// API Types matching backend DTOs

// Base response types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Vendor and Branch types
export interface Vendor {
  vendorId: number;
  vendorName: string;
  email: string;
  phone: string;
  businessType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}

export interface OperatingHours {
  day: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  open: string;
  close: string;
}

export interface Branch {
  branchId: number;
  vendorId: number;
  branchName: string;
  address: Address;
  branchPhone: string;
  branchEmail: string;
  isActive: boolean;
  isOpen: boolean;
  onboardingStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DOCUMENTS_REQUIRED';
  operatingHours?: Record<string, TimeSlot[]>;
  createdAt: string;
  updatedAt: string;
}

export interface BranchCreateRequest {
  branchName: string;
  address: Address;
  branchPhone: string;
  branchEmail: string;
}

export interface BranchStatusRequest {
  isOpen: boolean;
}

export interface OperatingHoursRequest {
  hours: Record<string, TimeSlot[]>;
}

export interface BranchAvailabilityResponse {
  branchId: number;
  isOpen: boolean;
  isActive: boolean;
  isWithinOperatingHours: boolean;
  currentStatus: string;
  nextOpenTime?: string;
  nextCloseTime?: string;
}

export interface OperatingHoursResponse {
  branchId: number;
  operatingHours: Record<string, TimeSlot[]>;
  isOpen: boolean;
}

// Document types
export interface Document {
  documentId: number;
  branchId: number;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface DocumentUploadRequest {
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
}

export interface DocumentResponse {
  documentId: number;
  branchId: number;
  documentType: string;
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl: string;
  verificationStatus: string;
  createdAt: string;
  updatedAt: string;
}

// Menu Item types
export interface MenuItem {
  menuItemId: string;
  branchId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemCreateRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  tags: string[];
}

export interface MenuItemUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  imageUrl?: string;
  isAvailable?: boolean;
  preparationTimeMinutes?: number;
  tags?: string[];
}

export interface MenuItemResponse {
  menuItemId: string;
  branchId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  orderId: string;
  branchId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  deliveryAddress?: Address;
  specialInstructions?: string;
  estimatedDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  orderItemId: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface OrderStatusUpdateRequest {
  status: Order['status'];
  estimatedDeliveryTime?: string;
}

// Dashboard/Analytics types
export interface DashboardStats {
  revenue: {
    today: number;
    yesterday: number;
    growth: number;
  };
  orders: {
    today: number;
    yesterday: number;
    growth: number;
  };
  avgOrderValue: {
    today: number;
    yesterday: number;
    growth: number;
  };
  activeItems: number;
}

export interface TopItem {
  name: string;
  orders: number;
  revenue: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  data?: any;
  errors?: string[];
}

export interface ValidationErrorResponse {
  errors: string[];
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}