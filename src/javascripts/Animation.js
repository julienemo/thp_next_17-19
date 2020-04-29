import anime from "animejs/lib/anime.es.js";
import { observationThreshold } from "./index";

export const observerAnimation = (observables) => {
  const flyingPage = (target) => {
    anime({
      targets: target,
      translateY: [-500, 0],
      duration: 2500,
    });
  };

  const animation = (cards) => {
    cards.forEach((card) => {
      if (card.intersectionRatio >= observationThreshold) {
        flyingPage(card.target);
        observer.unobserve(card.target);
      }
    });
  };

  let observer = new IntersectionObserver(
    (entries) => {
      animation(entries);
    },
    { threshold: observationThreshold }
  );
  document.querySelectorAll(observables).forEach((item) => {
    observer.observe(item);
  });
};