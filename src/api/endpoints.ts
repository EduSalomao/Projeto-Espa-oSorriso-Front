// src/api/endpoints.ts
interface Params {
  page?: number;
  limit?: number;
  termo?: string;
  idDentista?: number | string | null;
  idPaciente?: number | string | null;
}

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
  listWithFilters: ({ page = 1, limit = 10, termo = '', idDentista = '' }: Params = {}) =>
      `/procedimentos?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idDentista=${idDentista}`,
},
manutencoes: {
  base: '/manutencoes',
  byId: (id: string | number) => `/manutencoes/${id}`,
  update: (id: string | number) => `/manutencoes/${id}`,
  delete: (id: string | number) => `/manutencoes/${id}`,
  listWithFilters: ({ page = 1, limit = 10, termo = '', idPaciente = `` }: Params = {}) =>
      `/manutencoes?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idPaciente=${idPaciente}`,
},
};

export default endpoints;