export type servicesResponse = {
  data: {
    services: Array<{
    _id: string;
    name: string;
    category: { name: string };
    description: string;
    location: { state: string; city: string; zipCode: string; country: string };
    price: number;
    status: string;
    provider: {
      name: string;
      email: string;
      phone: string;
      address: { state: string; city: string; zipCode: string; country: string };
    };
  }>;
  }
};
