// Shared particles.js configuration
// This file initializes the particle background effect used across all pages

function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ['#41adff', '#7dc4e4', '#5296b4']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.2,
        random: true,
        anim: {
          enable: true,
          speed: 0.8,
          opacity_min: 0.03,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: true,
          speed: 1.5,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 200,
        color: '#7dc4e4',
        opacity: 0.12,
        width: 1.5
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: 'top',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 800,
          rotateY: 1600
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  });
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticles);
} else {
  initParticles();
}
