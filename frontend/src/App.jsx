import { useState, useEffect } from 'react'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  Code2, 
  Palette, 
  Zap, 
  Database,
  ExternalLink 
} from 'lucide-react'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    console.log('📤 Datos a enviar:', formData)

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const responseData = await response.json()
      console.log('📥 Respuesta del servidor:', responseData)

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        console.error('❌ Error del servidor:', responseData)
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(null), 5000)
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }


  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      gradient: "from-purple-500 to-pink-500",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Vue.js", level: 75 }
      ]
    },
    {
      icon: Database,
      title: "Backend & Database",
      gradient: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 85 },
        { name: "GraphQL", level: 75 }
      ]
    },
    {
      icon: Palette,
      title: "Design & UI/UX",
      gradient: "from-orange-500 to-red-500",
      skills: [
        { name: "Figma", level: 90 },
        { name: "Framer Motion", level: 85 },
        { name: "Responsive Design", level: 95 },
        { name: "Design Systems", level: 80 }
      ]
    },
    {
      icon: Zap,
      title: "Tools & Others",
      gradient: "from-green-500 to-emerald-500",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS/Vercel", level: 75 },
        { name: "CI/CD", level: 70 }
      ]
    }
  ]

  const technologies = [
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" }
  ]

  const experience = [
    {
      year: "2023 - Presente",
      role: "Senior Frontend Developer",
      company: "Tech Startup Inc.",
      description: "Liderando el desarrollo de aplicaciones web escalables y mentoring de desarrolladores junior.",
      achievements: [
        "Mejoré el rendimiento de la aplicación principal en un 40%",
        "Implementé arquitectura de microfrontends",
        "Lideré la migración a TypeScript y Next.js 14"
      ]
    },
    {
      year: "2021 - 2023",
      role: "Full Stack Developer",
      company: "Digital Agency Co.",
      description: "Desarrollo de soluciones web completas para clientes corporativos y startups.",
      achievements: [
        "Entregué más de 15 proyectos exitosos para clientes",
        "Implementé pipeline CI/CD reduciendo tiempo de deploy en 60%",
        "Desarrollé sistema de design system reutilizable"
      ]
    },
    {
      year: "2020 - 2021",
      role: "Frontend Developer",
      company: "StartupLab",
      description: "Desarrollo de interfaces de usuario modernas y responsivas con React.",
      achievements: [
        "Creé componentes reutilizables para 3 productos diferentes",
        "Implementé animaciones complejas con Framer Motion",
        "Colaboré en el rediseño completo de la plataforma principal"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Orbe que sigue el cursor */}
      <div 
        className="fixed pointer-events-none z-0 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)'
        }}
      />

      {/* Navegación */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              David Ramírez
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="hover:text-purple-500 transition-colors duration-300">Proyectos</a>
            <a href="#skills" className="hover:text-purple-500 transition-colors duration-300">Habilidades</a>
             {/*<a href="#experience" className="hover:text-purple-500 transition-colors duration-300">Experiencia</a>*/}
            <a href="#contact" className="hover:text-purple-500 transition-colors duration-300">Contacto</a>
          
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Disponible para proyectos</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Desarrollador
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Full Stack
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Creando experiencias digitales excepcionales con código limpio y diseño moderno.
            Especializado en React, Next.js y desarrollo web de alto rendimiento.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-16">
       
            
            <div className="flex gap-4">
              <a href="https://github.com/davidramire" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/david-ramirez-81b81a260/" target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:davidramirezv.0816@gmail.com"
                 className="w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de texto desvanecido */}
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-full">
          <div className="animate-scroll">
            <h2 
              className="text-5xl md:text-7xl font-bold whitespace-nowrap inline-block"
              style={{
                color: '#4a4a4a',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
                animation: 'scroll 35s linear infinite'
              }}
            >
              Next.js TypeScript Tailwind CSS Node.js GraphQL Framer Motion React MongoDB PostgreSQL Docker AWS Firebase Redux Three.js Python Django
            </h2>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* Sección de Proyectos */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Proyectos Destacados</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div 
              className="group relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`
              }}
            >
              {/* Orbe en hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full" />
              
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-10 text-sm mb-4">
                  Web Development
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                   Portafolio Web
                </h3>
                
                <p className="text-gray-400 mb-6">
                  Portafolio personal desarrollado con Next.js y Tailwind CSS para mostrar mis proyectos y habilidades como desarrollador full stack.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10">React</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10">Node.js</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10">Post greSQL</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-sm border border-white/10">Tailwind.css</span>
                </div>
                
                <a href="https://github.com/davidramire/Portafolio" target='_blank' className="inline-flex items-center gap-2 text-purple-500 hover:gap-4 transition-all duration-300">
                  Ver proyecto
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Habilidades */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            Mis <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Habilidades</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones excepcionales
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {skills.map((category, index) => {
              const Icon = category.icon
              return (
                <div 
                  key={index}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className={`font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* CTA / Contacto */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-green-500/10 border border-green-500/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-500">Actualmente disponible</span>
            </div>
            
            <h2 className="text-5xl font-bold mb-6">
              ¿Tienes un proyecto en <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">mente?</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Estoy siempre interesado en escuchar sobre nuevos proyectos y oportunidades emocionantes.
            </p>
          </div>

          <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Notificación de éxito */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center animate-pulse">
                ✓ ¡Mensaje enviado correctamente! Te responderé pronto.
              </div>
            )}
            
            {/* Notificación de error */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
                ✗ Hubo un error al enviar el mensaje. Inténtalo nuevamente.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 px-4 py-3 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 px-4 py-3 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="¿En qué puedo ayudarte?"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 px-4 py-3 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all"
                />
              </div>

            

              {/* Mensaje */}
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Cuéntame sobre tu proyecto..."
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 px-4 py-3 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all resize-none"
                />
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Mail className="w-6 h-6" />
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                {!isSubmitting && <ArrowUpRight className="w-6 h-6" />}
              </button>

              {/* Footer del form */}
              <p className="text-center text-sm text-gray-400 mt-6">
                O escríbeme directamente a{' '}
                <a href="mailto:davidramirezv.0816@gmail.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                  davidramirezv.0816@gmail.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400">
            © 2025 David Portfolio. Todos los derechos reservados.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com/davidramire" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/david-ramirez-81b81a260/" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@david.com"
               className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
