import React, { useEffect, useRef } from "react";
import { siteText } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



const Site = () => {
    const horizontalRef = useRef(null);
    const sectionRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const mm = ScrollTrigger.matchMedia();
    
        mm.add("(min-width: 1030px)", () => {
          const horizontal = horizontalRef.current;
          const sections = sectionRef.current;
        
          // 혹시 ref가 아직 덜 찼을 때 방어
          if (!horizontal || !sections?.length) return;
        
          const tween = gsap.to(sections, {
            xPercent: -120 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: horizontal,
              start: "-50px 100px",
              end: () => "+=" + horizontal.offsetWidth,
              pin: true,
              scrub: 1,
              markers: false,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        
          // matchMedia가 조건 깨질 때 자동으로 cleanup 호출함
          return () => {
            tween.kill();
            // 혹시 남아있는 trigger까지 확실히 정리
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        });
        
        // 전체 언마운트 시 matchMedia 정리
        return () => mm.kill();
    }, []);


    return (
        <section id='site'>
            <div className="ocean__wrap">
                <div className="ocean">
                    <div className="wave"></div>
                </div>
            </div>
            <div className="title">
                <h3>CONTENTS</h3>
                <div className="content__list">
                    <ul>
                        <li>메가공무원(現 넥스트공무원)<span>(2024.06 ~ 현재)</span></li>
                        <li>롯데헬스케어 <span>(2022.08 ~ 2023.01)</span></li>
                        <li>준차트 <span>(2022.07 ~ 2022.12)</span></li>
                        <li>마이셀프스탁 <span>(2022.05 ~ 2023.01)</span></li>
                        <li>에듀핌 <span>(2022.09 ~ 2023.01)</span></li>
                        <li>크로브 <span>(2022.06 ~ 2022.09)</span></li>
                        <li>한패스모바일 <span>(2022.09 ~ 2023.01)</span></li>
                    </ul>
                    <ul>
                        <li>세이펜 <span>(2022.06 ~ 2022.11)</span></li>
                        <li>은평문화재단 <span>(2022.06 ~ 2023.01)</span></li>
                        <li>광운대산학협력단 <span>(2022.09 ~ 2022.11)</span></li>
                        <li>해외지식가이드북 <span>(2022.10 ~ 2022.12)</span></li>
                        <li>스타일 세븐 <span>(2022.01 ~ 2022.03)</span></li>
                        <li>흥국산업 <span>(2022.03 ~ 2022.04)</span></li>
                    </ul>
                </div>
            </div>
            <div className="site__box" ref={horizontalRef}>
                <div className="site__inner">
                    {siteText.map((site, key) => (
                        <article 
                            className="site__item" 
                            key={key}
                            ref={(el) => (sectionRef.current[key] = el)}
                        >
                            <div className="image">
                                <a
                                  href={site.code || "#"}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  onClick={(e) => {
                                    if (site.onCodeClick) {
                                      e.preventDefault(); // 이동 막고
                                      site.onCodeClick(); // alert 실행
                                    }
                                  }}
                                >
                                    <div className="hoverbx">
                                        <p>코드보기</p>
                                    </div>  
                                    <div className={`lang lang${site.num+1}`}>
                                        <span>{site.text[0]}</span>
                                        <span>{site.text[1]}</span>
                                        <span>{site.text[2]}</span>
                                        <span>{site.text[3]}</span>
                                        <span>{site.text[4]}</span>
                                    </div>
                                    <img src={site.img} alt=""/>
                                </a>
                            </div>
                            <div className="textbox">
                                <h4>{site.title}</h4>
                                <p className="about-d">{site.detail01}</p>
                                <p className="about-d2">{site.detail02}</p>
                                <div className="detailWrap">
                                    <ul>
                                        <li>
                                            <span className="firstline">작업기간</span>
                                            <span className="secondline">{site.info[0]}</span>
                                        </li>
                                        <li>
                                            <span className="firstline">참여인원</span>
                                            <span className="secondline">{site.info[1]}</span>
                                        </li>
                                        <li>
                                            <span className="firstline">기여도</span>
                                            <span className="secondline">{site.info[2]}</span>
                                        </li>
                                        <li>
                                            <span className="firstline">구현범위</span>
                                            <span className="secondline">{site.info[3]}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="visit_btn_wrap">
                                    <a className="visit" href={site.view} target="_blank" rel="noreferrer noopener">사이트 방문하기</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Site;
