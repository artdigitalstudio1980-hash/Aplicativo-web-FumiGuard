"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Phone, Bot, Send } from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const FAQS = [
  {
    question: "¿Cuáles son los precios?",
    answer: "Nuestros precios varían según el tamaño del área y el tipo de plaga. Para apartamentos pequeños desde $80.000 COP, y casas desde $120.000 COP. ¿Para qué tipo de propiedad necesitas el servicio?"
  },
  {
    question: "¿Qué tipos de plagas controlan?",
    answer: "Controlamos cucarachas, roedores, chinches, hormigas, pulgas, garrapatas, mosquitos, polillas, termitas y plagas de jardín. Usamos métodos efectivos y seguros."
  },
  {
    question: "¿Debo salir de casa durante el servicio?",
    answer: "Sugerimos que personas embarazadas, niños, adultos mayores, personas con problemas respiratorios y mascotas se retiren durante el procedimiento y 2 a 4 horas después por precaución."
  },
  {
    question: "¿Los productos manchan o dejan mal olor?",
    answer: "No. Utilizamos insecticidas y plaguicidas de grado profesional, microencapsulados o en gel, que son prácticamente inodoros y no manchan paredes, pisos ni muebles."
  },
  {
    question: "¿Cuánto dura el servicio?",
    answer: "Un servicio preventivo estándar toma entre 45 minutos y 1.5 horas. Tratamientos más severos o áreas más grandes pueden tomar más tiempo."
  },
  {
    question: "¿Con qué frecuencia debo fumigar?",
    answer: "Para un hogar, recomendamos un mantenimiento preventivo cada 3 a 6 meses. Si vives cerca de zonas verdes o restaurantes, es ideal hacerlo con mayor frecuencia."
  },
  {
    question: "¿Tienen servicio para negocios o empresas?",
    answer: "Sí, realizamos control de plagas comercial e industrial. Entregamos el Certificado de Fumigación exigido por las autoridades de salud e INVIMA. Contáctanos para un plan corporativo."
  },
  {
    question: "¿Qué preparación debo hacer antes?",
    answer: "Te recomendamos guardar alimentos, platos y utensilios. Cubrir o apagar peceras, y despejar un poco las áreas a tratar como bordes, rincones y debajo de muebles."
  },
  {
    question: "Garantías y Reglas",
    answer: "Ofrecemos garantía de 3 a 6 meses según el tratamiento. Si la plaga persiste dentro de ese periodo (y se han seguido nuestras recomendaciones), realizaremos un refuerzo sin costo adicional."
  },
  {
    question: "¿Cuáles son los medios de pago?",
    answer: "Aceptamos efectivo, transferencias bancarias (Bancolombia/Nequi/Daviplata) y tarjetas de crédito/débito. El pago se realiza al finalizar el servicio o por anticipado según el caso."
  }
];

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "bot">("menu");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "¡Hola! Soy el asistente virtual de Fumiguard. ¿En qué te puedo ayudar hoy?", sender: "bot" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "573192754499";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría recibir información sobre los servicios de fumigación.")}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (view === "bot") {
      scrollToBottom();
    }
  }, [messages, view]);

  const handleFAQClick = (faq: { question: string; answer: string }) => {
    const newUserMsg: ChatMessage = { id: Date.now(), text: faq.question, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    
    // Simular un retraso en la respuesta para mayor realismo
    setTimeout(() => {
      const newBotMsg: ChatMessage = { id: Date.now() + 1, text: faq.answer, sender: "bot" };
      setMessages((prev) => [...prev, newBotMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Contenedor del Widget */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl mb-4 overflow-hidden flex flex-col w-[320px] sm:w-[380px] transition-all duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {view === "menu" ? <MessageCircle size={20} /> : <Bot size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Fumiguard</h3>
                <p className="text-xs text-emerald-100 font-medium">
                  {view === "menu" ? "Canales de Atención" : "Asistente Virtual"}
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setIsOpen(false); setTimeout(() => setView("menu"), 300); }} 
              className="text-white hover:text-emerald-200 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* View: Menu */}
          {view === "menu" && (
            <div className="p-6 flex flex-col gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mb-2">
                ¿Cómo prefieres comunicarte con nosotros?
              </p>
              
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors border border-green-200 dark:border-green-800/50 cursor-pointer text-green-900 dark:text-green-100 group"
              >
                <div className="bg-[#25D366] text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Phone size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Chatear por WhatsApp</h4>
                  <p className="text-xs opacity-80 mt-0.5">Habla con un asesor en vivo</p>
                </div>
              </a>

              <button 
                onClick={() => setView("bot")}
                className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer text-zinc-800 dark:text-zinc-200 text-left w-full group"
              >
                <div className="bg-emerald-600 dark:bg-emerald-500 text-white p-3 rounded-full shadow-md group-hover:scale-110 transition-transform">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-base">Hablar con el Bot</h4>
                  <p className="text-xs opacity-80 mt-0.5">Respuestas rápidas a consultas</p>
                </div>
              </button>
            </div>
          )}

          {/* View: Bot */}
          {view === "bot" && (
            <div className="flex flex-col h-[400px]">
              {/* Bot Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-950/30">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
                  >
                    <div className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-emerald-600 text-white rounded-tr-sm" 
                        : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm border border-zinc-200 dark:border-zinc-700"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Quick Actions Area */}
              <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2 font-bold px-1 uppercase tracking-wider">Consultas Frecuentes</p>
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide snap-x">
                  {FAQS.map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleFAQClick(faq)}
                      className="snap-start whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-2 rounded-full hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300 transition-colors border border-zinc-200 dark:border-zinc-700 font-medium"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
                <div className="mt-1 flex justify-between items-center text-xs text-zinc-500 px-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button onClick={() => setView("menu")} className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors font-medium">
                    &larr; Volver
                  </button>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 flex items-center gap-1.5 font-bold">
                    Asesor Humano <Send size={12} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen && view === "bot") setView("menu"); }}
        className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-emerald-600/30 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center z-50 border-2 border-white/10"
        aria-label="Abrir chat de soporte"
      >
        {isOpen ? <X size={28} className="animate-in spin-in-90" /> : <MessageCircle size={28} className="animate-in zoom-in" />}
      </button>
    </div>
  );
}
