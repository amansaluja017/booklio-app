

const API_BASE =
  import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ""
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000";

type fetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: object | FormData;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(endPoint: string, options: fetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = body instanceof FormData 
      ? { ...headers }
      : { "Content-Type": "application/json", ...headers };

    const url = API_BASE ? `${API_BASE}/api/v1${endPoint}` : `/api/v1${endPoint}`;

    const response = await fetch(url, {
      method,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      headers: defaultHeaders,
      credentials: API_BASE ? "include" : "same-origin",
    });
    if (!response.ok) throw new Error(`${response.statusText}`);
    return response.json();
  }

  async registerCustomer(body: object) {
    return this.fetch("/customer/register", { method: "POST", body });
  }

  async loginCustomer(body: object) {
    return this.fetch("/customer/login", { method: "POST", body });
  }

  async logoutCustomer() {
    return this.fetch("/customer/logout", { method: "POST" });
  }

  async updateCustomerDetails(body: object) {
    return this.fetch("/customer/update-password", { method: "PATCH", body });
  }
  async registerProvider(body: object) {
    return this.fetch("/provider/register", { method: "POST", body });
  }
  async setupStore(body: object) {
    return this.fetch("/provider/store-setup", { method: "PUT", body });
  }
  async updateAddress(body: object) {
    return this.fetch("/customer/update-address", { method: "PATCH", body });
  }
  async addCategory(body: object) {
    return this.fetch("/category/create-category", { method: "POST", body });
  }
  async getCategories() {
    return this.fetch("/category/get-categories");
  }
  async addService(body: object) {
    return this.fetch("/service/create", { method: "POST", body });
  }
  async getServices() {
    return this.fetch("/service/get-services");
  }
  async getSuggestion(query: string) {
    return this.fetch(`/get-suggestions?query=${encodeURIComponent(query)}`);
  }
  async searchServices(query: string) {
    return this.fetch(`/search/category/${encodeURIComponent(query)}`);
  }
  async getServiceReviews(serviceId: string) {
    return this.fetch(`/reviews?serviceId=${encodeURIComponent(serviceId)}`);
  }
  async getBookings() {
    return this.fetch("/booking/provider");
  }
  async createBooking(body: object | FormData) {
    return this.fetch("/booking/create", { method: "POST", body });
  }
  async getCustomerBookings() {
    return this.fetch("/booking/customer");
  }
  async updateBookingStatus(body: object) {
    return this.fetch("/booking/update", { method: "PATCH", body });
  }
  async getSearchResult(query: string) {
    return this.fetch(`/search/services?query=${encodeURIComponent(query)}`);
  }

  async loginProvider(body: object) {
    return this.fetch("/provider/login", { method: "POST", body });
  }

  async logoutProvider() {
    return this.fetch("/provider/logout", { method: "POST" });
  }

  async getProviderProfile() {
    return this.fetch("/provider/get-profile");
  }

  async updateProviderProfile(body: object) {
    return this.fetch("/provider/store-setup", { method: "PUT", body });
  }

  async updateProviderPassword(body: object) {
    return this.fetch("/provider/update-password", { method: "PATCH", body });
  }

  async confirmBookingStatus(body: object) {
    return this.fetch("/booking/confirm-booking", {method: "PATCH", body});
  }

  async cancelBooking(body: object) {
    return this.fetch("/booking/cancel-booking", {method: "PATCH", body});
  }

  async inProgressBooking(body: object | FormData) {
    return this.fetch("/booking/in-progress", {method: "PATCH", body });
  };

  async completeBooking(body: object | FormData) {
    return this.fetch("/booking/complete-booking", {method: "PATCH", body});
  };

  async postReview(body: object) {
    return this.fetch(`/review/post-review`, { method: "POST", body });
  }

  async getReviews(serviceId: string) {
    return this.fetch(`/review/get-reviews?serviceId=${encodeURIComponent(serviceId)}`);
  }

  async getProviderServices() {
    return this.fetch("/service/get-provider-services");
  }

  async updateServiceStatus(serviceId: string, status: boolean) {
    return this.fetch(`/service/update-service-status/${encodeURIComponent(serviceId)}`, { method: "PATCH", body: { status } });
  }

  async adminLogin(body: object) {
    return this.fetch("/admin/login", { method: "POST", body });
  }

  async adminLogout() {
    return this.fetch("/admin/logout", { method: "POST" });
  };

  async deleteCategory(categoryId: string) {
    return this.fetch(`/category/delete-category/${categoryId}`, { method: "DELETE" });
  }

  async getAllProviders() {
    return this.fetch("/provider/get-all-providers");
  }

  async approveProvider(providerId: string) {
    return this.fetch(`/provider/approve/${providerId}`, { method: "PATCH" });
  }

  async rejectProvider(providerId: string) {
    return this.fetch(`/provider/reject/${providerId}`, { method: "DELETE" });
  }

  async getAllReviews() {
    return this.fetch("/review/get-all-reviews");
  }

  async deleteReview(reviewId: string) {
    return this.fetch(`/review/delete-review/${reviewId}`, { method: "DELETE" });
  }
}

const apiClient = new ApiClient();
export default apiClient;
