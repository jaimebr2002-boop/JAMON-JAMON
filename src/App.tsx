/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Menu, 
  X, 
  Utensils, 
  ShoppingBag, 
  Truck, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Map
} from 'lucide-react';

const reviews = [
  { id: 1, text: "Las mejores tapas que he probado en Oviedo. El ambiente es fantástico.", author: "María G." },
  { id: 2, text: "La comida es un espectáculo. Servicio de 10 y terraza muy agradable.", author: "Carlos R." },
  { id: 3, text: "Tapas tradicionales pero con una presentación moderna. Volveremos seguro.", author: "Ana P." },
  { id: 4, text: "Calidad precio inmejorable. El personal es súper atento.", author: "Javier L." },
  { id: 5, text: "Un sitio de referencia en Oviedo. La terraza es perfecta para el verano.", author: "Laura M." },
  { id: 6, text: "Imprescindible si visitas Asturias. Comida casera de verdad.", author: "David S." },
  { id: 7, text: "Todo riquísimo, especialmente las raciones para compartir.", author: "Carmen T." },
  { id: 8, text: "Local muy acogedor, paredes de piedra preciosas y comida espectacular.", author: "Roberto F." },
  { id: 9, text: "Muy buena experiencia. Pedimos para llevar y todo perfecto.", author: "Elena V." },
  { id: 10, text: "Las raciones son generosas y el sabor auténtico.", author: "Pablo D." },
  { id: 11, text: "Trato familiar y cercano. Nos sentimos como en casa.", author: "Lucía B." },
  { id: 12, text: "El menú del día está genial, muy variado y económico.", author: "Miguel A." },
  { id: 13, text: "Un descubrimiento. Las tapas tienen un toque diferente que encanta.", author: "Sofía C." },
  { id: 14, text: "Ideal para ir con amigos. Buen ambiente y mejor comida.", author: "Diego N." },
  { id: 15, text: "Sin duda, de los mejores sitios para tapear en el centro.", author: "Raquel H." },
];

const ReviewsCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5; // 15 reviews / 3 per page
  
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentReviews = reviews.slice(currentPage * 3, currentPage * 3 + 3);

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex text-jamon-red">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i === 4 ? 'fill-jamon-red/30' : 'fill-current'}`} />
            ))}
          </div>
          <div className="text-2xl font-bold text-jamon-black">4,4 <span className="text-gray-500 text-lg font-normal">(2.883 reseñas)</span></div>
        </div>
        <div className="flex gap-2">
          <button onClick={prevPage} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 text-jamon-black transition-colors" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextPage} className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 text-jamon-black transition-colors" aria-label="Siguiente">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {currentReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-jamon-red mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{review.text}"</p>
              </div>
              <p className="font-semibold text-jamon-black">— {review.author}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-3 mt-10">
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-3 h-3 rounded-full transition-colors ${currentPage === i ? 'bg-jamon-red w-8' : 'bg-gray-300'}`}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Nosotros', href: '#nosotros' },
    { name: 'La Carta', href: '#carta' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Visítanos', href: '#visitanos' },
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <div className="min-h-screen bg-white font-sans text-jamon-black selection:bg-jamon-red selection:text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-black/20 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#hero" className={`text-2xl font-bold tracking-tighter uppercase ${isScrolled ? 'text-jamon-black' : 'text-white'}`}>
              Jamōn <span className="text-jamon-red">Jamōn</span>
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-medium hover:text-jamon-red transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+34985208951" 
                className="bg-jamon-red hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Reservar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 ${isScrolled ? 'text-jamon-black' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-center text-xl">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="font-medium text-jamon-black hover:text-jamon-red"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+34985208951" 
                className="bg-jamon-red text-white px-6 py-4 rounded-full font-bold mt-4 flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                Reservar: 985 20 89 51
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/513433344_18372786022131308_7284278273775718447_n_lqn1zr.jpg" 
            alt="Terraza y tapas Jamōn Jamōn" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter mb-6 uppercase"
          >
            Jamōn<br/><span className="text-jamon-red">Jamōn</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Tapas tradicionales con un toque moderno, servidas en un local acogedor con paredes de piedra y amplia terraza.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <a 
              href="tel:+34985208951" 
              className="inline-flex items-center gap-3 bg-jamon-red hover:bg-red-700 text-white px-10 py-5 rounded-full text-xl font-bold transition-all shadow-lg hover:shadow-jamon-red/30 hover:-translate-y-1"
            >
              <Phone className="w-6 h-6" />
              Reservar por Teléfono
            </a>
            <p className="text-white mt-4 font-medium text-lg tracking-widest">985 20 89 51</p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 z-10">
          <a href="https://www.facebook.com/oviedo.jamonjamon/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-jamon-red transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm">
            <Facebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://www.instagram.com/jamonoviedo/?hl=es" target="_blank" rel="noopener noreferrer" className="text-white hover:text-jamon-red transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm">
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="nosotros" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-jamon-red/10 rounded-[2.5rem] transform -rotate-3"></div>
              <img 
                src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/El_jam%C5%8Dnjam%C5%8Dn_siempre_con_el_Real_Oviedo_realoviedo_ven_jam%C5%8Dnjam%C5%8Dn_oviedo_iaapeq.jpg" 
                alt="El Jamón Jamón con el Real Oviedo" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-jamon-black uppercase tracking-tight">Sobre Nosotros</h2>
              <div className="w-24 h-1.5 bg-jamon-red mb-8"></div>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Jamōn Jamōn ofrece tapas tradicionales con un toque moderno.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro mayor encanto es el ambiente: vibrante, auténtico y lleno de vida. Un bar muy típico donde se mezcla gente de todas las edades. El interior de piedra aporta un toque acogedor, mientras que la terraza exterior con mesas bistró es ideal para disfrutar de la animada atmósfera de la ciudad.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jamon-red/5 transition-colors border border-gray-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-jamon-red mb-4 shadow-sm">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-jamon-black">Amplia Terraza</h3>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jamon-red/5 transition-colors border border-gray-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-jamon-red mb-4 shadow-sm">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-jamon-black">Ambiente Único</h3>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-jamon-red/5 transition-colors border border-gray-100">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-jamon-red mb-4 shadow-sm">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-jamon-black">Tapas Tradicionales</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Carta */}
      <section id="carta" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-jamon-black uppercase tracking-tight">La Carta</h2>
            <div className="w-24 h-1.5 bg-jamon-red mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Disfruta de nuestra selección de tapas y platos tradicionales, elaborados con los mejores ingredientes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {[
                { name: "Jamón ibérico", price: "17,50" },
                { name: "Quesu quesu", price: "17,50" },
                { name: "Ensaladilla jamón jamón", price: "11,00" },
                { name: "Langostinos crujientes con mayonesa de aguacate", price: "16,50" },
                { name: "Calamares frescos fritos", price: "18,00" },
                { name: "Croquetas caseras (elaboradas en nuestra cocina)", price: "10,50" },
                { name: "Palomitas de adobo con mostaza dulce", price: "8,00" },
                { name: "Manjón (Ayerana - Jamón Jamón - 4 quesos - Cecina - Queso de cabra)", price: "11,00" },
                { name: "Cachopo asturiano", price: "19,50" },
                { name: "Torto de foie y jamón", price: "15,50" },
                { name: "Fabada asturiana (elaborada por nosotros)", price: "18,50" },
                { name: "Huevos rotos con jamón ibérico o con picadillo", price: "13,50" },
                { name: "Wok de pollo y verduritas", price: "15,50" },
                { name: "Carrilleras de ternera a la sidra", price: "17,00" },
                { name: "Mejillones a la vinagreta", price: "14,00" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-end gap-4 group">
                  <span className="text-lg font-medium text-jamon-black group-hover:text-jamon-red transition-colors leading-tight">
                    {item.name}
                  </span>
                  <div className="flex-grow border-b border-dotted border-gray-300 mb-1.5"></div>
                  <span className="text-lg font-bold text-jamon-red whitespace-nowrap">
                    {item.price} €
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://www.facebook.com/oviedo.jamonjamon/" 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-jamon-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors shadow-lg"
            >
              <Facebook className="w-5 h-5" />
              Menú del Día en Facebook
            </a>
          </div>

          {/* Galería de Platos */}
          <div className="mt-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold text-jamon-black mb-4">Nuestros Platos</h3>
              <div className="w-16 h-1 bg-jamon-red mx-auto"></div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { url: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/504351519_18372484720131308_846849740735949854_n_nrj3tp.jpg", pos: "object-bottom" },
                { url: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/Estreno_De_muerte_en_calambre_.._jg8h72.jpg", pos: "object-bottom" },
                { url: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/529608606_18377645911131308_1413881936380251623_n_gnmp1c.jpg", pos: "object-center" },
                { url: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773690780/Oviedo_capital_nuestro_pincho_del_cofrade_ven_y_dinos_tu_opini%C3%B3n.Por_ahora_est%C3%A1_siendo_un_%C3%A9xi_tbrpbm.jpg", pos: "object-center" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-100"
                >
                  <img 
                    src={item.url} 
                    alt={`Galería Jamón Jamón ${i + 1}`} 
                    className={`w-full h-full object-cover ${item.pos} transition-transform duration-500 hover:scale-110`}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-jamon-black uppercase tracking-tight">Lo que dicen de nosotros</h2>
            <div className="w-24 h-1.5 bg-jamon-red mx-auto"></div>
          </div>

          <ReviewsCarousel />

          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href="https://www.google.com/maps/place/Jam%C5%8Dn+Jam%C5%8Dn/@43.3619587,-5.8467748,17z/data=!3m1!5s0xd368cef8a40f269:0xf5dbe1c218794a4b!4m18!1m9!3m8!1s0xd368cef8a3e0a03:0xa942838bea8e6564!2zSmFtxY1uIEphbcWNbg!8m2!3d43.3620406!4d-5.8458414!9m1!1b1!16s%2Fg%2F12hns6lp3!3m7!1s0xd368cef8a3e0a03:0xa942838bea8e6564!8m2!3d43.3620406!4d-5.8458414!9m1!1b1!16s%2Fg%2F12hns6lp3?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-jamon-black text-jamon-black px-8 py-4 rounded-full text-lg font-bold transition-all shadow-sm hover:shadow-md"
            >
              <MapPin className="w-5 h-5 text-jamon-red" />
              Deja tu reseña en Google Maps
            </a>
            <a 
              href="https://www.tripadvisor.es/UserReviewEdit-g187452-d4495594-Jamon_Jamon-Oviedo_Asturias.html" 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-jamon-black text-jamon-black px-8 py-4 rounded-full text-lg font-bold transition-all shadow-sm hover:shadow-md"
            >
              <Star className="w-5 h-5 text-jamon-red" />
              Deja tu reseña en Tripadvisor
            </a>
          </div>
        </div>
      </section>

      {/* Visítanos */}
      <section id="visitanos" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-jamon-black uppercase tracking-tight">Visítanos</h2>
            <div className="w-24 h-1.5 bg-jamon-red mx-auto"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Info */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="bg-jamon-red/10 p-4 rounded-2xl text-jamon-red shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-jamon-black mb-2">Dirección</h3>
                    <a href="https://www.google.com/maps/place/Jam%C5%8Dn+Jam%C5%8Dn/@43.3619587,-5.8467748,17z/data=!3m1!5s0xd368cef8a40f269:0xf5dbe1c218794a4b!4m16!1m9!3m8!1s0xd368cef8a3e0a03:0xa942838bea8e6564!2zSmFtxY1uIEphbcWNbg!8m2!3d43.3620406!4d-5.8458414!9m1!1b1!16s%2Fg%2F12hns6lp3!3m5!1s0xd368cef8a3e0a03:0xa942838bea8e6564!8m2!3d43.3620406!4d-5.8458414!16s%2Fg%2F12hns6lp3?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-600 hover:text-jamon-red transition-colors">
                      C. Ramón y Cajal, 16<br/>33003 Oviedo, Asturias
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-jamon-red/10 p-4 rounded-2xl text-jamon-red shrink-0">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-jamon-black mb-4">Horarios</h3>
                    <ul className="text-gray-600 space-y-3 w-full">
                      <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-gray-100 pb-2">
                        <span className="font-bold text-jamon-black">Lunes a Jueves:</span>
                        <span className="text-right">12:30–16:30 / 18:30–24:00</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-gray-100 pb-2">
                        <span className="font-bold text-jamon-black">Viernes y Sábado:</span>
                        <span className="text-right">12:30–2:30</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                        <span className="font-bold text-jamon-black">Domingo:</span>
                        <span className="text-right">12:30–16:30 / 18:30–24:00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-100">
                <a 
                  href="tel:+34985208951" 
                  className="flex items-center justify-center gap-3 w-full bg-jamon-red hover:bg-jamon-black text-white px-8 py-5 rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <Phone className="w-6 h-6" />
                  Reservar: 985 20 89 51
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-auto min-h-[500px] relative bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.427848261314!2d-5.8475896!3d43.3619145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd368c9c6f2b1b1b%3A0x1b1b1b1b1b1b1b1b!2sC.%20Ram%C3%B3n%20y%20Cajal%2C%2016%2C%2033003%20Oviedo%2C%20Asturias!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 transition-all duration-500"
                title="Mapa de ubicación Jamōn Jamōn"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-jamon-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-3xl font-extrabold tracking-tighter uppercase mb-6">
                Jamōn <span className="text-jamon-red">Jamōn</span>
              </h4>
              <p className="text-gray-400 mb-8 max-w-sm">
                Tapas tradicionales con un toque moderno en el corazón de Oviedo.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/oviedo.jamonjamon/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-jamon-red transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/jamonoviedo/?hl=es" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-jamon-red transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 uppercase tracking-wider">Enlaces Rápidos</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-jamon-red transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 uppercase tracking-wider">Contacto</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-jamon-red shrink-0 mt-1" />
                  <a href="https://www.google.com/maps/place/Jam%C5%8Dn+Jam%C5%8Dn/@43.3619587,-5.8467748,17z/data=!3m1!5s0xd368cef8a40f269:0xf5dbe1c218794a4b!4m16!1m9!3m8!1s0xd368cef8a3e0a03:0xa942838bea8e6564!2zSmFtxY1uIEphbcWNbg!8m2!3d43.3620406!4d-5.8458414!9m1!1b1!16s%2Fg%2F12hns6lp3!3m5!1s0xd368cef8a3e0a03:0xa942838bea8e6564!8m2!3d43.3620406!4d-5.8458414!16s%2Fg%2F12hns6lp3?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    C. Ramón y Cajal, 16<br/>33003 Oviedo, Asturias
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-jamon-red shrink-0" />
                  <a href="tel:+34985208951" className="hover:text-white transition-colors">985 20 89 51</a>
                </li>
                <li className="pt-4 border-t border-white/10">
                  <h5 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Horario</h5>
                  <div className="text-sm space-y-1">
                    <p>Lun - Jue: 12:30–16:30 / 18:30–24:00</p>
                    <p>Vie - Sáb: 12:30–2:30</p>
                    <p>Dom: 12:30–16:30 / 18:30–24:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Jamōn Jamōn Oviedo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

