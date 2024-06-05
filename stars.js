document.addEventListener("DOMContentLoaded", () => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a circular texture for the particles
    function createParticleTexture() {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw a circle
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    }

    const particleTexture = createParticleTexture();

    // Generate random star positions inside a sphere
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    // Create geometry and material for points
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      opacity: 0.8,
      color: 0xffffff,
      size: 0.5, // Particle size
      map: particleTexture, // Apply the circular texture
      transparent: true,
      alphaTest: 0.5 // Adjust alphaTest to prevent texture bleeding
    });

    // Create Points and add to scene
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Set camera position
    camera.position.z = 100;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate the stars for a circular motion effect
      stars.rotation.x -= 0.001;
      stars.rotation.y -= 0.001;

      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });