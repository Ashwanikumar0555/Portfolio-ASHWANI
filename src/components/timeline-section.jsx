// "use client"

// import { motion, useScroll, useTransform } from "framer-motion"
// import { BookOpen, Code, Award, Zap, GraduationCap, Briefcase } from "lucide-react"
// import { cn } from "../utils/cn"
// import { themeColors } from "../ui/color-selector"
// import { useRef } from "react"

// export default function TimelineSection({ themeColor = "blue" }) {
//   const containerRef = useRef(null)
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   })

//   const timeline = [
//     {
//       year: "2024 - 2028",
//       title: "B.Tech in Computer Science & Engineering",
//       description: "Currently pursuing my Bachelor's degree with a focus on Computer Science and Engineering fundamentals.",
//       icon: <GraduationCap className="h-5 w-5" />,
//       type: "education"
//     },
//     {
//       year: "2024",
//       title: "Full Stack MERN Developer",
//       description: "Proficient in MongoDB, Express.js, React.js and Node.js. Building modern web applications with the MERN stack.",
//       icon: <Code className="h-5 w-5" />,
//       type: "milestone"
//     },
//     {
//       year: "2024", 
//       title: "Coding Gita Journey",
//       description: "Started my programming journey with Coding Gita, learning fundamental and advanced programming concepts.",
//       icon: <BookOpen className="h-5 w-5" />,
//       type: "milestone"
//     },
//     {
//       year: "2024",
//       title: "First Web Development Project", 
//       description: "Created my first full-stack web application using the MERN stack, implementing core functionalities.",
//       icon: <Zap className="h-5 w-5" />,
//       type: "project"
//     }
//   ]

//   const selectedColor = themeColors[themeColor] || themeColors.blue

//   return (
//     <section id="timeline" className="py-20 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
//       {/* 3D Background Elements */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl top-0 -left-64 animate-pulse" />
//         <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl bottom-0 -right-32 animate-pulse delay-1000" />
//       </div>

//       <div ref={containerRef} className="container mx-auto px-4 max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring" }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-16"
//         >
//           <motion.h2 
//             className={cn(
//               "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text inline-block",
//               selectedColor.primary
//             )}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             My Journey
//           </motion.h2>
//           <motion.div 
//             className={cn("h-1.5 w-24 bg-gradient-to-r mx-auto mb-8 rounded-full", selectedColor.primary)}
//             whileInView={{ width: "6rem", opacity: [0, 1] }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//           <motion.p 
//             className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             Key milestones in my education and development journey as a MERN stack developer.
//           </motion.p>
//         </motion.div>

//         <div className="relative">
//           {/* Animated Timeline Line */}
//           <motion.div 
//             className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 transform md:translate-x-[-50%]"
//             style={{
//               scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
//               transformOrigin: "top"
//             }}
//           />

//           {/* Timeline items */}
//           <div className="space-y-12">
//             {timeline.map((item, index) => (
//               <motion.div
//                 key={`${item.title}-${index}`}
//                 initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
//                 whileInView={{ opacity: 1, x: 0, y: 0 }}
//                 transition={{ 
//                   duration: 0.8,
//                   type: "spring",
//                   bounce: 0.4,
//                   delay: index * 0.2 
//                 }}
//                 viewport={{ once: true }}
//                 whileHover={{ scale: 1.02 }}
//                 className="relative flex flex-col md:flex-row items-start gap-8"
//               >
//                 {/* Year marker - mobile */}
//                 <div className="md:hidden flex items-center gap-4">
//                   <motion.div 
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.8 }}
//                     className={cn(
//                       "w-12 h-12 rounded-full flex items-center justify-center border-4",
//                       "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg"
//                     )}
//                   >
//                     <span className={cn(
//                       "w-8 h-8 rounded-full flex items-center justify-center text-white",
//                       selectedColor.bg
//                     )}>
//                       {item.icon}
//                     </span>
//                   </motion.div>
//                   <motion.span 
//                     whileHover={{ scale: 1.1 }}
//                     className={cn(
//                       "px-4 py-1.5 rounded-full text-sm font-medium shadow-md",
//                       selectedColor.bgLight,
//                       selectedColor.text
//                     )}
//                   >
//                     {item.year}
//                   </motion.span>
//                 </div>

//                 {/* Desktop Layout */}
//                 <div className={cn(
//                   "hidden md:block md:w-1/2 group",
//                   index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
//                 )}>
//                   {index % 2 === 0 && (
//                     <TimelineContent item={item} selectedColor={selectedColor} />
//                   )}
//                 </div>

//                 {/* Center icon (desktop) */}
//                 <motion.div 
//                   className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center"
//                   whileHover={{ scale: 1.2, rotate: 360 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <div className={cn(
//                     "w-14 h-14 rounded-full flex items-center justify-center border-4",
//                     "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl"
//                   )}>
//                     <span className={cn(
//                       "w-9 h-9 rounded-full flex items-center justify-center text-white",
//                       selectedColor.bg
//                     )}>
//                       {item.icon}
//                     </span>
//                   </div>
//                 </motion.div>

//                 <div className={cn(
//                   "hidden md:block md:w-1/2 group",
//                   index % 2 === 0 ? "text-left pl-12" : "text-right pr-12"
//                 )}>
//                   {index % 2 !== 0 && (
//                     <TimelineContent item={item} selectedColor={selectedColor} />
//                   )}
//                 </div>

//                 {/* Mobile content */}
//                 <div className="md:hidden w-full pl-16 pr-6">
//                   <TimelineContent item={item} selectedColor={selectedColor} />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// const TimelineContent = ({ item, selectedColor }) => (
//   <motion.div 
//     className="space-y-3 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 p-6 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50"
//     whileHover={{ scale: 1.02 }}
//     transition={{ type: "spring", stiffness: 300 }}
//   >
//     <motion.span 
//       className={cn(
//         "inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-md",
//         selectedColor.bgLight,
//         selectedColor.text
//       )}
//       whileHover={{ scale: 1.1 }}
//     >
//       {item.year}
//     </motion.span>
//     <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
//       {item.title}
//     </h3>
//     <p className="text-lg text-slate-600 dark:text-slate-400">
//       {item.description}
//     </p>
//   </motion.div>
// )




"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { BookOpen, Code, Award, Zap, GraduationCap, Briefcase, Plus, Edit, X } from "lucide-react"
import { cn } from "../utils/cn"
import { themeColors } from "../ui/color-selector"
import { useRef, useState, useEffect } from "react"
import * as THREE from 'three'

// Theme colors with enhanced properties
const enhancedThemeColors = {
  blue: {
    primary: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500",
    bgLight: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400",
    shadowColor: "blue-500",
    shadowGlow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
    bgHover: "hover:bg-blue-200 dark:hover:bg-blue-800/50",
    iconBg: "bg-blue-500/90"
  },
  green: {
    primary: "from-green-500 to-emerald-500",
    bg: "bg-green-500",
    bgLight: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-400",
    shadowColor: "green-500",
    shadowGlow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
    bgHover: "hover:bg-green-200 dark:hover:bg-green-800/50",
    iconBg: "bg-green-500/90"
  },
  purple: {
    primary: "from-purple-500 to-violet-500",
    bg: "bg-purple-500",
    bgLight: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400",
    shadowColor: "purple-500",
    shadowGlow: "shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]",
    bgHover: "hover:bg-purple-200 dark:hover:bg-purple-800/50",
    iconBg: "bg-purple-500/90"
  },
  orange: {
    primary: "from-orange-500 to-amber-500",
    bg: "bg-orange-500",
    bgLight: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400",
    shadowColor: "orange-500",
    shadowGlow: "shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]",
    bgHover: "hover:bg-orange-200 dark:hover:bg-orange-800/50",
    iconBg: "bg-orange-500/90"
  },
  pink: {
    primary: "from-pink-500 to-rose-500",
    bg: "bg-pink-500",
    bgLight: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-400",
    shadowColor: "pink-500",
    shadowGlow: "shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]",
    bgHover: "hover:bg-pink-200 dark:hover:bg-pink-800/50",
    iconBg: "bg-pink-500/90"
  }
}

// 3D Model Components
const Computer3DModel = ({ isVisible }) => {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible || !mountRef.current || loaded) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create computer model with more details
    const screenGeometry = new THREE.BoxGeometry(1, 0.7, 0.05);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2196f3,
      specular: 0x111111,
      shininess: 30
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    
    const bezelGeometry = new THREE.BoxGeometry(1.1, 0.8, 0.1);
    const bezelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      specular: 0x111111,
      shininess: 50
    });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.z = -0.075;
    
    const computer = new THREE.Group();
    computer.add(screen);
    computer.add(bezel);
    scene.add(computer);

    // Create stand with more realistic shape
    const standBaseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const standNeckGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.3, 32);
    const standMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      specular: 0x111111,
      shininess: 50
    });
    
    const standBase = new THREE.Mesh(standBaseGeometry, standMaterial);
    standBase.position.y = -0.425;
    standBase.rotation.x = Math.PI / 2;
    
    const standNeck = new THREE.Mesh(standNeckGeometry, standMaterial);
    standNeck.position.y = -0.25;
    
    scene.add(standBase);
    scene.add(standNeck);

    // Create keyboard with keys
    const keyboardBaseGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.4);
    const keyboardBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x555555,
      specular: 0x111111,
      shininess: 30
    });
    const keyboardBase = new THREE.Mesh(keyboardBaseGeometry, keyboardBaseMaterial);
    keyboardBase.position.y = -0.2;
    keyboardBase.position.z = 0.3;
    scene.add(keyboardBase);

    // Add some keys
    for (let i = 0; i < 10; i++) {
      const keyGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.08);
      const keyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        specular: 0x111111,
        shininess: 50
      });
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        -0.5 + (i % 5) * 0.2,
        -0.175,
        0.25 + Math.floor(i / 5) * 0.15
      );
      scene.add(key);
    }

    camera.position.z = 2.5;
    camera.position.y = 0.2;

    // Animation with more interesting movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      computer.rotation.y += 0.005;
      computer.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      computer.position.y = Math.sin(Date.now() * 0.001) * 0.05;
      
      renderer.render(scene, camera);
    };
    animate();

    setLoaded(true);

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={mountRef} className="w-36 h-36 mx-auto" />;
};

const Book3DModel = ({ isVisible }) => {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible || !mountRef.current || loaded) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create book cover with more details
    const coverGeometry = new THREE.BoxGeometry(1, 1.4, 0.15);
    const coverMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9c27b0,
      specular: 0x111111,
      shininess: 30
    });
    const book = new THREE.Mesh(coverGeometry, coverMaterial);
    
    // Add spine
    const spineGeometry = new THREE.BoxGeometry(0.15, 1.4, 0.2);
    const spineMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x7b1fa2,
      specular: 0x111111,
      shininess: 30
    });
    const spine = new THREE.Mesh(spineGeometry, spineMaterial);
    spine.position.x = -0.575;
    spine.position.z = 0.025;
    
    const bookGroup = new THREE.Group();
    bookGroup.add(book);
    bookGroup.add(spine);
    scene.add(bookGroup);

    // Create book pages with more realistic look
    const pagesGeometry = new THREE.BoxGeometry(0.85, 1.3, 0.25);
    const pagesMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5f5,
      specular: 0x111111,
      shininess: 10
    });
    const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.z = 0.2;
    scene.add(pages);

    // Add some text on the cover
    const createText = () => {
      const textGeometry = new THREE.PlaneGeometry(0.8, 0.3);
      const textMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.position.set(0, 0, 0.076);
      text.rotation.x = Math.PI / 2;
      return text;
    };
    
    const titleText = createText();
    titleText.position.y = 0.3;
    scene.add(titleText);
    
    const authorText = createText();
    authorText.position.y = -0.3;
    scene.add(authorText);

    camera.position.z = 2.5;
    camera.position.y = 0.2;

    // Animation with page flipping effect
    let flipProgress = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      bookGroup.rotation.y += 0.005;
      bookGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
      
      // Simulate page flipping
      flipProgress += 0.003;
      if (flipProgress > Math.PI * 2) flipProgress = 0;
      
      const pageFlip = Math.sin(flipProgress) * 0.5 + 0.5;
      pages.scale.x = 0.9 + pageFlip * 0.1;
      pages.rotation.y = pageFlip * 0.2;
      
      renderer.render(scene, camera);
    };
    animate();

    setLoaded(true);

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={mountRef} className="w-36 h-36 mx-auto" />;
};

const Project3DModel = ({ isVisible }) => {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible || !mountRef.current || loaded) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create base platform
    const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4caf50,
      specular: 0x111111,
      shininess: 30
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.rotation.x = Math.PI / 2;
    scene.add(base);

    // Create server tower
    const serverGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.4);
    const serverMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      specular: 0x111111,
      shininess: 50
    });
    const server = new THREE.Mesh(serverGeometry, serverMaterial);
    server.position.y = 0.5;
    scene.add(server);

    // Add server details
    for (let i = 0; i < 4; i++) {
      const ledGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.05);
      const ledMaterial = new THREE.MeshPhongMaterial({ 
        color: i % 2 === 0 ? 0x00ff00 : 0xff0000,
        emissive: i % 2 === 0 ? 0x00ff00 : 0xff0000,
        emissiveIntensity: 0.5
      });
      const led = new THREE.Mesh(ledGeometry, ledMaterial);
      led.position.set(0, 0.3 - i * 0.2, 0.2);
      scene.add(led);
    }

    // Create floating code elements
    const codeElements = [];
    for (let i = 0; i < 8; i++) {
      const isRing = Math.random() > 0.5;
      let geometry, material;
      
      if (isRing) {
        geometry = new THREE.TorusGeometry(0.2 + Math.random() * 0.3, 0.05, 16, 32);
        material = new THREE.MeshPhongMaterial({ 
          color: 0xff9800,
          specular: 0x111111,
          shininess: 30
        });
      } else {
        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x2196f3,
          specular: 0x111111,
          shininess: 30
        });
      }
      
      const element = new THREE.Mesh(geometry, material);
      element.position.set(
        (Math.random() - 0.5) * 1.5,
        Math.random() * 0.8,
        (Math.random() - 0.5) * 1.5
      );
      element.userData = { speed: Math.random() * 0.02 + 0.01 };
      scene.add(element);
      codeElements.push(element);
    }

    camera.position.z = 3;
    camera.position.y = 0.8;

    // Animation with floating code elements
    const animate = () => {
      requestAnimationFrame(animate);
      
      base.rotation.z += 0.005;
      server.rotation.y += 0.01;
      
      codeElements.forEach(element => {
        element.rotation.x += element.userData.speed;
        element.rotation.y += element.userData.speed * 0.7;
        element.position.y = 0.5 + Math.sin(Date.now() * 0.001 * element.userData.speed * 50) * 0.3;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    setLoaded(true);

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={mountRef} className="w-36 h-36 mx-auto" />;
};

const Education3DModel = ({ isVisible }) => {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isVisible || !mountRef.current || loaded) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(150, 150);
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create graduation cap with more details
    const capTopGeometry = new THREE.ConeGeometry(0.8, 0.3, 4);
    const capTopMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x3f51b5,
      specular: 0x111111,
      shininess: 50
    });
    const capTop = new THREE.Mesh(capTopGeometry, capTopMaterial);
    capTop.rotation.y = Math.PI / 4;
    capTop.position.y = 0.5;
    scene.add(capTop);

    // Create cap base
    const capBaseGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.1, 32);
    const capBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x303f9f,
      specular: 0x111111,
      shininess: 50
    });
    const capBase = new THREE.Mesh(capBaseGeometry, capBaseMaterial);
    capBase.position.y = 0.35;
    scene.add(capBase);

    // Create tassel with chain
    const tasselGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const tasselMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffeb3b,
      specular: 0x111111,
      shininess: 30
    });
    const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
    tassel.position.set(-0.6, 0.2, 0);
    
    const tasselChain = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const linkGeometry = new THREE.TorusGeometry(0.02, 0.01, 8, 16);
      const linkMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x795548,
        specular: 0x111111,
        shininess: 50
      });
      const link = new THREE.Mesh(linkGeometry, linkMaterial);
      link.position.y = -i * 0.1;
      tasselChain.add(link);
    }
    tasselChain.position.set(-0.6, 0.5, 0);
    
    scene.add(tassel);
    scene.add(tasselChain);

    // Create diploma scroll
    const diplomaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 16);
    const diplomaMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5f5,
      specular: 0x111111,
      shininess: 10
    });
    const diploma = new THREE.Mesh(diplomaGeometry, diplomaMaterial);
    diploma.position.set(0.7, 0.1, 0);
    diploma.rotation.z = Math.PI / 2;
    scene.add(diploma);

    // Add ribbon to diploma
    const ribbonGeometry = new THREE.BoxGeometry(1, 0.02, 0.2);
    const ribbonMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9c27b0,
      specular: 0x111111,
      shininess: 30
    });
    const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    ribbon.position.set(0.7, 0.1, 0);
    scene.add(ribbon);

    camera.position.z = 3;
    camera.position.y = 0.5;

    // Animation with tassel swing
    const animate = () => {
      requestAnimationFrame(animate);
      
      capTop.rotation.y += 0.005;
      capBase.rotation.y += 0.005;
      
      // Tassel swing animation
      tassel.position.x = -0.6 + Math.sin(Date.now() * 0.001) * 0.1;
      tasselChain.rotation.z = Math.sin(Date.now() * 0.001) * 0.2;
      
      // Diploma scroll animation
      diploma.rotation.x = Math.sin(Date.now() * 0.0007) * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

    setLoaded(true);

    // Cleanup
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return <div ref={mountRef} className="w-36 h-36 mx-auto" />;
};

// Get 3D model by timeline item type
const getModelByType = (type, isVisible) => {
  switch (type) {
    case "education":
      return <Education3DModel isVisible={isVisible} />;
    case "milestone":
      return <Computer3DModel isVisible={isVisible} />;
    case "project":
      return <Project3DModel isVisible={isVisible} />;
    case "certification":
      return <Book3DModel isVisible={isVisible} />;
    default:
      return <Computer3DModel isVisible={isVisible} />;
  }
};

const TimelineContent = ({ item, selectedColor, isActive, model3D }) => {
  const [showSkills, setShowSkills] = useState(false);
  
  return (
    <motion.div 
      className={cn(
        "space-y-4 backdrop-blur-sm p-6 rounded-xl shadow-lg transition-all duration-300 border",
        isActive 
          ? `bg-white/80 dark:bg-slate-800/80 border-2 ${selectedColor.border} shadow-xl ${selectedColor.shadowGlow}` 
          : "bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
      )}
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* 3D Model - Only show when item is active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            {model3D}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.span 
        className={cn(
          "inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-md",
          selectedColor.bgLight,
          selectedColor.text
        )}
        whileHover={{ scale: 1.1 }}
      >
        {item.year}
      </motion.span>
      
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {item.title}
      </h3>
      
      <p className="text-lg text-slate-600 dark:text-slate-400">
        {item.description}
      </p>
      
      {/* Skills section */}
      {item.skills && item.skills.length > 0 && (
        <div className="pt-2">
          <motion.button
            onClick={() => setShowSkills(!showSkills)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              selectedColor.text,
              selectedColor.bgHover,
              "transition-colors duration-200"
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {showSkills ? (
              <>
                <X className="h-4 w-4" />
                <span>Hide Skills</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Show Skills ({item.skills.length})</span>
              </>
            )}
          </motion.button>
          
          <AnimatePresence>
            {showSkills && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-4"
              >
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        selectedColor.bgLight,
                        selectedColor.text
                      )}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default function TimelineSection({ themeColor = "blue", editable = false }) {
  const containerRef = useRef(null);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState({
    year: "",
    title: "",
    description: "",
    type: "milestone",
    skills: []
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [timeline, setTimeline] = useState([
    {
      year: "2024 - 2028",
      title: "B.Tech in Computer Science & Engineering",
      description: "Currently pursuing my Bachelor's degree with a focus on Computer Science and Engineering fundamentals.",
      icon: <GraduationCap className="h-5 w-5" />,
      type: "education",
      skills: ["Data Structures", "Algorithms", "Computer Networks", "Operating Systems", "Database Systems"]
    },
    {
      year: "2024",
      title: "Full Stack MERN Developer",
      description: "Proficient in MongoDB, Express.js, React.js and Node.js. Building modern web applications with the MERN stack.",
      icon: <Code className="h-5 w-5" />,
      type: "milestone",
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API", "JWT Authentication", "Redux"]
    },
    {
      year: "2024", 
      title: "Coding Gita Journey",
      description: "Started my programming journey with Coding Gita, learning fundamental and advanced programming concepts.",
      icon: <BookOpen className="h-5 w-5" />,
      type: "certification",
      skills: ["JavaScript", "HTML/CSS", "Git", "Problem Solving", "Responsive Design", "ES6+ Features"]
    },
    {
      year: "2024",
      title: "First Web Development Project", 
      description: "Created my first full-stack web application using the MERN stack, implementing core functionalities.",
      icon: <Zap className="h-5 w-5" />,
      type: "project",
      skills: ["Frontend Development", "Backend Development", "API Integration", "UI/UX Design", "Deployment", "Testing"]
    }
  ]);

  const iconMap = {
    education: <GraduationCap className="h-5 w-5" />,
    milestone: <Code className="h-5 w-5" />,
    certification: <BookOpen className="h-5 w-5" />,
    project: <Zap className="h-5 w-5" />,
    work: <Briefcase className="h-5 w-5" />
  };

  const addNewItem = () => {
    if (newItem.title && newItem.year && newItem.description) {
      setTimeline([...timeline, {
        ...newItem,
        icon: iconMap[newItem.type] || <Code className="h-5 w-5" />,
        skills: newItem.skills || []
      }]);
      setIsAddingNew(false);
      setNewItem({
        year: "",
        title: "",
        description: "",
        type: "milestone",
        skills: []
      });
    }
  };

  const addSkill = () => {
    const skill = prompt("Enter a new skill:");
    if (skill) {
      setNewItem({
        ...newItem,
        skills: [...(newItem.skills || []), skill]
      });
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...newItem.skills];
    newSkills.splice(index, 1);
    setNewItem({
      ...newItem,
      skills: newSkills
    });
  };

  const selectedColor = enhancedThemeColors[themeColor] || enhancedThemeColors.blue;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="timeline" className="py-20 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl top-0 -left-64 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl bottom-0 -right-32 animate-[pulse_14s_ease-in-out_infinite_1s]" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full blur-3xl -bottom-64 left-1/4 animate-[pulse_18s_ease-in-out_infinite_2s]" />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className={cn(
              "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r text-transparent bg-clip-text inline-block",
              selectedColor.primary
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            My Journey
          </motion.h2>
          <motion.div 
            className={cn("h-1.5 w-24 bg-gradient-to-r mx-auto mb-8 rounded-full", selectedColor.primary)}
            whileInView={{ width: "6rem", opacity: [0, 1] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Key milestones in my education and development journey as a MERN stack developer.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line with interactive dots */}
          <motion.div 
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-200 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 transform md:translate-x-[-50%]"
            style={{
              scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
              transformOrigin: "top"
            }}
          />
          
          {/* Timeline interactive dots */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 transform md:translate-x-[-50%] flex flex-col justify-between items-center pointer-events-none">
            {timeline.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={cn(
                  "w-3 h-3 rounded-full shadow-xl pointer-events-auto cursor-pointer border-2",
                  activeItemIndex === index ? `${selectedColor.bg} border-white dark:border-slate-900` : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                )}
                whileHover={{ scale: 1.5 }}
                onClick={() => setActiveItemIndex(index === activeItemIndex ? null : index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

          {/* Timeline items */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-24"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-start gap-8",
                  activeItemIndex === index ? "z-10" : "z-0"
                )}
              >
                {/* Year marker - mobile */}
                <div className="md:hidden flex items-center gap-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-4",
                      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg"
                    )}
                  >
                    <span className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white",
                      selectedColor.iconBg
                    )}>
                      {item.icon}
                    </span>
                  </motion.div>
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-medium shadow-md",
                      selectedColor.bgLight,
                      selectedColor.text
                    )}
                  >
                    {item.year}
                  </motion.span>
                </div>

                {/* Desktop Layout */}
                <div className={cn(
                  "hidden md:block md:w-1/2 group",
                  index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                )}>
                  {index % 2 === 0 && (
                    <TimelineContent 
                      item={item} 
                      selectedColor={selectedColor} 
                      isActive={activeItemIndex === index}
                      model3D={getModelByType(item.type, activeItemIndex === index)}
                    />
                  )}
                </div>

                {/* Center icon (desktop) */}
                <motion.div 
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  animate={activeItemIndex === index ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center border-4",
                    activeItemIndex === index 
                      ? `${selectedColor.border} border-opacity-70 shadow-2xl shadow-${selectedColor.shadowColor}`
                      : "border-slate-200 dark:border-slate-700 shadow-xl",
                    "bg-white dark:bg-slate-800"
                  )}>
                    <span className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-white",
                      selectedColor.iconBg
                    )}>
                      {item.icon}
                    </span>
                  </div>
                </motion.div>

                <div className={cn(
                  "hidden md:block md:w-1/2 group",
                  index % 2 === 0 ? "text-left pl-12" : "text-right pr-12"
                )}>
                  {index % 2 !== 0 && (
                    <TimelineContent 
                      item={item} 
                      selectedColor={selectedColor} 
                      isActive={activeItemIndex === index}
                      model3D={getModelByType(item.type, activeItemIndex === index)}
                    />
                  )}
                </div>

                {/* Mobile content */}
                <div className="md:hidden w-full pl-16 pr-6">
                  <TimelineContent 
                    item={item} 
                    selectedColor={selectedColor} 
                    isActive={activeItemIndex === index}
                    model3D={getModelByType(item.type, activeItemIndex === index)}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Add New Timeline Item Button - Only shown if editable prop is true */}
          {editable && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingNew(true)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-white shadow-lg",
                  selectedColor.bg,
                  "hover:shadow-xl transition-all duration-300"
                )}
              >
                <Plus className="h-5 w-5" />
                <span>Add Timeline Event</span>
              </motion.button>
            </motion.div>
          )}
          
          {/* Add New Timeline Item Modal */}
          <AnimatePresence>
            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsAddingNew(false);
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={cn(
                    "bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Add Timeline Event</h3>
                    <button 
                      onClick={() => setIsAddingNew(false)}
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Year / Time Period
                      </label>
                      <input
                        type="text"
                        value={newItem.year}
                        onChange={(e) => setNewItem({...newItem, year: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
                        placeholder="e.g. 2024 or 2024-2025"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
                        placeholder="Event title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all h-24"
                        placeholder="Describe this event..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Type
                      </label>
                      <select
                        value={newItem.type}
                        onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                        className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
                      >
                        <option value="education">Education</option>
                        <option value="milestone">Milestone</option>
                        <option value="project">Project</option>
                        <option value="certification">Certification</option>
                        <option value="work">Work Experience</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newItem.skills?.map((skill, index) => (
                          <div key={index} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm">
                            {skill}
                            <button 
                              onClick={() => removeSkill(index)}
                              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addSkill}
                        className={cn(
                          "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm",
                          selectedColor.text,
                          selectedColor.bgHover,
                          "transition-colors"
                        )}
                      >
                        <Plus className="h-3 w-3" />
                        Add Skill
                      </button>
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-3">
                      <button
                        onClick={() => setIsAddingNew(false)}
                        className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addNewItem}
                        className={cn(
                          "px-6 py-2 rounded-md text-white shadow-md hover:shadow-lg transition-all",
                          selectedColor.bg,
                          "hover:brightness-110"
                        )}
                        disabled={!newItem.title || !newItem.year || !newItem.description}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}