import { motion } from 'framer-motion';

const PORTFOLIO = {
  name: "Sahil Chadha",
  subtitle: "Full-stack developer building scalable apps with React and Python.\nPassionate about open source and solving complex problems with code.",
  projects: [
    { id: '01', name: 'Chess', role: 'TypeScript Mastery', year: '2026', tech: 'Game Development', img: '/projects/chess.png', link: 'https://github.com/chadhas282-afk/Chess' },
    { id: '02', name: 'LUMINA AI', role: 'AI Focused', year: '2026', tech: 'AI / ML', img: '/projects/Lumina.png', link: 'https://github.com/chadhas282-afk/LUMINA-AI' },
    { id: '03', name: 'CryptoCurrent', role: 'Live Data', year: '2026', tech: 'Fintech', img: '/projects/crypto.png', link: 'https://github.com/chadhas282-afk/CryptoCurrent' },
    { id: '04', name: 'PixelForge', role: 'Fast Rendering', year: '2025', tech: 'Creative Tool', img: '/projects/forge.png', link: 'https://github.com/chadhas282-afk/PixelForge' },
    { id: '05', name: 'Nebula Strike', role: 'Game Engine', year: '2026', tech: 'Game Dev', img: '/projects/nebula.png', link: 'https://github.com/chadhas282-afk/Nebula-Strike' },
    { id: '06', name: 'Chat-Terminal', role: 'Real-time Stack', year: '2026', tech: 'Comm Tool', img: '/projects/chat-terminal.png', link: 'https://github.com/chadhas282-afk/Chat-Terminal' }
  ],
  experience: [
    { title: 'Lead Developer', desc: 'Directing architecture for next-gen scalable React applications.', duration: '2026' },
    { title: 'Full Stack Architect', desc: 'Scaling high-performance applications with React and Python.', duration: '2026' },
    { title: 'Open Source Lead', desc: 'Contributing to various community projects and building developer tools.', duration: '2025' }
  ],
  skills: [
    "React", "Python", "TypeScript", "JavaScript", "Node.js", "Full Stack", 
    "Open Source", "Scalable Architecture", "UI/UX", "System Design"
  ]
};

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }} className={className}
  >
    {children}
  </motion.div>
);

export default function Overlay() {
  return (
    <div className="overlay">
      <section className="section flex-center text-center">
        <FadeUp><span className="label">Full Stack Developer / Open Source Enthusiast</span></FadeUp>
        <div className="hero-title">
            {PORTFOLIO.name.split('').map((char, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          </div>
        <FadeUp delay={0.4}><p className="hero-subtitle" style={{ whiteSpace: 'pre-line', margin: '2rem auto' }}>{PORTFOLIO.subtitle}</p></FadeUp>
        <FadeUp delay={0.6}>
           <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem', color: '#818cf8', fontWeight: 'bold' }}>
             <span>47 Repositories</span>
             <span>1000+ Commits</span>
             <span>GitHub Pro</span>
              </div>
        </FadeUp>
      </section>

    <section className="section flex-end">
        <div className="glass-card w-half">
          <FadeUp><span className="label">01. Background</span></FadeUp>
          <FadeUp delay={0.1}><h2 className="section-title">Timeline.</h2></FadeUp>
          <motion.div className="divider" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
          <div className="mt-4">
            {PORTFOLIO.experience.map((job, i) => (
              <FadeUp key={i} delay={0.2 + (i * 0.1)} className="job-row">
                <div>
                  <h3 className="job-company">{job.title}</h3>
                  <p className="job-role">{job.desc}</p>
                </div>
                <span className="job-duration">{job.duration}</span>
              </FadeUp>
            ))}
            </div>
        </div>
      </section>
      <section className="section flex-start">
        <div className="w-two-thirds">
          <FadeUp><span className="label">02. Selected Works</span></FadeUp>
          <FadeUp delay={0.1}><h2 className="section-title">TOP PROJECTS.</h2></FadeUp>
          <motion.div className="divider" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.5 }} />
 <div className="project-list mt-8" style={{ maxHeight: '55vh', overflowY: 'auto', paddingRight: '1rem' }}>
            {PORTFOLIO.projects.map((project, i) => (
              <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }} key={project.id}>
                <FadeUp delay={0.1 * i} className="project-row group">
                  <span className="project-id">{project.id}</span>
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-tech">{project.tech} — {project.role}</p>
                  </div>
                  <div className="project-preview">
                    <img 
                      src={project.img} 
                      alt={project.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </FadeUp>
                 </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section flex-end text-right">
        <div className="w-half">
          <FadeUp><span className="label">03. Expertise</span></FadeUp>