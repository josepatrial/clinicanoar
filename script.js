document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Specialty data for Live Simulator
  const specialtyData = {
    cardiologia: {
      label: 'Cardiologia',
      role: 'Cardiologista',
      headline: 'Cuidado cardiovascular de excelência para sua saúde e longevidade.',
      sub: 'Atendimento humanizado, diagnóstico preciso e acompanhamento individualizado com foco no seu bem-estar.',
      services: [
        { title: 'Check-up Cardíaco', desc: 'Avaliação preventiva completa' },
        { title: 'Ecocardiograma', desc: 'Exame preciso e sem dor' },
        { title: 'Risco Cirúrgico', desc: 'Laudo ágil pré-operatório' }
      ]
    },
    dermatologia: {
      label: 'Dermatologia',
      role: 'Dermatologista',
      headline: 'Saúde da pele e estética natural com protocolos personalizados.',
      sub: 'Tratamentos dermatológicos clínicos e procedimentos modernos para realçar sua beleza com segurança.',
      services: [
        { title: 'Dermatologia Clínica', desc: 'Diagnóstico e cuidados diários' },
        { title: 'Bioestimuladores', desc: 'Rejuvenescimento natural' },
        { title: 'Mapeamento Corporal', desc: 'Prevenção e acompanhamento' }
      ]
    },
    odontologia: {
      label: 'Odontologia',
      role: 'Cirurgião-Dentista',
      headline: 'Transforme seu sorriso com tecnologia digital e conforto.',
      sub: 'Planejamento odontológico completo, estética dental e reabilitação oral com atendimento acolhedor.',
      services: [
        { title: 'Lentes de Contato', desc: 'Harmonia e naturalidade' },
        { title: 'Implantes Dentários', desc: 'Segurança e precisão 3D' },
        { title: 'Ortodontia Digital', desc: 'Alinhadores transparentes' }
      ]
    },
    ortopedia: {
      label: 'Ortopedia',
      role: 'Ortopedista e Traumatologista',
      headline: 'Recupere seus movimentos e viva sem dores limitantes.',
      sub: 'Diagnóstico avançado para coluna, joelho, ombro e medicina esportiva com foco na sua reabilitação.',
      services: [
        { title: 'Medicina Esportiva', desc: 'Prevenção e performance' },
        { title: 'Cirurgia Minimamente Invasiva', desc: 'Recuperação acelerada' },
        { title: 'Terapias Regenerativas', desc: 'Alívio articular moderno' }
      ]
    },
    pediatria: {
      label: 'Pediatria',
      role: 'Pediatra',
      headline: 'Acolhimento e cuidado integral em cada fase do crescimento.',
      sub: 'Acompanhamento pediátrico próximo dos pais, com orientação clara, empatia e atenção aos detalhes.',
      services: [
        { title: 'Puericultura', desc: 'Desenvolvimento saudável' },
        { title: 'Orientação Vacinal', desc: 'Proteção em todas as idades' },
        { title: 'Atendimento Humanizado', desc: 'Consultas sem pressa' }
      ]
    },
    psicologia: {
      label: 'Psicologia',
      role: 'Psicólogo(a) Clínico(a)',
      headline: 'Um espaço seguro para cuidar da sua saúde emocional.',
      sub: 'Psicoterapia presencial e online com escuta qualificada para ansiedade, autoconhecimento e equilíbrio.',
      services: [
        { title: 'Terapia Individual', desc: 'Presencial e online' },
        { title: 'Gestão da Ansiedade', desc: 'Ferramentas práticas' },
        { title: 'Desenvolvimento Pessoal', desc: 'Equilíbrio na rotina' }
      ]
    }
  };

  let currentSpec = 'cardiologia';

  const simNameInput = document.getElementById('simName');
  const simCityInput = document.getElementById('simCity');
  const previewUrl = document.getElementById('previewUrl');
  const pvLogo = document.getElementById('pvLogo');
  const pvSpecTag = document.getElementById('pvSpecTag');
  const pvHeadline = document.getElementById('pvHeadline');
  const pvSub = document.getElementById('pvSub');
  const pvAvatar = document.getElementById('pvAvatar');
  const pvCardName = document.getElementById('pvCardName');
  const pvCardSpec = document.getElementById('pvCardSpec');
  const pvServices = document.getElementById('pvServices');
  const previewFrame = document.getElementById('previewFrame');

  function getInitials(name) {
    const clean = name.replace(/^(dr\.?|dra\.?|clínica|clinica|instituto)\s+/i, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'CN';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 28) || 'suaclinica';
  }

  function updateSimulator() {
    const data = specialtyData[currentSpec] || specialtyData.cardiologia;
    const rawName = (simNameInput?.value || '').trim() || 'Dr. Rafael Monteiro';
    const rawCity = (simCityInput?.value || '').trim() || 'Belo Horizonte - MG';

    if (pvLogo) pvLogo.textContent = rawName;
    if (pvCardName) pvCardName.textContent = rawName;
    if (pvAvatar) pvAvatar.textContent = getInitials(rawName);
    if (previewUrl) previewUrl.textContent = `https://${slugify(rawName)}.com.br`;

    if (pvSpecTag) pvSpecTag.textContent = `${data.label} • ${rawCity}`;
    if (pvHeadline) pvHeadline.textContent = data.headline;
    if (pvSub) pvSub.textContent = data.sub;
    if (pvCardSpec) pvCardSpec.textContent = data.role;

    if (pvServices) {
      pvServices.innerHTML = data.services
        .map(s => `
          <div class="pv-service-item">
            <strong>${s.title}</strong>
            <span>${s.desc}</span>
          </div>
        `)
        .join('');
    }
  }

  // Bind simulator inputs
  simNameInput?.addEventListener('input', updateSimulator);
  simCityInput?.addEventListener('input', updateSimulator);

  document.querySelectorAll('#specialtyPills .pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#specialtyPills .pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSpec = btn.dataset.spec;
      updateSimulator();
    });
  });

  document.querySelectorAll('#deviceToggle .device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#deviceToggle .device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const device = btn.dataset.device;
      if (previewFrame) {
        previewFrame.classList.toggle('mobile-mode', device === 'mobile');
        previewFrame.classList.toggle('desktop-mode', device === 'desktop');
      }
    });
  });

  // Pre-fill request form when clicking simulator CTA
  const simCtaBtn = document.getElementById('simCtaBtn');
  simCtaBtn?.addEventListener('click', () => {
    const doctorField = document.getElementById('doctorName');
    const specField = document.getElementById('specialty');
    const cityField = document.getElementById('cityState');

    if (doctorField && simNameInput?.value.trim()) doctorField.value = simNameInput.value.trim();
    if (cityField && simCityInput?.value.trim()) cityField.value = simCityInput.value.trim();
    if (specField) specField.value = specialtyData[currentSpec]?.label || '';
  });

  // Initial render
  updateSimulator();

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Request Form & Briefing Modal
  const requestForm = document.getElementById('requestForm');
  const briefingModal = document.getElementById('briefingModal');
  const briefingSummary = document.getElementById('briefingSummary');
  const modalClose = document.getElementById('modalClose');
  const copyBriefingBtn = document.getElementById('copyBriefingBtn');
  const openWhatsappBtn = document.getElementById('openWhatsappBtn');

  requestForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const doctorName = document.getElementById('doctorName').value.trim();
    const specialty = document.getElementById('specialty').value.trim();
    const cityState = document.getElementById('cityState').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const instagramOrSite = document.getElementById('instagramOrSite').value.trim();
    const notes = document.getElementById('notes').value.trim();

    const summaryText = [
      'Olá, equipe Clínica no Ar! Gostaria de solicitar uma prévia gratuita e sem compromisso do meu site.',
      '',
      `• Nome / Clínica: ${doctorName}`,
      `• Especialidade: ${specialty}`,
      `• Cidade / Estado: ${cityState}`,
      `• WhatsApp: ${whatsapp}`,
      instagramOrSite ? `• Instagram / Site atual: ${instagramOrSite}` : null,
      notes ? `• Observações: ${notes}` : null
    ]
      .filter(Boolean)
      .join('\n');

    if (briefingSummary) briefingSummary.textContent = summaryText;
    if (openWhatsappBtn) {
      openWhatsappBtn.href = `https://wa.me/5543991668376?text=${encodeURIComponent(summaryText)}`;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        if (copyBriefingBtn) copyBriefingBtn.textContent = 'Resumo Copiado ✓';
      }
    } catch {
      if (copyBriefingBtn) copyBriefingBtn.textContent = 'Copiar Resumo';
    }

    briefingModal?.classList.add('open');
    briefingModal?.setAttribute('aria-hidden', 'false');
  });

  copyBriefingBtn?.addEventListener('click', async () => {
    const text = briefingSummary?.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      copyBriefingBtn.textContent = 'Resumo Copiado ✓';
      setTimeout(() => {
        copyBriefingBtn.textContent = 'Copiar Resumo';
      }, 2500);
    } catch {
      // Fallback
    }
  });

  function closeModal() {
    briefingModal?.classList.remove('open');
    briefingModal?.setAttribute('aria-hidden', 'true');
  }

  modalClose?.addEventListener('click', closeModal);
  briefingModal?.addEventListener('click', (e) => {
    if (e.target === briefingModal) closeModal();
  });
});
