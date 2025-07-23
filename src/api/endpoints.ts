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
    listWithFilters: ({ page = 1, limit = 10, termo = '', idDentista = null }: Params = {}) =>
        `/procedimentos?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idDentista=${idDentista || ''}`,
  },
  manutencoes: {
    base: '/manutencoes',
    byId: (id: string | number) => `/manutencoes/${id}`,
    update: (id: string | number) => `/manutencoes/${id}`,
    delete: (id: string | number) => `/manutencoes/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '', idPaciente = null, idDentista = null, dateRange = [] }: Params = {}) => {
      const [startDate, endDate] = dateRange;
      const startDateISO = startDate ? new Date(startDate as string).toISOString() : '';
      const endDateISO = endDate ? new Date(endDate as string).toISOString() : '';
      return `/manutencoes?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idPaciente=${idPaciente || ''}&idDentista=${idDentista || ''}&startDate=${startDateISO}&endDate=${endDateISO}`;
    }
  },
  consultas: {
    base: '/consultas',
    byId: (id: string | number) => `/consultas/${id}`,
    update: (id: string | number) => `/consultas/${id}`,
    delete: (id: string | number) => `/consultas/${id}`,
    listWithFilters: ({ page = 1, limit = 10, termo = '', idPaciente = null, idDentista = null, dateRange = [] }: Params = {}) => {
      const [startDate, endDate] = dateRange;
      const startDateISO = startDate ? new Date(startDate as string).toISOString() : '';
      const endDateISO = endDate ? new Date(endDate as string).toISOString() : '';
      return `/consultas?page=${page}&limit=${limit}&termo=${encodeURIComponent(termo)}&idPaciente=${idPaciente || ''}&idDentista=${idDentista || ''}&startDate=${startDateISO}&endDate=${endDateISO}`;
    }
  },
};

export default endpoints;