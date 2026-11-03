// =========================================================
// JavaScript nativo (sem bibliotecas extras)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------
  // 1) Validação do formulário (HTML5 + estilos do Bootstrap)
  // ---------------------------------------------------------
  const formulario = document.getElementById('formContato');
  const alertaSucesso = document.getElementById('alertaSucesso');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Não recarrega a página (não há servidor)

    // checkValidity() usa as regras HTML5: required, type="email", minlength, pattern...
    if (!formulario.checkValidity()) {
      evento.stopPropagation();
      formulario.classList.add('was-validated'); // Mostra as mensagens de erro do Bootstrap

      // Acessibilidade: leva o foco ao primeiro campo inválido
      const primeiroInvalido = formulario.querySelector(':invalid');
      if (primeiroInvalido) primeiroInvalido.focus();
      return;
    }

    // Formulário válido: mostra a mensagem de sucesso e limpa os campos
    alertaSucesso.classList.remove('d-none');
    formulario.reset();
    formulario.classList.remove('was-validated');

    // Esconde o alerta depois de 5 segundos
    setTimeout(() => alertaSucesso.classList.add('d-none'), 5000);
  });

  // ---------------------------------------------------------
  // 2) Modal: troca o conteúdo de acordo com o card clicado
  // ---------------------------------------------------------
  const descricoes = {
    'Criação de Sites': 'Desenvolvemos sites responsivos, acessíveis e otimizados para SEO, ' +
                        'com painel para você mesmo atualizar o conteúdo.',
    'Aplicativos Mobile': 'Criamos aplicativos para Android e iOS, desde o protótipo até a ' +
                          'publicação nas lojas oficiais.',
    'Hospedagem em Nuvem': 'Cuidamos da hospedagem do seu projeto com backups diários, ' +
                           'certificado SSL e monitoramento 24/7.'
  };

  const modal = document.getElementById('modalServico');
  const tituloModal = document.getElementById('modalServicoTitulo');
  const descricaoModal = document.getElementById('modalServicoDescricao');
  const campoAssunto = document.getElementById('assunto');
  let servicoAtual = '';

  // Evento do Bootstrap disparado logo antes do modal abrir
  modal.addEventListener('show.bs.modal', (evento) => {
    const botao = evento.relatedTarget;            // Botão que abriu o modal
    servicoAtual = botao.getAttribute('data-servico');
    tituloModal.textContent = servicoAtual;
    descricaoModal.textContent = descricoes[servicoAtual];
  });

  // Botão "Quero contratar": fecha o modal e já seleciona o serviço no formulário
  document.getElementById('btnConfirmarModal').addEventListener('click', () => {
    bootstrap.Modal.getInstance(modal).hide();
    campoAssunto.value = servicoAtual;
  });

  // ---------------------------------------------------------
  // 3) Navbar: fecha o menu mobile ao clicar em um link
  // ---------------------------------------------------------
  const menu = document.getElementById('menuPrincipal');
  document.querySelectorAll('#menuPrincipal .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
