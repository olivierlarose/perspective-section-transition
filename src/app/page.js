'use client';
import Image from "next/image";
import Pic1 from '../../public/images/1.jpg'
import Pic2 from '../../public/images/2.jpeg'
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from 'lenis';

export default function Home() {

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  }) 

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress}/>
      <Section2 scrollYProgress={scrollYProgress}/>
    </main>
  );
}

const Section1 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  return (
    <motion.div style={{scale, rotate}} className="sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]">
      <p>Scroll Perspective</p>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <Image 
            src={Pic1}
            alt="img"
            placeholder="blur"
            fill
          />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  )
}

const Section2 = ({scrollYProgress}) => {

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  return (
    <motion.div style={{scale, rotate}} className="relative h-screen">
      <Image 
        src={Pic2}
        alt="img"
        placeholder="blur"
        fill
      />
    </motion.div>
  )
}