// ============================================
// BLUETRIP - EXPLORAR.JS
// Lógica de filtros e listagem de destinos
// ============================================

// Dados dos destinos com informações detalhadas
const destinations = [
  {
    id: 1,
    name: 'Hotel Luxo Beachfront',
    type: 'hotel',
    rating: 4.8,
    price: 450,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-hotel-ArbYs7Q4jDmBhtMcLVMpXH.webp',
    location: 'Cancun, México',
    description: 'Resort de luxo com vista para o mar, piscina infinita e spa premium.',
    fullDescription: 'Um resort de cinco estrelas situado à beira-mar em Cancun, oferecendo uma experiência luxuosa incomparável. Desfrute de vistas panorâmicas do Caribe, piscina infinita aquecida, spa de classe mundial e restaurantes gourmet.',
    amenities: ['WiFi Grátis', 'Piscina Infinita', 'Spa Premium', 'Restaurante 5 Estrelas', 'Praia Privada', 'Concierge 24h'],
    reviews: 1250,
    checkIn: '15:00',
    checkOut: '11:00'
  },
  {
    id: 2,
    name: 'Restaurante Gourmet',
    type: 'restaurant',
    rating: 4.9,
    price: 120,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-restaurant-fwzn7hPM334NqLHLpseCQr.webp',
    location: 'Paris, França',
    description: 'Culinária francesa autêntica com estrela Michelin.',
    fullDescription: 'Restaurante premiado com uma estrela Michelin, especializado em culinária francesa clássica com toques modernos. Chef renomado internacionalmente cria pratos memoráveis com ingredientes selecionados.',
    amenities: ['Estrela Michelin', 'Adega com 500+ Vinhos', 'Menu Degustação', 'Reserva Obrigatória', 'Dress Code Formal', 'Ambiente Romântico'],
    reviews: 890,
    openingHours: '19:00 - 23:00',
    cuisine: 'Francesa'
  },
  {
    id: 3,
    name: 'Templo Antigo',
    type: 'attraction',
    rating: 4.7,
    price: 25,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-nature-SwUacve5ch9T95uDjLj6LB.webp',
    location: 'Bali, Indonésia',
    description: 'Monumento histórico com arquitetura impressionante e paisagem natural.',
    fullDescription: 'Templo histórico de mais de 500 anos, famoso por sua arquitetura intrincada e localização em meio à natureza selvagem. Um local sagrado que oferece uma experiência espiritual e cultural única.',
    amenities: ['Guia Turístico', 'Fotografia Permitida', 'Café Local', 'Loja de Souvenirs', 'Banheiros Públicos', 'Estacionamento Gratuito'],
    reviews: 2100,
    openingHours: '06:00 - 18:00',
    entryFee: 'Incluído'
  },
  {
    id: 4,
    name: 'Hotel Boutique',
    type: 'hotel',
    rating: 4.6,
    price: 280,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-hotel-ArbYs7Q4jDmBhtMcLVMpXH.webp',
    location: 'Barcelona, Espanha',
    description: 'Hotel charmoso no coração da cidade com design moderno.',
    fullDescription: 'Hotel boutique de design moderno localizado no coração de Barcelona, próximo aos principais pontos turísticos. Oferece acomodações elegantes com decoração contemporânea e atendimento personalizado.',
    amenities: ['WiFi Grátis', 'Café da Manhã Incluído', 'Rooftop Bar', 'Gym 24h', 'Serviço de Quarto', 'Recepção 24h'],
    reviews: 650,
    checkIn: '14:00',
    checkOut: '12:00'
  },
  {
    id: 5,
    name: 'Restaurante Italiano',
    type: 'restaurant',
    rating: 4.5,
    price: 85,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-restaurant-fwzn7hPM334NqLHLpseCQr.webp',
    location: 'Roma, Itália',
    description: 'Autêntica cozinha italiana com ingredientes frescos.',
    fullDescription: 'Restaurante tradicional italiano com receitas passadas de geração em geração. Todos os ingredientes são frescos e locais, preparados diariamente pelos chefs italianos experientes.',
    amenities: ['Pasta Fresca Diária', 'Vinho Tinto Italiano', 'Pátio Aconchegante', 'Reserva Recomendada', 'Aceita Grupos', 'Delivery Disponível'],
    reviews: 1050,
    openingHours: '12:00 - 23:00',
    cuisine: 'Italiana'
  },
  {
    id: 6,
    name: 'Parque Natural',
    type: 'attraction',
    rating: 4.8,
    price: 30,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663176050636/aqqFSQNrrCR96BCYUuV8oZ/bluetrip-nature-SwUacve5ch9T95uDjLj6LB.webp',
    location: 'Suíça',
    description: 'Paisagem alpina de tirar o fôlego com trilhas incríveis.',
    fullDescription: 'Parque natural protegido com paisagens alpinas de tirar o fôlego. Oferece trilhas para todos os níveis de dificuldade, desde caminhadas leves até escaladas desafiadoras, com vistas espetaculares das montanhas.',
    amenities: ['Trilhas Marcadas', 'Guia Disponível', 'Refúgio de Montanha', 'Piquenique Permitido', 'Fotografia Profissional', 'Estacionamento'],
    reviews: 1800,
    openingHours: '08:00 - 17:00',
    difficulty: 'Moderada'
  }
];

// Estado dos filtros
let filters = {
  type: [],
  maxPrice: 500
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  renderDestinations();
  setupFilterListeners();
  setupModal();
});

// Configurar listeners dos filtros
function setupFilterListeners() {
  // Filtros de tipo
  document.querySelectorAll('.filter-input[data-filter="type"]').forEach(input => {
    input.addEventListener('change', function() {
      if (this.checked) {
        filters.type.push(this.value);
      } else {
        filters.type = filters.type.filter(t => t !== this.value);
      }
      renderDestinations();
    });
  });

  // Filtro de preço
  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', function() {
      filters.maxPrice = parseInt(this.value);
      document.getElementById('priceValue').textContent = `R$ ${filters.maxPrice}`;
      renderDestinations();
    });
  }

  // Botão de reset
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      filters.type = [];
      filters.maxPrice = 500;
      
      document.querySelectorAll('.filter-input[data-filter="type"]').forEach(input => {
        input.checked = false;
      });
      
      if (priceRange) {
        priceRange.value = 500;
        document.getElementById('priceValue').textContent = 'R$ 500';
      }
      
      renderDestinations();
    });
  }

  // Toggle filtros (mobile)
  const toggleBtn = document.getElementById('toggleFilters');
  const filtersSidebar = document.getElementById('filtersSidebar');
  
  if (toggleBtn && filtersSidebar) {
    toggleBtn.addEventListener('click', function() {
      filtersSidebar.classList.toggle('active');
    });
  }

  // Fechar filtros
  const closeBtn = document.querySelector('.close-filters');
  if (closeBtn && filtersSidebar) {
    closeBtn.addEventListener('click', function() {
      filtersSidebar.classList.remove('active');
    });
  }
}

// Configurar modal
function setupModal() {
  const modal = document.getElementById('detailsModal');
  const closeBtn = document.querySelector('.modal-close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Abrir modal com detalhes
function openModal(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;

  const modal = document.getElementById('detailsModal');
  const modalContent = document.getElementById('modalContent');

  // Gerar HTML do modal
  let amenitiesHtml = dest.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
  
  let extraInfo = '';
  if (dest.type === 'hotel') {
    extraInfo = `
      <div class="modal-info-row">
        <span class="info-label">Check-in:</span>
        <span class="info-value">${dest.checkIn}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Check-out:</span>
        <span class="info-value">${dest.checkOut}</span>
      </div>
    `;
  } else if (dest.type === 'restaurant') {
    extraInfo = `
      <div class="modal-info-row">
        <span class="info-label">Horário:</span>
        <span class="info-value">${dest.openingHours}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Culinária:</span>
        <span class="info-value">${dest.cuisine}</span>
      </div>
    `;
  } else if (dest.type === 'attraction') {
    extraInfo = `
      <div class="modal-info-row">
        <span class="info-label">Horário:</span>
        <span class="info-value">${dest.openingHours}</span>
      </div>
      <div class="modal-info-row">
        <span class="info-label">Dificuldade:</span>
        <span class="info-value">${dest.difficulty || 'N/A'}</span>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <img src="${dest.image}" alt="${dest.name}" class="modal-image">
      <button class="modal-close">✕</button>
    </div>
    
    <div class="modal-body">
      <div class="modal-title-section">
        <h2>${dest.name}</h2>
        <div class="modal-rating">
          <span class="star">⭐</span>
          <span class="rating-value">${dest.rating}</span>
          <span class="reviews-count">(${dest.reviews} avaliações)</span>
        </div>
      </div>

      <div class="modal-location">
        <span>📍</span>
        <span>${dest.location}</span>
      </div>

      <div class="modal-price">
        <span class="price-label">Preço:</span>
        <span class="price-value">R$ ${dest.price}</span>
      </div>

      <div class="modal-section">
        <h3>Descrição</h3>
        <p>${dest.fullDescription}</p>
      </div>

      <div class="modal-section">
        <h3>Informações</h3>
        ${extraInfo}
      </div>

      <div class="modal-section">
        <h3>Comodidades & Serviços</h3>
        <div class="amenities-list">
          ${amenitiesHtml}
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary" onclick="bookNow(${dest.id})">Reservar Agora</button>
        <button class="btn btn-outline" onclick="addToWishlist(${dest.id})">❤️ Adicionar aos Favoritos</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reconfigurar botão de fechar
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById('detailsModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Reservar agora
function bookNow(id) {
  const dest = destinations.find(d => d.id === id);
  alert(`✅ Redirecionando para reserva de "${dest.name}"...`);
  closeModal();
}

// Adicionar aos favoritos
function addToWishlist(id) {
  const dest = destinations.find(d => d.id === id);
  let wishlist = JSON.parse(localStorage.getItem('bluetrip_wishlist') || '[]');
  
  if (!wishlist.find(w => w.id === id)) {
    wishlist.push({ id: dest.id, name: dest.name, type: dest.type });
    localStorage.setItem('bluetrip_wishlist', JSON.stringify(wishlist));
    alert(`❤️ "${dest.name}" adicionado aos favoritos!`);
  } else {
    alert(`"${dest.name}" já está nos seus favoritos!`);
  }
}

// Filtrar destinos
function getFilteredDestinations() {
  return destinations.filter(dest => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(dest.type);
    const priceMatch = dest.price <= filters.maxPrice;
    return typeMatch && priceMatch;
  });
}

// Renderizar destinos
function renderDestinations() {
  const filtered = getFilteredDestinations();
  const grid = document.getElementById('destinationsGrid');
  const resultsCount = document.getElementById('resultsCount');

  if (!grid) return;

  // Atualizar contagem
  if (resultsCount) {
    const count = filtered.length;
    resultsCount.textContent = `Mostrando ${count} resultado${count !== 1 ? 's' : ''}`;
  }

  // Limpar grid
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: #7a7a7a; font-size: 1.1rem;">Nenhum destino encontrado com os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  // Renderizar cards
  filtered.forEach(dest => {
    const card = createDestinationCard(dest);
    grid.appendChild(card);
  });
}

// Criar card de destino
function createDestinationCard(dest) {
  const card = document.createElement('div');
  card.className = 'destination-card';

  card.innerHTML = `
    <div class="destination-image">
      <img src="${dest.image}" alt="${dest.name}" loading="lazy">
      <div class="destination-rating">
        <span class="star">⭐</span>
        <span>${dest.rating}</span>
      </div>
    </div>
    <div class="destination-content">
      <h4>${dest.name}</h4>
      <div class="destination-location">
        <span>📍</span>
        <span>${dest.location}</span>
      </div>
      <p class="destination-description">${dest.description}</p>
      <div class="destination-footer">
        <div class="destination-price">
          <span>💰</span>
          <span>R$ ${dest.price}</span>
        </div>
        <button class="btn btn-primary" onclick="openModal(${dest.id})">Ver Detalhes</button>
      </div>
    </div>
  `;

  return card;
}
