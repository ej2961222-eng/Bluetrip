// ============================================
// BLUETRIP - MAIN.JS
// Funcionalidades gerais do site
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Atualizar link ativo da navegação
  updateActiveNavLink();
  
  // Adicionar listeners para cliques em links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      updateActiveNavLink();
    });
  });
});

// Atualizar link ativo baseado na página atual
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fechar filtros ao clicar fora (mobile)
document.addEventListener('click', function(e) {
  const filtersSidebar = document.getElementById('filtersSidebar');
  const toggleBtn = document.getElementById('toggleFilters');
  
  if (filtersSidebar && toggleBtn) {
    if (!filtersSidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      filtersSidebar.classList.remove('active');
    }
  }
});
