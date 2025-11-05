// ===================================================================
// DADOS MOCKADOS PARA SIMULAR UM BACKEND (Para Templates JS)
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
    conteudo: {
        'index.html': 'Conteúdo da Home',
        'cadastro.html': 'Conteúdo do Cadastro'
    }
};

// ===================================================================
// FUNÇÕES DE UTILIDADE E VALIDAÇÃO (CPF, IDADE, MÁSCARAS)
// ===================================================================

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); 
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function isAdult(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

function maskCPF(value) {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskTelefone(value) {
    value = value.replace(/\D/g, ''); 
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    
    if (value.length > 14) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
    } else {
        value = value.replace(/(\d{4})(\d)/, '$1-$2'); 
    }
    return value;
}

function maskCEP(value) {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2'); 
}

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

function setFooterYear() {
    const yearSpan = document.getElementById('year');
    // Adiciona suporte para IDs 'year2' e 'year3' também
    ['year', 'year2', 'year3'].forEach(id => {
        const span = document.getElementById(id);
        if (span) {
            span.textContent = new Date().getFullYear();
        }
    });
}

// Lógica para fechar o menu ao clicar em um link (mobile)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.main-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('main-navigation');
            if (nav && nav.classList.contains('is-open') && window.innerWidth < 992) {
                // Chama o toggleMenu() para fechar o menu corretamente
                toggleMenu(); 
            }
        });
    });
});


// ===================================================================
// LÓGICA DE VALIDAÇÃO DE FORMULÁRIO (A ÚNICA E CORRETA)
// ===================================================================

function handleCadastroForm() {
    const form = document.getElementById('cadastroForm');
    const msgSucesso = document.getElementById('msg-sucesso');
    
    // Mapeamento de todos os campos
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
        
        let isValid = true; // Começa como válido
        let errorMessage = '';
        
        // Limpa validações e feedback anteriores
        Object.values(inputs).forEach(input => 
            input?.classList.remove('form-control--invalid')
        );
        msgSucesso.classList.remove('is-visible', 'alert--success', 'alert--error');

        // --- 1. VALIDAÇÃO DE OBRIGATORIEDADE (Campos Vazios) ---
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            if (!input) return;

            if (input.value.trim() === '' || (input.tagName === 'SELECT' && input.value === '')) {
                isValid = false; // Define como inválido
                const labelText = input.previousElementSibling?.textContent || input.id;
                errorMessage += `<li>O campo ${labelText.replace(' *', '').replace(':', '')} é obrigatório.</li>`;
                input.classList.add('form-control--invalid');
            }
        });

        // --- 2. VALIDAÇÕES DE CONSISTÊNCIA ---

        // Validação de NOME (Tamanho mínimo 5)
        if (inputs.nome.value.trim().length > 0 && inputs.nome.value.trim().length < 5) {
            isValid = false;
            errorMessage += '<li>Nome deve ter pelo menos 5 caracteres.</li>';
            inputs.nome.classList.add('form-control--invalid');
        }

        // Validação de CPF (Consistência)
        if (inputs.cpf.value.trim() !== '' && !validateCPF(inputs.cpf.value)) {
            isValid = false;
            errorMessage += '<li>CPF inválido.</li>';
            inputs.cpf.classList.add('form-control--invalid');
        }

        // 3. Validação de Idade (Consistência: Maior de 18)
        const dataNascimento = inputs.nascimento.value.trim();
        
        if (dataNascimento !== '') {
            // Se isAdult retornar false (NÃO É adulto)
            if (!isAdult(dataNascimento)) {
                isValid = false; // O ERRO DEVE ESTAR AQUI!
                errorMessage += '<li>É necessário ter 18 anos ou mais para se voluntariar.</li>';
                inputs.nascimento.classList.add('form-control--invalid');
            }
        }
        
        // Validação de E-MAIL (Formato básico)
        if (inputs.email.value.trim() !== '' && (!inputs.email.value.includes('@') || inputs.email.value.lastIndexOf('.') < inputs.email.value.lastIndexOf('@'))) {
             isValid = false;
             errorMessage += '<li>E-mail inválido.</li>';
             inputs.email.classList.add('form-control--invalid');
        }
        
        // --- 3. EXIBIÇÃO DO FEEDBACK FINAL ---
        
        console.log('FINAL DE VALIDAÇÃO: isValid =', isValid); // Verifique este log

        if (!isValid) {
            // Se isValid for false, este bloco deve ser executado
            msgSucesso.innerHTML = `
                ❌ **Preenchimento Incorreto:** Corrija os campos em vermelho.
                <ul>${errorMessage}</ul>
            `;
            msgSucesso.classList.add('alert--error', 'is-visible');
            
        } else {
            // Se isValid for true, este bloco deve ser executado (Sucesso)
            
            setTimeout(() => {
                msgSucesso.innerHTML = '✅ Cadastro enviado com sucesso! Aguarde nosso contato.';
                msgSucesso.classList.add('alert--success', 'is-visible');
                form.reset(); 
            }, 1000); 
        }
    });
}


// ===================================================================
// LÓGICA SPA, TEMPLATES E INICIALIZAÇÃO
// ===================================================================

const PAGE_CACHE = {}; 
const MAIN_CONTAINER_SELECTOR = 'main';

// ... (Restante das funções SPA loadPageContent, navigate, renderProjectCards, etc.
//      que você já tinha, mas devem vir antes da inicialização.)

// Lógica para inicializar scripts específicos após a mudança de página
function initializePageScripts(url) {
    setFooterYear(); 
    if (url.includes('projetos.html')) {
        renderProjectCards();
    }
    // Garante que máscaras e validação sejam aplicadas ao carregar a página de cadastro
    if (url.includes('cadastro.html')) {
        applyMasks(); 
        handleCadastroForm(); 
    }
}

// Inicialização Global
document.addEventListener('DOMContentLoaded', () => {
    // Estas funções são chamadas na carga inicial (sem SPA ativo)
    setFooterYear(); 
    applyMasks(); 
    handleCadastroForm(); 
    // ... (Inicialização dos listeners SPA)
});