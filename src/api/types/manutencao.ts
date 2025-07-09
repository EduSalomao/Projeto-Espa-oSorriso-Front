// src/api/types/manutencao.ts
export interface Manutencao {
    id: number;
    data_hora: string;
    duracao: string;
    data_hora_fim: string;
    id_paciente: number;
    paciente_nome: string;
    paciente_cpf: string;
    id_dentista: number;
    dentista_nome: string;
    dentista_cro: string;
    price: number;
  }
  
  export interface ManutencaoDetalhada extends Manutencao {
      // A view 'manutencao_detalhada' já contém os campos que precisamos
  }
  
  export type ManutencaoCreate = {
      id_paciente: number;
      id_dentista: number;
      data_hora: string;
      duracao: string;
  };
  
  export type ManutencaoUpdate = Partial<Pick<Manutencao, 'data_hora' | 'duracao'>>;