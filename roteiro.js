// ============================================
// BLUETRIP - ROTEIRO.JS
// Lógica de geração de roteiros personalizados
// ============================================

// Roteiros de exemplo por preferência
const sampleItineraries = {
  praia: [
    { day: 1, activities: ['Chegada e check-in', 'Praia ao entardecer', 'Jantar à beira-mar'] },
    { day: 2, activities: ['Passeio de barco', 'Snorkel', 'Spa e relaxamento'] },
    { day: 3, activities: ['Compras no mercado local', 'Praia privada', 'Despedida'] }
  ],
  cultura: [
    { day: 1, activities: ['Visita ao museu principal', 'Centro histórico', 'Ópera local'] },
    { day: 2, activities: ['Passeio arquitetônico', 'Biblioteca histórica', 'Gastronomia local'] },
    { day: 3, activities: ['Galeria de arte', 'Mercado de artesanato', 'Concerto'] }
  ],
  natureza: [
    { day: 1, activities: ['Trilha matinal', 'Paisagem montanhosa', 'Piquenique'] },
    { day: 2, activities: ['Escalada', 'Lago alpino', 'Observação de fauna'] },
    { day: 3, activities: ['Caminhada final', 'Fotografia', 'Retorno'] }
  ],
  gastronomia: [
    { day: 1, activities: ['Mercado de alimentos', 'Aula de culinária', 'Degustação de vinhos'] },
    { day: 2, activities: ['Tour gastronômico', 'Restaurante tradicional', 'Café local'] },
    { day: 3, activities: ['Fábrica de chocolate', 'Almoço especial', 'Compras de souvenirs'] }
  ],
  aventura: [
    { day: 1, activities: ['Rapel', 'Trilha radical', 'Acampamento'] },
    { day: 2, activities: ['Escalada em rocha', 'Cânion', 'Fogueira'] },
    { day: 3, activities: ['Salto de paraquedas', 'Tirolesa', 'Retorno'] }
  ],
  relaxamento: [
    { day: 1, activities: ['Spa e massagem', 'Yoga ao amanhecer', 'Meditação'] },
    { day: 2, activities: ['Banho termal', 'Sauna', 'Tratamento facial'] },
    { day: 3, activities: ['Reflexologia', 'Chá relaxante', 'Despedida tranquila'] }
  ]
};

// Estado do formulário
let formData = {
  destination: '',
  days: 3,
  budget: 'moderado',
  preferences: []
};

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  setupFormListeners();
});

// Configurar listeners do formulário
function setupFormListeners() {
  // Input de destino
  const destinationInput = document.getElementById('destination');
  if (destinationInput) {
    destinationInput.addEventListener('input', function() {
      formData.destination = this.value;
    });
  }

  // Slider de dias
  const daysInput = document.getElementById('days');
  if (daysInput) {
    daysInput.addEventListener('input', function() {
      formData.days = parseInt(this.value);
      document.getElementById('daysValue').textContent = this.value;
    });
  }

  // Select de orçamento
  const budgetSelect = document.getElementById('budget');
  if (budgetSelect) {
    budgetSelect.addEventListener('change', function() {
      formData.budget = this.value;
    });
  }

  // Botões de preferência
  document.querySelectorAll('.preference-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const preference = this.getAttribute('data-preference');
      
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        formData.preferences = formData.preferences.filter(p => p !== preference);
      } else {
        this.classList.add('active');
        formData.preferences.push(preference);
      }
    });
  });

  // Botão de gerar roteiro
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateItinerary);
  }
}

// Gerar roteiro
function generateItinerary() {
  // Validar destino
  if (!formData.destination.trim()) {
    alert('Por favor, digite um destino');
    return;
  }

  // Selecionar preferência (primeira ou padrão)
  const preference = formData.preferences.length > 0 ? formData.preferences[0] : 'praia';
  const baseItinerary = sampleItineraries[preference] || sampleItineraries.praia;

  // Ajustar para o número de dias
  const adjustedItinerary = baseItinerary.slice(0, formData.days).map((item, idx) => ({
    day: idx + 1,
    activities: item.activities
  }));

  // Renderizar resultado
  renderItinerary(adjustedItinerary);
}

// Renderizar roteiro
function renderItinerary(itinerary) {
  const resultsContainer = document.getElementById('roteiro-results');
  
  if (!resultsContainer) return;

  const preferencesText = formData.preferences.length > 0 
    ? formData.preferences.join(', ') 
    : 'Geral';

  let html = `
    <div class="itinerary-header">
      <h2>Seu Roteiro em ${formData.destination}</h2>
      <p class="itinerary-meta">${formData.days} dias • Orçamento: ${formData.budget} • Preferências: ${preferencesText}</p>
    </div>
  `;

  // Adicionar dias
  itinerary.forEach(day => {
    html += `
      <div class="itinerary-day">
        <h3>Dia ${day.day}</h3>
        <ul class="itinerary-activities">
          ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  // Adicionar botões de ação
  html += `
    <div class="itinerary-actions">
      <button class="btn btn-primary" onclick="saveItinerary()">Salvar Roteiro</button>
      <button class="btn btn-outline" onclick="favoriteItinerary()">❤️ Favoritar</button>
    </div>
  `;

  resultsContainer.innerHTML = html;
}

// Salvar roteiro
function saveItinerary() {
  const itinerary = {
    destination: formData.destination,
    days: formData.days,
    budget: formData.budget,
    preferences: formData.preferences,
    savedAt: new Date().toLocaleString('pt-BR')
  };

  // Salvar no localStorage
  let saved = JSON.parse(localStorage.getItem('bluetrip_itineraries') || '[]');
  saved.push(itinerary);
  localStorage.setItem('bluetrip_itineraries', JSON.stringify(saved));

  alert(`✅ Roteiro "${formData.destination}" salvo com sucesso!`);
}

// Favoritar roteiro
function favoriteItinerary() {
  const favorite = {
    destination: formData.destination,
    days: formData.days,
    budget: formData.budget,
    preferences: formData.preferences,
    favoritedAt: new Date().toLocaleString('pt-BR')
  };

  // Salvar no localStorage
  let favorites = JSON.parse(localStorage.getItem('bluetrip_favorites') || '[]');
  favorites.push(favorite);
  localStorage.setItem('bluetrip_favorites', JSON.stringify(favorites));

  alert(`❤️ Roteiro "${formData.destination}" adicionado aos favoritos!`);
}
