// src/api/endpoints.ts

type Params = {
  page?: number;
  limit?: number;
  termo?: string;
};

const endpoints = {
  pacientes: {
    base: '/pacientes',
    byId: (id: string | number) => `/pacientes/${id}`,
    update: (id: string | number) => `/pacientes/${id}`,
    delete: (id: string | number) => `/pacientes/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '' }: Params = {}) =>
      `/pacientes?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}`,
  },
  dentistas: {
    base: '/dentistas',
    byId: (id: string | number) => `/dentistas/${id}`,
    update: (id: string | number) => `/dentistas/${id}`,
    delete: (id: string | number) => `/dentistas/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '' }: Params = {}) =>
      `/dentistas?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}`,
  },
  procedimentos: {
    base: '/procedimentos',
    byId: (id: string | number) => `/procedimentos/${id}`,
    update: (id: string | number) => `/procedimentos/${id}`,
    delete: (id: string | number) => `/procedimentos/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '' }: Params = {}) =>
        `/procedimentos?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}`,
  },
};

export default endpoints;
