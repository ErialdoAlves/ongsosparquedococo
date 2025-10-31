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