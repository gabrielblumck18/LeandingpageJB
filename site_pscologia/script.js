/* =========================================================
   ESSÊNCIA NATURAL — INTERAÇÕES JAVASCRIPT
   Rolagem suave, menu mobile, validação e animações
   ========================================================= */

(function () {
    'use strict';

    /* ---------------------------------------------------------
       CABEÇALHO COM SOMBRA AO ROLAR
       --------------------------------------------------------- */
    const cabecalho = document.querySelector('.cabecalho');
    let ultimaPosicao = 0;

    function aoRolar() {
        const posicaoAtual = window.scrollY;

        if (posicaoAtual > 20) {
            cabecalho.classList.add('com-rolagem');
        } else {
            cabecalho.classList.remove('com-rolagem');
        }

        ultimaPosicao = posicaoAtual;
    }

    window.addEventListener('scroll', aoRolar, { passive: true });

    /* ---------------------------------------------------------
       MENU MOBILE
       --------------------------------------------------------- */
    const botaoMenuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');

    if (botaoMenuMobile && menu) {
        botaoMenuMobile.addEventListener('click', function () {
            const aberto = menu.classList.toggle('aberto');
            botaoMenuMobile.classList.toggle('aberto');
            botaoMenuMobile.setAttribute('aria-expanded', aberto);
            botaoMenuMobile.setAttribute(
                'aria-label',
                aberto ? 'Fechar menu' : 'Abrir menu'
            );
        });

        // Fechar o menu ao clicar em qualquer link
        const linksMenu = menu.querySelectorAll('a');
        linksMenu.forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('aberto');
                botaoMenuMobile.classList.remove('aberto');
                botaoMenuMobile.setAttribute('aria-expanded', 'false');
                botaoMenuMobile.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }

    /* ---------------------------------------------------------
       ROLAGEM SUAVE COM COMPENSAÇÃO DO CABEÇALHO FIXO
       --------------------------------------------------------- */
    const linksAncora = document.querySelectorAll('a[href^="#"]');
    const alturaCabecalho = 80;

    linksAncora.forEach(function (link) {
        link.addEventListener('click', function (evento) {
            const destino = this.getAttribute('href');

            if (destino === '#' || destino === '') return;

            const elementoDestino = document.querySelector(destino);

            if (elementoDestino) {
                evento.preventDefault();
                const posicao =
                    elementoDestino.getBoundingClientRect().top +
                    window.scrollY -
                    alturaCabecalho;

                window.scrollTo({
                    top: posicao,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---------------------------------------------------------
       LÓGICA DO FORMULÁRIO DE FEEDBACK
       --------------------------------------------------------- */
    const formFeedback = document.getElementById('form-feedback');
    const feedbackMensagem = document.getElementById('feedback-mensagem');

    if (formFeedback) {
        formFeedback.addEventListener('submit', function (evento) {
            evento.preventDefault();
            
            const nome = document.getElementById('nome-feedback').value;
            const mensagem = document.getElementById('mensagem-feedback').value;

            // Simulação de envio (poderia ser uma chamada API aqui)
            if (feedbackMensagem) {
                feedbackMensagem.textContent = 'Enviando seu feedback...';
                feedbackMensagem.className = 'feedback-status';

                setTimeout(() => {
                    feedbackMensagem.textContent = `Obrigada pelo seu feedback, ${nome}! Sua mensagem foi enviada com sucesso.`;
                    feedbackMensagem.classList.add('sucesso');
                    formFeedback.reset();

                    // Limpa a mensagem após 5 segundos
                    setTimeout(() => {
                        feedbackMensagem.textContent = '';
                        feedbackMensagem.className = 'feedback-status';
                    }, 5000);
                }, 1500);
            }
        });
    }

    /* ---------------------------------------------------------
       ANIMAÇÃO DE ENTRADA POR INTERSEÇÃO
       Revela seções gradualmente conforme aparecem na tela
       --------------------------------------------------------- */
    const elementosAnimados = document.querySelectorAll(
        '.cartao, .depoimento, .sobre h2, .sobre p, .feedback h2, .formulario-feedback'
    );

    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver(
            function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.style.opacity = '1';
                        entrada.target.style.transform = 'translateY(0)';
                        observador.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        elementosAnimados.forEach(function (elemento, indice) {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(20px)';
            elemento.style.transition =
                'opacity 600ms ease-out, transform 600ms ease-out';
            elemento.style.transitionDelay = (indice % 3) * 100 + 'ms';
            observador.observe(elemento);
        });
    }

    /* ---------------------------------------------------------
       FECHAR MENU MOBILE AO CLICAR FORA
       --------------------------------------------------------- */
    document.addEventListener('click', function (evento) {
        if (
            menu &&
            menu.classList.contains('aberto') &&
            !menu.contains(evento.target) &&
            !botaoMenuMobile.contains(evento.target)
        ) {
            menu.classList.remove('aberto');
            botaoMenuMobile.classList.remove('aberto');
            botaoMenuMobile.setAttribute('aria-expanded', 'false');
        }
    });

    /* ---------------------------------------------------------
       TECLA ESC FECHA O MENU MOBILE
       --------------------------------------------------------- */
    document.addEventListener('keydown', function (evento) {
        if (
            evento.key === 'Escape' &&
            menu &&
            menu.classList.contains('aberto')
        ) {
            menu.classList.remove('aberto');
            botaoMenuMobile.classList.remove('aberto');
            botaoMenuMobile.setAttribute('aria-expanded', 'false');
            botaoMenuMobile.focus();
        }
    });

})();
