🌳 SOS Parque do Cocó: Website Institucional

O website da ONG SOS Parque do Cocó é uma plataforma digital dedicada a informar o público sobre as ações de conservação e a mobilizar voluntários para a proteção do Parque Estadual do Cocó, a maior área verde urbana do Norte/Nordeste brasileiro.

🎯 Objetivo Principal

Prover uma experiência de usuário (UX) clara e acessível para:Informar sobre a missão da ONG e a importância do Parque.Mobilizar e cadastrar novos voluntários e apoiadores.Apresentar os projetos ambientais em andamento.

🛠️ Tecnologias Utilizadas

Este projeto é uma aplicação Front-end estática desenvolvida com ênfase em performance, acessibilidade e arquitetura modular.

Categoria       Tecnologia               Justificativa

Estrutura       HTML5 Semântico          Foco em acessibilidade e SEO (Search Engine Optimization).
Estilização     CSS3 (Mobile-First)      Uso de Variáveis CSS e um sistema de Grid/Flexbox modular para escalabilidade e design responsivo.
Interatividade  JavaScript (Vanilla JS)  Implementação de máscaras de formulário, validação de dados (CPF, Idade) e lógica de navegação.
Tipografia      Google Fonts (Poppins)   Fonte moderna e legível.

🚀 Como Executar o Projeto Localmente

Siga estes passos simples para ter uma cópia do projeto em funcionamento em sua máquina local.

Pré-requisitos
Você só precisa de um navegador moderno (Chrome, Firefox, Edge) e um editor de código (VS Code, Sublime Text).

Instalação e Execução
Clone o Repositório:
Bash
git clone [(https://github.com/ErialdoAlves/ongsosparquedococo)]
cd sos-parque-do-coco

Abra o Projeto:

Não é necessário um servidor web. Basta abrir os arquivos HTML diretamente no seu navegador.

No explorador de arquivos, clique duas vezes no arquivo index.html.

O projeto será carregado na URL: file:///caminho/para/sos-parque-do-coco/index.html.📂 

Estrutura de Arquivos

A organização do projeto segue um padrão lógico e de fácil manutenção:

sos-parque-do-coco/
├── assets/
│   ├── images/                # Imagens do site (logo, hero, projetos, etc.)
├── css/
│   └── styles.css             # Arquivo CSS principal e modularizado
├── js/
│   └── scripts.js             # Lógica JavaScript (Validação, Máscaras, Menu)
├── index.html                 # Página Inicial (Home)
├── projetos.html              # Página de Listagem dos Projetos
└── cadastro.html              # Página do Formulário de Voluntariado

💻 Destaques Técnicos

O projeto foi construído com foco em qualidade e escalabilidade:

1. Arquitetura CSS Modular (styles.css)

Variables: Utilização de var() para gerenciar Paleta de Cores e Espaçamento, seguindo uma escala modular de 8px.

Mobile-First Grid System: O layout responsivo é primário para dispositivos móveis, ajustando-se para telas maiores (Breakpoints em 576px, 768px, 992px, 1200px).

Convenção BEM-like: Classes como card--project, button--primary e main-nav__list garantem a clareza e evitam conflitos de estilos.

2. Validação de Formulário com Vanilla JS (scripts.js)

O formulário de cadastro usa validação de dados em tempo real e na submissão:

Máscaras: Implementação de máscaras para CPF, Telefone e CEP.

Validação de Negócio: Funções customizadas para checagem de CPF válido (algoritmo brasileiro) e maioridade (18 anos).

Feedback Acessível: Feedback visual (form-control--invalid, .alert--error) e suporte a leitores de tela (aria-live="polite") na mensagem de sucesso/erro.

3. Acessibilidade (WCAG 2.1 Nível AA)O código HTML/CSS/JS está otimizado para tecnologias assistivas:

Uso de atributos ARIA (aria-expanded, role="status").

Foco por Teclado (:focus visível) em todos os elementos interativos.

Estrutura de títulos hierárquicos (h1 a h4).

🤝 Contribuições

Este é um projeto inicial, mas ideias para melhorias futuras são bem-vindas, incluindo:

Implementação completa de Dark Mode e High Contrast (CSS Media Queries).
Refatoração para integrar uma ferramenta de pré-processamento CSS (Sass/Less).
Integração com um backend real ou serviço serverless para o envio de formulários.
Otimização de assets para web.

📄 Licença

O projeto está sob a licença ERZ.

Desenvolvido por: Erialdo Alves