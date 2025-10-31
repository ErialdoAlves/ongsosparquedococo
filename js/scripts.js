document.addEventListener('DOMContentLoaded',()=>{
    const y=new Date().getFullYear();['year','year2','year3'].forEach(id=>{
        if(document.getElementById(id))
            document.getElementById(id).textContent=y;}
        );
    }
);

function toggleMenu() {
  const nav = document.getElementById('main-navigation');
  const toggleButton = document.querySelector('.menu-toggle');
  
  
  nav.classList.toggle('is-open');

  
  const isExpanded = nav.classList.contains('is-open');
  toggleButton.setAttribute('aria-expanded', isExpanded);
  
  
  document.body.classList.toggle('menu-open', isExpanded);
}


function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}


document.addEventListener('DOMContentLoaded', setFooterYear);


document.querySelectorAll('.main-nav__link').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('main-navigation');
        const toggleButton = document.querySelector('.menu-toggle');
        
        
        if (nav.classList.contains('is-open') && window.innerWidth < 992) {
            nav.classList.remove('is-open');
            toggleButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
});

/**
 * Aplica a máscara de CPF: 000.000.000-00
 */
function maskCPF(value) {
    return value
        .replace(/\D/g, '') // 1. Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // 2. Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // 3. Coloca um ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // 4. Coloca um hífen entre o nono e o décimo dígitos
}

/**
 * Aplica a máscara de Telefone (Fixo e Celular): (00) 0000-0000 ou (00) 90000-0000
 */
function maskTelefone(value) {
    value = value.replace(/\D/g, ''); // 1. Remove tudo o que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // 2. Coloca parênteses em volta dos dois primeiros dígitos (DDD)
    
    // 3. Coloca hífen no lugar correto, adaptando para 8 ou 9 dígitos após o DDD
    if (value.length > 14) {
        // Celular com 9 dígitos: (85) 91234-5678
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); 
    } else {
        // Telefone fixo/antigo celular 8 dígitos: (85) 1234-5678
        value = value.replace(/(\d{4})(\d)/, '$1-$2'); 
    }
    return value;
}

/**
 * Aplica a máscara de CEP: 00000-000
 */
function maskCEP(value) {
    return value
        .replace(/\D/g, '') // 1. Remove tudo o que não é dígito
        .replace(/^(\d{5})(\d)/, '$1-$2'); // 2. Coloca um hífen entre o quinto e o sexto dígitos
}

/**
 * Atribui as funções de máscara aos campos correspondentes.
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
// FUNÇÕES DE NAVEGAÇÃO E FEEDBACK (Lógica anterior)
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
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function handleCadastroForm() {
    const form = document.getElementById('cadastroForm');
    const nomeInput = document.getElementById('nome');
    const msgSucesso = document.getElementById('msg-sucesso');
    
    if (!form || !nomeInput || !msgSucesso) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Limpeza de feedback/validação anterior
        msgSucesso.style.display = 'none';
        nomeInput.classList.remove('form-control--invalid');
        
        // Simulação de Validação (Apenas verifica o campo Nome)
        if (nomeInput.value.trim() === "") {
            
            nomeInput.classList.add('form-control--invalid');
            
            // Simulação de Erro Visual (Alerta Vermelho)
            msgSucesso.textContent = '❌ Por favor, preencha o campo Nome para continuar.';
            msgSucesso.classList.remove('alert--success');
            // Nota: Você deve ter a classe 'alert--error' estilizada no seu CSS.
            msgSucesso.classList.add('alert--error'); 
            msgSucesso.style.display = 'block';

        } else {
            // Se a validação for bem-sucedida (Simulação)
            
            // Simula o envio de dados para o servidor
            setTimeout(() => {
                
                // Exibe a mensagem de sucesso (Feedback Visual - Alerta Verde)
                msgSucesso.textContent = '✅ Cadastro enviado com sucesso! Agradecemos seu interesse em proteger o Cocó.';
                msgSucesso.classList.add('alert--success');
                msgSucesso.classList.remove('alert--error');
                msgSucesso.style.display = 'block';

                // Limpa o formulário após o sucesso
                form.reset(); 
                
            }, 1000); 
        }
    });
}

// Inicialização de todas as funções após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    applyMasks(); // <--- INICIALIZAÇÃO DAS MÁSCARAS
    handleCadastroForm();
});

function toggleMenu() {
    const nav = document.getElementById('main-navigation');
    const toggleButton = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('is-open');

    const isExpanded = nav.classList.contains('is-open');
    toggleButton.setAttribute('aria-expanded', isExpanded);
    document.body.classList.toggle('menu-open', isExpanded);
}

/**
 * Função para configurar o ano atual no rodapé (Usada em todos os arquivos).
 */
function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Função principal para lidar com a submissão do formulário de Cadastro.
 */
function handleCadastroForm() {
    const form = document.getElementById('cadastroForm');
    const nomeInput = document.getElementById('nome');
    const msgSucesso = document.getElementById('msg-sucesso');
    
    if (!form) return;

    form.addEventListener('submit', function(event) {
        // 1. Previne o comportamento padrão (não recarrega a página)
        event.preventDefault();

        // 2. Remove qualquer feedback anterior
        msgSucesso.style.display = 'none';
        nomeInput.classList.remove('form-control--invalid');
        
        // 3. Simulação de Validação (Apenas verifica o campo Nome)
        if (nomeInput.value.trim() === "") {
            
            // Exibe Erro Visual
            nomeInput.classList.add('form-control--invalid');
            
            // Atualiza a mensagem de sucesso para simular um erro (Apenas para demonstração)
            msgSucesso.textContent = '❌ Por favor, preencha o campo Nome.';
            msgSucesso.classList.remove('alert--success');
            msgSucesso.classList.add('alert--error'); // Você precisaria estilizar 'alert--error' no CSS
            msgSucesso.style.display = 'block';

        } else {
            
            // 4. Se a validação for bem-sucedida (Simulação)
            
            // Simula o envio de dados para o servidor (e aguarda 1 segundo)
            setTimeout(() => {
                
                // Exibe a mensagem de sucesso (Feedback Visual)
                msgSucesso.textContent = '✅ Cadastro enviado com sucesso! Agradecemos seu interesse.';
                msgSucesso.classList.add('alert--success');
                msgSucesso.classList.remove('alert--error');
                msgSucesso.style.display = 'block';

                // 5. Limpa o formulário após o sucesso
                form.reset(); 
                
            }, 1000); 
        }
    });
}

// Inicialização de todas as funções após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    handleCadastroForm();
    
});