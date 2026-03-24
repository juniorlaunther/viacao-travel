/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { 
  Bus, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Instagram, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  GraduationCap,
  Building2,
  Plane
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      const logo = document.getElementById('header-logo');
      
      if (scrolled) {
        headerRef.current?.classList.add('glass', 'py-3', 'shadow-sm');
        headerRef.current?.classList.remove('py-5');
        logo?.classList.remove('brightness-0', 'invert');
        headerRef.current?.querySelectorAll('.nav-link').forEach(el => {
          el.classList.add('text-slate-700');
          el.classList.remove('text-white');
        });
        headerRef.current?.querySelector('.menu-btn')?.classList.add('text-slate-700');
        headerRef.current?.querySelector('.menu-btn')?.classList.remove('text-white');
      } else {
        headerRef.current?.classList.remove('glass', 'py-3', 'shadow-sm');
        headerRef.current?.classList.add('py-5');
        logo?.classList.add('brightness-0', 'invert');
        headerRef.current?.querySelectorAll('.nav-link').forEach(el => {
          el.classList.remove('text-slate-700');
          el.classList.add('text-white');
        });
        headerRef.current?.querySelector('.menu-btn')?.classList.remove('text-slate-700');
        headerRef.current?.querySelector('.menu-btn')?.classList.add('text-white');
      }
    };
    
    // Initial call to set state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from('.hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Scroll Reveal
      gsap.utils.toArray('.reveal').forEach((elem: any) => {
        gsap.to(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        });
      });

      // Bento Grid Stagger
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 80%'
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const toggleMobileMenu = () => {
    mobileMenuRef.current?.classList.toggle('hidden');
    mobileMenuRef.current?.classList.toggle('flex');
  };

  const whatsappLink = "https://wa.me/5519993051820";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4jdlFTYi2loIuXovFoEcw_X_L-xRWcVcJe1QuPyVKEFj62TOtBRBVstOgI76yQd3ky3ijrH0msCC0J6mrJoje15tjj7vVsq3QgYtVhfFRdPdh62lrb-T2mP2A0RYApyNxFJjDlGffy9YA1x_H9jGlW2UCJtuqPLpMuQv4VTDR0FgwL7f-haM-0dxPlHw/s320/logo_3d-removebg-preview.png" 
              alt="Viação Travel Logo" 
              className="h-10 sm:h-12 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
              id="header-logo"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="nav-link text-sm font-medium text-white hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              <Phone size={16} />
              <span>Orçamento</span>
            </a>
            <button 
              onClick={toggleMobileMenu}
              className="menu-btn md:hidden p-2 text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className="hidden fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-lg z-[60] flex-col items-center justify-center gap-6 p-10 md:hidden rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300"
        >
          <button 
            onClick={toggleMobileMenu}
            className="absolute top-6 right-8 p-2 text-slate-400 hover:text-primary transition-colors"
          >
            <X size={28} />
          </button>
          {['Início', 'Serviços', 'Diferenciais', 'Sobre', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={toggleMobileMenu}
              className="text-xl font-display font-bold text-slate-800 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full text-base font-bold shadow-lg shadow-primary/20"
          >
            <Phone size={18} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="início" className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiU4mDTrcmHyTbNwFjlIUuOQId0zv1STk3gqpMf20DFfCg_sHXJk4x_IqX8bUWWf4eaIzOrRKiGoSW8IHub5jCm216FRcfVX97Cy6Eq7WFGbRyrRHnvDCxbfdapaLvCjco9GI5G3Ox4LRZhyOVIJKuEQv6sOcAGe4q5JK9Fb9SuoWVzGx8Xevn8pguwXCs/s16000/imagem%20hero.png" 
            alt="Viação Travel Fleet" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-2xl hero-content">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/40 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm border border-white/20">
              Transporte Executivo & Escolar
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 text-balance">
              Sua Viagem com <span className="text-accent">Segurança</span> e Conforto Absoluto.
            </h1>
            <p className="text-lg text-slate-200 mb-8 max-w-lg leading-relaxed">
              Especialistas em fretamento, turismo e transporte escolar em Campinas, Americana, Nova Odessa e Sumaré.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={whatsappLink}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-all flex items-center gap-2 group shadow-xl shadow-primary/30"
              >
                Solicitar Orçamento
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#serviços"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-8 sm:py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'anos de experiência', value: '10+' },
              { label: 'veículos na frota', value: '5+' },
              { label: 'clientes atendidos', value: '1mil+' },
              { label: 'cidades atendidas', value: '4+' },
            ].map((stat, i) => (
              <div key={i} className="text-center reveal">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 animate-heartbeat">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Soluções Completas em Transporte</h2>
            <p className="text-slate-600">Oferecemos uma frota moderna e motoristas qualificados para atender todas as suas necessidades de deslocamento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Fretamento Empresarial',
                desc: 'Transporte de funcionários com pontualidade e segurança. Vans e micro-ônibus executivos para sua empresa.',
                icon: <Building2 className="text-white" size={32} />,
                color: 'bg-primary'
              },
              {
                title: 'Turismo e Excursões',
                desc: 'Viagens de lazer, eventos e turismo religioso. Conforto total para grupos em trajetos curtos ou longos.',
                icon: <Plane className="text-white" size={32} />,
                color: 'bg-accent'
              },
              {
                title: 'Transporte Escolar',
                desc: 'Atendimento especializado para colégios e faculdades renomadas da região com total responsabilidade.',
                icon: <GraduationCap className="text-white" size={32} />,
                color: 'bg-primary-dark'
              }
            ].map((service, i) => (
              <div key={i} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 reveal flex flex-col items-start">
                <div className={cn("mb-6 p-4 rounded-2xl shadow-lg", service.color)}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{service.desc}</p>
                <a href={whatsappLink} className="mt-auto text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Saber mais <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Differentials */}
      <section id="diferenciais" className="py-10 sm:py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Por que escolher a Viação Travel?</h2>
            <p className="text-slate-400 max-w-2xl">Nosso compromisso é com a excelência em cada quilômetro percorrido.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px] bento-grid">
            <div className="md:col-span-2 md:row-span-2 bg-primary rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden bento-item">
              <div className="absolute top-8 right-8 opacity-20">
                <ShieldCheck size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Segurança em Primeiro Lugar</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Veículos com manutenção rigorosa e motoristas treinados periodicamente. Seguimos todas as normas da ARTESP e órgãos reguladores.
              </p>
            </div>

            <div className="md:col-span-2 bg-slate-800 rounded-3xl p-8 flex flex-col justify-center bento-item">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-700 rounded-xl">
                  <Clock className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold">Pontualidade Britânica</h3>
              </div>
              <p className="text-slate-400 text-sm">Sabemos que seu tempo é valioso. Garantimos horários precisos para fretamentos e transporte escolar.</p>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 flex flex-col justify-center bento-item">
              <div className="mb-4 text-accent">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Atendimento Humano</h3>
              <p className="text-slate-400 text-xs">Suporte rápido e eficiente via WhatsApp para todas as suas dúvidas.</p>
            </div>

            <div className="bg-slate-800 rounded-3xl p-8 flex flex-col justify-center bento-item">
              <div className="mb-4 text-accent">
                <MapPin size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Ampla Cobertura</h3>
              <p className="text-slate-400 text-xs">Atendemos Campinas, Americana, Nova Odessa e Sumaré com rotas otimizadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Nossa História</span>
              
              {/* Mobile Image - only visible on mobile, between titles */}
              <div className="lg:hidden my-6 flex justify-center">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXB4iiGD1yGIgutv_1uxyPZCX8ITB8zy7Lr0oOpsq12H0HqhRqde6LF5AbkPG8MdQbgZ6XF3StnsNCQkIoXbZ_NfiIJYCpfH0vUIH8nPnBJ68yAVBQtLDKhQqSXtSMJ-a4NSx0CT2Svj523RDIVt_Wz00yMwyc4slI1FQZSm4Qk7Ezh85l9W3WylaBBmc/s16000/sobre.png" 
                  alt="Equipe Viação Travel" 
                  className="rounded-2xl shadow-xl w-[80%] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Compromisso com o seu destino</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  A Viação Travel nasceu com o propósito de elevar o padrão do transporte na região de Campinas e Americana. Com uma visão estratégica e moderna, investimos constantemente em tecnologia e treinamento.
                </p>
                <p>
                  Atuamos nos segmentos de fretamento empresarial, turismo e transporte escolar, sempre focados em oferecer uma experiência premium para nossos passageiros.
                </p>
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-primary"><ShieldCheck size={20} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Certificações</h4>
                      <p className="text-xs">Registros em dia nos órgãos competentes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-primary"><Bus size={20} /></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Frota Moderna</h4>
                      <p className="text-xs">Vans e Micro-ônibus de última geração.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex relative reveal justify-center lg:justify-end">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXB4iiGD1yGIgutv_1uxyPZCX8ITB8zy7Lr0oOpsq12H0HqhRqde6LF5AbkPG8MdQbgZ6XF3StnsNCQkIoXbZ_NfiIJYCpfH0vUIH8nPnBJ68yAVBQtLDKhQqSXtSMJ-a4NSx0CT2Svj523RDIVt_Wz00yMwyc4slI1FQZSm4Qk7Ezh85l9W3WylaBBmc/s16000/sobre.png" 
                alt="Equipe Viação Travel" 
                className="relative rounded-2xl shadow-2xl w-full lg:w-1/2 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Focus Section */}
      <section className="py-10 sm:py-16 bg-primary/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary rounded-3xl p-8 sm:p-12 shadow-xl border border-primary/10 reveal text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  Especialista em Escolar <Star className="text-yellow-400 fill-yellow-400" size={24} />
                </h2>
                <p className="text-white/80 mb-6">Segurança total para o futuro da sua família. Atendemos as principais instituições da região.</p>
                <a href={whatsappLink} className="inline-flex items-center gap-2 text-white font-bold hover:underline">
                  Consultar rotas escolares <ChevronRight size={18} />
                </a>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-accent mb-4 flex items-center gap-2">
                    <Building2 size={18} /> Colégios
                  </h4>
                  <ul className="space-y-3 text-white/80 text-sm">
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-accent" /> Instituto Educacional Americana</li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-accent" /> Colégio ILIMIT</li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-accent" /> Objetivo Americana</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-accent mb-4 flex items-center gap-2">
                    <GraduationCap size={18} /> Faculdades
                  </h4>
                  <ul className="space-y-3 text-white/80 text-sm">
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-accent" /> Unicamp Campinas</li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-accent" /> PUC Campinas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 reveal">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">O que dizem nossos passageiros</h2>
            <div className="flex justify-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Santos",
                role: "Fretamento Empresarial",
                text: "Utilizo o fretamento da Viação Travel há 2 anos. Pontualidade impecável e veículos sempre muito limpos e confortáveis."
              },
              {
                name: "Mariana Costa",
                role: "Mãe de Aluno",
                text: "Fico muito tranquila em saber que meu filho está em boas mãos. O motorista é muito atencioso e o transporte é super seguro."
              },
              {
                name: "André Oliveira",
                role: "Turismo",
                text: "Fizemos uma excursão para Aparecida e foi excelente. O micro-ônibus era novo e a viagem foi muito tranquila. Recomendo!"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-200 p-8 rounded-2xl border border-slate-300 reveal">
                <p className="text-slate-700 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contato" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-primary rounded-[2rem] p-8 sm:p-16 text-center text-white relative overflow-hidden reveal">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">Pronto para viajar com a melhor da região?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Entre em contato agora mesmo e solicite um orçamento personalizado para sua empresa, escola ou viagem de lazer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Phone size={24} />
                Chamar no WhatsApp
              </a>
              <a 
                href="https://www.instagram.com/viacaotravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-primary-dark text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
              >
                <Instagram size={24} />
                Seguir no Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4jdlFTYi2loIuXovFoEcw_X_L-xRWcVcJe1QuPyVKEFj62TOtBRBVstOgI76yQd3ky3ijrH0msCC0J6mrJoje15tjj7vVsq3QgYtVhfFRdPdh62lrb-T2mP2A0RYApyNxFJjDlGffy9YA1x_H9jGlW2UCJtuqPLpMuQv4VTDR0FgwL7f-haM-0dxPlHw/s320/logo_3d-removebg-preview.png" 
                alt="Viação Travel Logo" 
                className="h-12 w-auto mb-6 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Referência em transporte de passageiros na região de Campinas e Americana. Segurança, conforto e pontualidade em cada destino.
              </p>
            </div>
            <div className="hidden md:block">
              <h4 className="font-bold mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#início" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#serviços" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h4 className="font-bold mb-6">Contato</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> Campinas, Americana e Região</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> (19) 99305-1820</li>
                <li className="flex items-center gap-3"><Instagram size={16} className="text-primary" /> @viacaotravel</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© Copyright 2026 - Viação Travel. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Política de Privacidade</a>
              <a href="#" className="hover:text-white">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
