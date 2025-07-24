# Projeto Espaço Sorriso - Consultório Odontológico

O **Espaço Sorriso** é uma aplicação web completa para gerenciamento de consultórios odontológicos, desenvolvida para otimizar a rotina de profissionais da área e melhorar a experiência dos pacientes. A plataforma oferece um conjunto de ferramentas intuitivas para agendamento de consultas, gestão de pacientes, dentistas, procedimentos e manutenções, tudo em uma interface amigável e moderna.

## Funcionalidades Principais

O sistema foi projetado para ser uma solução completa, abrangendo desde o cadastro inicial de informações até o acompanhamento detalhado de cada paciente. As principais funcionalidades incluem:

### Gestão de Pacientes

- **Cadastro e edição** de informações detalhadas dos pacientes.
- **Busca rápida** por nome ou CPF.
- **Visualização do histórico completo**, incluindo consultas, procedimentos e manutenções.

### Gestão de Dentistas

- **Cadastro de profissionais** com informações como CRO, especialização e horários de trabalho.
- **Associação de dentistas** aos procedimentos que realizam.
- **Visualização da agenda** de cada profissional.

### Gestão de Procedimentos

- **Cadastro de procedimentos** com detalhes sobre tipo, duração, custo e descrição.
- **Associação de dentistas** aptos a realizar cada procedimento.
- **Busca por nome** para fácil acesso.

### Agendamento Inteligente

- **Agenda Visual:** Calendário interativo que exibe todas as consultas e manutenções agendadas, com cores distintas para cada tipo de evento.
- **Cadastro de Consultas e Manutenções:** Formulários intuitivos para agendar novos compromissos, associando pacientes, dentistas e procedimentos.
- **Pesquisa de horários:** Pesquise horários por nome de paciente, dentista ou período.

### Interface Intuitiva e Responsiva

- **Navegação Simplificada:** Um menu lateral (sidebar) que se expande e recolhe, facilitando o acesso a todas as seções do sistema.
- **Componentes Reutilizáveis:** Cards para visualização rápida de informações e modais para ações de cadastro, edição e exclusão, garantindo uma experiência de usuário consistente e agradável.
- **Layout Moderno:** Um design limpo e profissional, pensado para facilitar o uso no dia a dia do consultório.

## Tecnologias Utilizadas

Para construir uma aplicação robusta e moderna, foram utilizadas as seguintes tecnologias de ponta:

### Frontend

- **React:** Biblioteca para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
- **Vite:** Ferramenta de build extremamente rápida para desenvolvimento web moderno.
- **Styled-components:** Para estilização dos componentes, permitindo a criação de componentes de UI com escopo definido e reutilizáveis.
- **React Router:** Para o gerenciamento de rotas da aplicação.
- **Axios:** Cliente HTTP para realizar requisições à API do backend.
- **Notistack:** Para a exibição de notificações e alertas de forma elegante.
- **FullCalendar:** Para a criação da agenda interativa.
- **Framer Motion:** Para animações suaves e fluidas na interface.

### Backend (Conforme as configurações)

- O projeto está configurado para se conectar a um backend na porta `3000`, conforme o arquivo `.env`.

## Estrutura do Projeto

O código-fonte está organizado da seguinte forma para facilitar a manutenção e escalabilidade:

```
/src
|-- /api           # Lógica de comunicação com o backend
|-- /assets        # Imagens e outros recursos estáticos
|-- /components    # Componentes reutilizáveis (Cards, Modais, etc.)
|-- /layout        # Estrutura principal da aplicação (layout com sidebar)
|-- /pages         # Páginas principais da aplicação (Pacientes, Dentistas, etc.)
|-- App.tsx        # Configuração das rotas principais
|-- main.tsx       # Ponto de entrada da aplicação
|-- index.css      # Estilos globais
```

## Instalação e Execução

Para executar o projeto em seu ambiente de desenvolvimento local, siga os passos abaixo:

1. **Clone o repositório:**
  ```bash
  git clone <url-do-repositorio>
  ```

2. **Instale as dependências:**
  ```bash
  npm install
  ```

3. **Configure o ambiente:**
  - Crie o arquivo `.env`.
  - No arquivo `.env`, ajuste a variável `VITE_BACKEND_URL` para o endereço do servidor backend (por padrão, `http://localhost:3000`).

4. **Execute o projeto:**
  ```bash
  npm run dev
  ```

Após a execução, a aplicação estará disponível em `http://localhost:5173` (ou em outra porta, caso a 5173 esteja em uso).