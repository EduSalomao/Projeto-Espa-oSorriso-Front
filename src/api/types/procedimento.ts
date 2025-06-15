export interface Procedimento {
    id: number;
    created_at: string;
    name: string;
    tipo: string;
    duracao: string;
    custo: number;
    descricao?: string;
    categoria?: string;
    observacoes?: string;
    dentistas: number[];
  }
  
  export interface ProcedimentoCreate {
    name: string;
    tipo: string;
    duracao: string;
    custo: number;
    descricao?: string;
    categoria?: string;
    observacoes?: string;
    dentistas: number[];
  }
  
  export type ProcedimentoUpdate = Partial<ProcedimentoCreate>;