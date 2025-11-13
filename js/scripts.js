// ===================================================================
// DADOS MOCKADOS PARA TEMPLATES (Simulação de API)
// ===================================================================
const MOCK_DATA = {
    projetos: [
        {
            id: 'reflorestar',
             titulo: 'Conservação e Reflorestamento Comunitário',
            descricao: 'Este projeto foca no plantio de árvores nativas em áreas degradadas do Parque do Cocó. Envolve ativamente escolas e moradores locais, promovendo a educação ambiental e o senso de responsabilidade comunitária pela preservação do bioma.',
            tags: ['Reflorestar é Viver', 'Voluntariado'],
            imagem: 'assets/images/imagem01projetofull.jpeg',
            alt: 'Comunidade plantando árvores no Parque do Cocó',
            cta: { label: 'Quero Plantar!', url: 'cadastro.html' }
        },
        {
            id: 'agua',
            titulo: 'Recursos Hídricos: Água Limpa',
            descricao: 'Focado na despoluição, monitoramento da qualidade da água e preservação das margens do Rio Cocó. Este projeto é vital para a saúde de todo o ecossistema, incluindo a vida aquática e a vegetação de manguezal.',
            tags: ['Poluição Zero', 'Monitoramento'],
            imagem: 'assets/images/imagem02projetofull.jpeg',
            alt: 'Água do Rio Cocó em dia limpo',
            cta: { label: 'Apoie a Causa', url: 'cadastro.html' }
        },
        {
            id: 'fauna',
            titulo: 'Fauna e Biodiversidade: Projeto Asa Verde',
            descricao: 'Dedicado à conservação de espécies de aves e seus habitats naturais no Parque. Inclui mapeamento de ninhos, observação e ações de proteção contra invasões e incêndios que ameaçam a fauna local.',
            tags: ['Ecoturismo', 'Educação Ambiental'],
            imagem: 'assets/images/imagem03projetofull.jpeg',
            alt: 'Ave em seu habitat natural no Parque do Cocó',
            cta: { label: 'Saiba Mais', url: 'cadastro.html' }
        }
    ],
     // Outros dados futuros...
};

// ===================================================================
// LÓGICA DE SINGLE PAGE APPLICATION (SPA)
// ===================================================================

const MAIN_CONTAINER_SELECTOR = 'main';
const PAGE_CACHE = {}; 

/**
 * Carrega o conteúdo de uma página HTML e extrai o conteúdo dentro da tag <main>.
 * @param {string} url O caminho para o arquivo HTML (ex: 'projetos.html').
 * @returns {Promise<string>} O conteúdo HTML do elemento <main>.
 */
async function loadPageContent(url) {
    if (PAGE_CACHE[url]) {
        return PAGE_CACHE[url];
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
 
        const mainContent = doc.querySelector(MAIN_CONTAINER_SELECTOR)?.innerHTML || '';
        PAGE_CACHE[url] = mainContent;
 
        return mainContent;
 
    } catch (error) {
        console.error('Erro ao carregar conteúdo da página:', url, error);
        return `<section class="section-padding"><div class="container"><h1 class="heading-1">Erro 404</h1><p>A página solicitada não pôde ser carregada.</p></div></section>`;
    }
}

/**
 * Navega para uma nova URL, injeta o conteúdo e atualiza o histórico do navegador.
 * @param {string} url A URL de destino (ex: 'projetos.html').
 */
async function navigate(url) {
    const mainElement = document.querySelector(MAIN_CONTAINER_SELECTOR);
    if (!mainElement) return;

    // Remove a classe 'is-open' do menu móvel (se estiver aberta)
    if (window.innerWidth < 992) {
        const nav = document.getElementById('main-navigation');
        if (nav.classList.contains('is-open')) toggleMenu();
    }

    // Carrega o novo conteúdo
    const content = await loadPageContent(url);
     mainElement.innerHTML = content;

    // Atualiza o histórico do navegador
    window.history.pushState({ path: url }, '', url);

    // Inicializa scripts específicos para a nova página
     initializePageScripts(url);
}

/**
 * Configura os listeners de clique para a navegação SPA.
 */
function setupNavigation() {
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
 
        if (target && target.closest('.site-header') && target.href.includes(window.location.host)) {
            const url = target.getAttribute('href');
            // Ignora links com hash (âncoras) ou externos
        if (url.startsWith('#') || url.includes('mailto:')) return; 

            e.preventDefault();
            navigate(url);
        }
    });

    // Lida com o botão Voltar/Avançar do navegador
    window.onpopstate = () => {
        const url = window.location.pathname.split('/').pop() || 'index.html';
        loadPageContent(url).then(content => {
        document.querySelector(MAIN_CONTAINER_SELECTOR).innerHTML = content;
            initializePageScripts(url);
        });
    };
}

/**
 * Inicializa scripts específicos após o carregamento dinâmico do conteúdo.
 * @param {string} url A URL da página carregada.
 */
function initializePageScripts(url) {
    setFooterYear(); // O footer não muda, mas é sempre bom garantir
 
    if (url.includes('projetos.html')) {
        renderContentForPage('projetos.html');
    }
    if (url.includes('cadastro.html')) {
        // Re-aplica máscaras e validação no novo formulário injetado
        applyMasks(); 
        handleCadastroForm(); 
    }
    // Garante que a barra de rolagem volte ao topo
    window.scrollTo(0, 0); 
}


// ===================================================================
// SISTEMA DE TEMPLATES JAVASCRIPT
// ===================================================================

/**
 * Gera o HTML para um único cartão de projeto.
 * @param {Object} projeto Objeto de dados do projeto.
 * @returns {string} O HTML do cartão.
 */
function projectCardTemplate(projeto) {
    return `
        <div class="col-12 col-lg-4">
            <div class="card card--project-list">
                <div class="card__image-container">
                    <img src="${projeto.imagem}" alt="${projeto.alt}" class="figure__img"></div>
                <h3 class="card__title">${projeto.titulo}</h3>
                <p>${projeto.descricao.substring(0, 100)}...</p>
                ${projeto.tags.map(tag => `<span class="tag tag--action">${tag}</span>`).join(' ')}
                <a href="${projeto.cta.url}" class="button button--secondary mt-64">${projeto.cta.label}</a>
            </div>
        </div>
    `;
}

/**
 * Renderiza os cartões de projeto na página 'projetos.html'.
 */
function renderProjectCards() {
    const container = document.getElementById('project-cards-container');
    if (!container) return;

    const html = MOCK_DATA.projetos.map(projectCardTemplate).join('');
    container.innerHTML = html;
}

/**
 * Função principal que decide o que renderizar dependendo da página.
 * @param {string} url A URL da página carregada.
 */
function renderContentForPage(url) {
    if (url.includes('projetos.html')) {
        renderProjectCards();
    }
}

// ===================================================================
// UTILIDADES E VALIDAÇÃO
// ===================================================================

/**
 * Valida um número de CPF (Cadastro de Pessoa Física) brasileiro.
 * @param {string} cpf O número do CPF (pode conter pontuações).
 * @returns {boolean} true se o CPF for válido, false caso contrário.
 */
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); 
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    // Valida 1º dígito
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Valida 2º dígito
    sum = 0;

    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

/**
 * Verifica se a pessoa com a data de nascimento fornecida é maior de 18 anos.
 * @param {string} dateString Data de nascimento no formato YYYY-MM-DD.
 * @returns {boolean} true se for adulto, false caso contrário.
 */
function isAdult(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
 
    // Ajusta a idade se o aniversário ainda não ocorreu este ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

// Expressão regular robusta para validação de e-mail (WCAG 2.1)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ===================================================================
// FUNÇÕES DE MÁSCARA
// ===================================================================

function maskCPF(value) {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskTelefone(value) {
    // Remove não-dígitos
    value = value.replace(/\D/g, ''); 
    // (XX) X
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
 
    // (XX) XXXXX-XXXX (Suporta o formato moderno de 9 dígitos)
    if (value.length > 13) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
    } else {
        // (XX) XXXX-XXXX (Para fixo ou 8 dígitos)
        value = value.replace(/(\d{4})(\d)/, '$1-$2'); 
    }
    return value;
}

function maskCEP(value) {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'); 
}

/**
 * Aplica os listeners de 'input' para as máscaras nos campos do formulário.
 */
function applyMasks() {
    document.getElementById('cpf')?.addEventListener('input', (e) => {
        e.target.value = maskCPF(e.target.value);
    });

    document.getElementById('telefone')?.addEventListener('input', (e) => {
        e.target.value = maskTelefone(e.target.value);
});

    document.getElementById('cep')?.addEventListener('input', (e) => {
        e.target.value = maskCEP(e.target.value);
    });
}


// ===================================================================
// FUNÇÕES DE INTERFACE (NAV, FOOTER)
// ===================================================================

/**
 * Alterna a visibilidade do menu de navegação principal (Mobile).
 */
function toggleMenu() {
    const nav = document.getElementById('main-navigation');
    const toggleButton = document.querySelector('.menu-toggle');

    if (nav && toggleButton) {
        nav.classList.toggle('is-open');
        const isExpanded = nav.classList.contains('is-open');
        toggleButton.setAttribute('aria-expanded', isExpanded);
        document.body.classList.toggle('menu-open', isExpanded);
    }
}

/**
 * Define o ano atual no footer.
 */
function setFooterYear() {
    // Atualiza todos os elementos com ID 'year', 'year2', etc.
    ['year', 'year2', 'year3'].forEach(id => {
        const span = document.getElementById(id);
    if (span) {
        span.textContent = new Date().getFullYear();
        }
    });
}

/**
 * Fecha o menu móvel ao clicar em um link (melhora a UX).
 */
function setupMobileMenuClose() {
    document.querySelectorAll('.main-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('main-navigation');
            // Fecha apenas se o menu estiver aberto e estiver em tela pequena
            if (nav && nav.classList.contains('is-open') && window.innerWidth < 992) {
             toggleMenu(); 
        }
        });
    });
}


// ===================================================================
// VALIDAÇÃO DE FORMULÁRIO
// ===================================================================

/**
 * Lógica de manipulação e validação do formulário de cadastro.
 */
function handleCadastroForm() {
    const form = document.getElementById('cadastroForm');
    const msgSucesso = document.getElementById('msg-sucesso');
 
    // Mapeamento de todos os campos (melhorando a legibilidade)
    const inputs = {
        nome: document.getElementById('nome'),
        cpf: document.getElementById('cpf'),
        nascimento: document.getElementById('nascimento'),
        telefone: document.getElementById('telefone'),
        endereco: document.getElementById('endereco'),
        cep: document.getElementById('cep'),
        cidade: document.getElementById('cidade'),
        estado: document.getElementById('estado'),
        email: document.getElementById('email')
    };

    if (!form || !msgSucesso) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
 
        let isValid = true; 
        let errorMessage = '';

        // Limpa validações e feedback anteriores
        Object.values(inputs).forEach(input => 
            input?.classList.remove('form-control--invalid')
        );
        msgSucesso.classList.remove('is-visible', 'alert--success', 'alert--error');

        // --- 1. VALIDAÇÃO DE OBRIGATORIEDADE E TAMANHO MÍNIMO ---
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            if (!input) return;
 
            const isRequired = input.hasAttribute('required');
            const rawValue = input.value.trim();
            const labelText = input.previousElementSibling?.textContent || input.id;
 
            if (isRequired && (rawValue === '' || (input.tagName === 'SELECT' && rawValue === ''))) {
                isValid = false;
                errorMessage += `<li>O campo ${labelText.replace(' *', '').replace(':', '')} é obrigatório.</li>`;
                input.classList.add('form-control--invalid');
            }
 
            // Validação de NOME (Tamanho mínimo 5)
            if (key === 'nome' && rawValue.length > 0 && rawValue.length < 5) {
                isValid = false;
                errorMessage += '<li>Nome deve ter pelo menos 5 caracteres.</li>';
                inputs.nome.classList.add('form-control--invalid');
            }

            // Validação de ENDEREÇO (Tamanho mínimo 10)
            if (key === 'endereco' && rawValue.length > 0 && rawValue.length < 10) {
                isValid = false;
                errorMessage += '<li>Endereço deve ser mais detalhado (mínimo 10 caracteres).</li>';
                inputs.endereco.classList.add('form-control--invalid');
            }
        });

        // --- 2. VALIDAÇÕES DE CONSISTÊNCIA ---

        // Validação de CPF (Consistência)

        if (inputs.cpf.value.trim() !== '' && !validateCPF(inputs.cpf.value)) {
        isValid = false;
            errorMessage += '<li>CPF inválido.</li>';
            inputs.cpf.classList.add('form-control--invalid');
        }

        // Validação de Idade (Maior de 18)
        const dataNascimento = inputs.nascimento.value.trim();
        if (dataNascimento !== '' && !isAdult(dataNascimento)) {
            isValid = false; 
            errorMessage += '<li>É necessário ter 18 anos ou mais para se voluntariar.</li>';
            inputs.nascimento.classList.add('form-control--invalid');
        }

            // Validação de E-MAIL (Formato Regex)
        if (inputs.email.value.trim() !== '' && !EMAIL_REGEX.test(inputs.email.value)) {
            isValid = false;
            errorMessage += '<li>E-mail inválido.</li>';
            inputs.email.classList.add('form-control--invalid');
        }

            // --- 3. EXIBIÇÃO DO FEEDBACK FINAL ---

        if (!isValid) {
            // Exibe a mensagem de erro detalhada
            msgSucesso.innerHTML = `
                ❌ **Preenchimento Incorreto:** Corrija os campos em vermelho.
                <ul>${errorMessage}</ul>
                `;
            msgSucesso.classList.add('alert--error', 'is-visible');
 
        } else {
            // Simulação de envio bem-sucedido

            // Simula um pequeno delay para processamento
                setTimeout(() => {
                msgSucesso.innerHTML = '✅ Cadastro enviado com sucesso! Agradecemos seu interesse em proteger o Cocó. Aguarde nosso contato.';
                msgSucesso.classList.add('alert--success', 'is-visible');
                form.reset(); 
                // Remove a mensagem de sucesso após 5 segundos (para evitar que fique permanentemente)
                setTimeout(() => {
                    msgSucesso.classList.remove('is-visible');
                }, 5000); 
            }, 1000); 
        }
    });
}


// ===================================================================
// INICIALIZAÇÃO GLOBAL
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Chamadas iniciais para o estado da página carregada
    setFooterYear(); 
    applyMasks(); 
    handleCadastroForm(); 
    setupMobileMenuClose();

    // Inicializa a navegação SPA
    setupNavigation(); 

    // Renderiza o conteúdo da página atual (se for 'projetos.html')
    renderContentForPage(window.location.pathname.split('/').pop() || 'index.html');
});
