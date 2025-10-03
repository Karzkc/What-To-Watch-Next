import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Note from '@/components/Note';


const About = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center z-10 
        bg-black ">
            {/* bg */}
            <Image
                src="/aboutbg.png"
                alt="Clapperboard Background"
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                    zIndex: 0,
                    filter: 'blur(12px) brightness(0.8)'
                }}
                className="absolute top-0 left-0 w-full h-full" 
                priority
            />

            <section
                className="py-16 px-4 md:px-8 flex justify-center w-full relative "
                style={{
                    background: 'linear-gradient(120deg, rgba(136,78,160,0.26) 0%, rgba(56,18,94,0.18) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(190, 122, 255, 0.13)',
                    boxShadow: '0 8px 36px 0 rgba(91, 36, 161, 0.44)',

                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)'
                }}
            >
                <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-8">
                    <div className="mb-4">
                        <div className="w-36 h-36 overflow-hidden fl 
                        border-4 rounded-full border-purple-400 shadow-2xl  bg-gray-900 
                        hover:border-purple-600 ease-in-out duration-450">
                            <Link href={"https://github.com/karzkc"}>
                                <Image
                                    src="/pfp.jpg"
                                    alt="pfp"
                                    width={144}
                                    height={144}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <h2 className="text-4xl mb-4 
                    text-black font-cinzel font-bold drop-shadow-purple shadow-purple-800">
                        About Me
                    </h2>

                    <div className="max-w-2xl w-full  p-6 mb-10
                        border bg-gradient-to-br rounded-xl from-purple-700/90 to-fuchsia-900/70 backdrop-blur-sm shadow-xl shadow-purple-800/80
                        border-purple-500/60 mx-auto font-tenor">

                        <p className="text-lg leading-relaxed text-center 
                        text-white/90">
                            Hey, I’m&nbsp;
                            <span className="font-semibold text-purple-300"> Kartik Khiriya</span>
                             — a cinephile and coding enthusiast, currently hooked on building this movie & TV explorer app (and binging something new every time).
                            <br /><br />

                            Coding is something that im doing for a long time now. I’m passionate about experimenting with cool UIs, blending movies, shows, and my love for slick web interactions—this project is a fusion of both! I’ve been crafting this app for a month now and learning as I go (not just about JS, but also plot twists ✨).
                            <br /><br />

                            Besides debugging and deploying, you’ll find me exploring underrated films, tracking new releases, and occasionally recommending hidden gems. Whether it’s for the next binge session or a coding problem, I’m always up for a new challenge.
                        </p>
                    </div>

                    <div className="max-w-2xl w-full flex flex-col items-center p-6 mt-4
                    rounded-xl bg-gradient-to-br from-purple-700/70 to-fuchsia-900/50  shadow-xl ">

                        <span className="text-2xl mb-3 
                        font-bold text-purple-200 font-forum ">Contact & Socials</span>
                        <p className="text-base text-white/80 mb-5 text-center font-tenor">
                            Love chatting about movies, tech, or want to collaborate? Drop a line or DM—I’d love to connect!
                        </p>
                        <div className="flex flex-wrap justify-center gap-5 mb-2">
                            <Link href="https://www.instagram.com/kartikk_0803/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white"
                                    alt="Instagram"
                                    height={20}
                                    width={85}
                                />
                            </Link>
                            <Link href="https://www.linkedin.com/in/kartik-khiriya-483a81319/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white"
                                    alt="LinkedIn"
                                    height={20}
                                    width={57}
                                />
                            </Link>
                            <Link href="https://reddit.com/user/Karzkc08" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="https://img.shields.io/badge/Reddit-%23FF4500.svg?logo=Reddit&logoColor=white"
                                    alt="Reddit"
                                    height={20}
                                    width={63}
                                />
                            </Link>
                            <Link href="https://x.com/@karzkc0803" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white"
                                    alt="X"
                                    height={20}
                                    width={35}
                                />
                            </Link>
                        </div>
                        <div className="text-sm text-purple-200 mt-2">Or email: kartikkhiriya3@gmail.com</div>
                    </div>
                        <Note />
                </div>
            </section>
            
        </div>
    );
};

export default About;
