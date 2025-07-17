interface Params {
  page?: number;
  limit?: number;
  termo?: string;
  idDentista?: number | string | null;
  idPaciente?: number | string | null;
  dateRange?: [Date | null, Date | null] | [];
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
    listWithFilters: ({ page = 1, limit = 10, termo = '', idPaciente = ``, dateRange = [] }: Params = {}) => {
      const [startDate, endDate] = dateRange;
      return `/manutencoes?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idPaciente=${idPaciente}&startDate=${startDate ? new Date(startDate).toISOString() : ''}&endDate=${endDate ? new Date(endDate).toISOString() : ''}`;
    }
  },
  consultas: {
    base: '/consultas',
    byId: (id: string | number) => `/consultas/${id}`,
    update: (id: string | number) => `/consultas/${id}`,
    delete: (id: string | number) => `/consultas/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '', idPaciente = ``, dateRange = [] }: Params = {}) => {
        const [startDate, endDate] = dateRange;
        return `/consultas?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idPaciente=${idPaciente}&startDate=${startDate ? new Date(startDate).toISOString() : ''}&endDate=${endDate ? new Date(endDate).toISOString() : ''}`;
    }
  },
};

export default endpoints;