export interface Consulta {
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
    motivo: string;
  }
  
  export interface ConsultaDetalhada extends Consulta {
      // A view 'consulta_detalhada' já contém os campos que precisamos
  }
  
  export type ConsultaCreate = {
      id_paciente: number;
      id_dentista: number;
      data_hora: string;
      duracao: string;
      motivo: string;
  };
  
  export type ConsultaUpdate = Partial<Pick<Consulta, 'data_hora' | 'duracao' | 'motivo'>>;