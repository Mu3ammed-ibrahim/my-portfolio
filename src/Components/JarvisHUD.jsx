import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const JarvisHUD = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create multiple rotating circles/rings
    const circles = [];

    const createCircle = (
      radius,
      color,
      linewidth,
      rotationSpeed,
      segments = 64,
      dashScale = 1
    ) => {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineDashedMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        linewidth: linewidth,
        dashSize: 0.5 * dashScale,
        gapSize: 0.3 * dashScale,
      });

      const circle = new THREE.Line(geometry, material);
      circle.computeLineDistances();
      circle.userData = {
        rotationSpeed,
        baseOpacity: 0.7,
        pulsePhase: Math.random() * Math.PI * 2,
        radius,
      };

      return circle;
    };

    // Create multiple concentric circles with varying styles
    circles.push(createCircle(9, 0x10b981, 2.5, 0.0008, 128, 2));
    circles.push(createCircle(8, 0x059669, 2, -0.001, 120, 1.5));
    circles.push(createCircle(6.5, 0x10b981, 2.5, 0.0012, 96, 1.2));
    circles.push(createCircle(5.5, 0x14b8a6, 2, -0.0015, 80, 1));
    circles.push(createCircle(4, 0x10b981, 2.5, 0.0018, 64, 0.8));
    circles.push(createCircle(2.5, 0x059669, 2, -0.002, 48, 0.6));
    circles.push(createCircle(1.2, 0x10b981, 2, 0.0025, 32, 0.4));

    circles.forEach((circle) => scene.add(circle));

    // Create arc segments
    const createArc = (radius, startAngle, endAngle, color) => {
      const points = [];
      const arcSegments = 32;
      for (let i = 0; i <= arcSegments; i++) {
        const angle = startAngle + (endAngle - startAngle) * (i / arcSegments);
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        linewidth: 2,
      });

      const arc = new THREE.Line(geometry, material);
      arc.userData = {
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
      };

      return arc;
    };

    const arcs = [];
    for (let i = 0; i < 16; i++) {
      const radius = 3 + Math.random() * 5;
      const startAngle = Math.random() * Math.PI * 2;
      const arcLength = Math.PI * 0.2 + Math.random() * Math.PI * 0.6;
      const arc = createArc(
        radius,
        startAngle,
        startAngle + arcLength,
        0x10b981
      );
      arcs.push(arc);
      scene.add(arc);
    }

    // Create radial lines
    const radialLines = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const innerRadius = 1;
      const outerRadius = 9.5;

      const points = [
        new THREE.Vector3(
          Math.cos(angle) * innerRadius,
          Math.sin(angle) * innerRadius,
          0
        ),
        new THREE.Vector3(
          Math.cos(angle) * outerRadius,
          Math.sin(angle) * outerRadius,
          0
        ),
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineDashedMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.15,
        linewidth: 1,
        dashSize: 0.4,
        gapSize: 0.3,
      });

      const line = new THREE.Line(geometry, material);
      line.computeLineDistances();
      line.userData = {
        angle: angle,
        pulsePhase: (i / 36) * Math.PI * 2,
        baseOpacity: 0.15,
      };

      radialLines.push(line);
      scene.add(line);
    }

    // Corner brackets
    const createCornerBracket = (x, y, rotation) => {
      const points = [
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.5, 0, 0),
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
        linewidth: 2,
      });

      const bracket = new THREE.Line(geometry, material);
      bracket.position.set(x, y, 0);
      bracket.rotation.z = rotation;
      bracket.userData = { pulsePhase: Math.random() * Math.PI * 2 };

      return bracket;
    };

    const brackets = [];
    brackets.push(createCornerBracket(10, 7, 0));
    brackets.push(createCornerBracket(-10, 7, Math.PI / 2));
    brackets.push(createCornerBracket(-10, -7, Math.PI));
    brackets.push(createCornerBracket(10, -7, -Math.PI / 2));

    brackets.forEach((bracket) => scene.add(bracket));

    // Dots
    const dots = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const radius = 7.5;

      const dotGeometry = new THREE.CircleGeometry(0.1, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.7,
      });

      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      dot.userData = {
        angle: angle,
        radius: radius,
        pulsePhase: (i / 48) * Math.PI * 2,
        baseRadius: radius,
      };

      dots.push(dot);
      scene.add(dot);
    }

    // Scanning line
    const createScanLine = () => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(9, 0, 0)];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.8,
        linewidth: 3,
      });

      const line = new THREE.Line(geometry, material);
      line.userData = { rotationSpeed: 0.01 };
      return line;
    };

    const scanLine = createScanLine();
    scene.add(scanLine);

    // Particles
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.CircleGeometry(0.03, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0,
      });

      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 8;

      particle.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      );

      particle.userData = {
        angle: angle,
        radius: radius,
        speed: 0.0005 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
      };

      particles.push(particle);
      scene.add(particle);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotation = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation = mouseX * 0.002;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleClick = () => {
      circles.forEach((circle) => {
        circle.userData.clickPulse = 1;
      });

      dots.forEach((dot) => {
        dot.userData.clickPulse = 1;
      });
    };
    window.addEventListener("click", handleClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      circles.forEach((circle) => {
        const baseSpeed = circle.userData.rotationSpeed;
        circle.rotation.z += baseSpeed + targetRotation;

        const pulse =
          Math.sin(elapsedTime * 2 + circle.userData.pulsePhase) * 0.5 + 0.5;
        let opacity = circle.userData.baseOpacity + pulse * 0.3;

        if (circle.userData.clickPulse) {
          opacity += circle.userData.clickPulse * 0.5;
          circle.userData.clickPulse *= 0.95;
          if (circle.userData.clickPulse < 0.01) circle.userData.clickPulse = 0;
        }

        circle.material.opacity = Math.min(opacity, 1);

        const distance = Math.abs(
          circle.userData.radius -
            Math.sqrt(mouseX * mouseX * 50 + mouseY * mouseY * 50)
        );
        if (distance < 2) {
          circle.material.opacity = Math.min(circle.material.opacity + 0.3, 1);
        }
      });

      arcs.forEach((arc) => {
        arc.rotation.z += arc.userData.rotationSpeed;
        const pulse =
          Math.sin(elapsedTime * 3 + arc.userData.pulsePhase) * 0.5 + 0.5;
        arc.material.opacity = 0.5 + pulse * 0.4;
      });

      radialLines.forEach((line, index) => {
        const wave =
          Math.sin(elapsedTime * 3 + line.userData.pulsePhase) * 0.5 + 0.5;
        let opacity = line.userData.baseOpacity + wave * 0.25;

        const mouseAngle = Math.atan2(mouseY, mouseX);
        const angleDiff = Math.abs(mouseAngle - line.userData.angle);
        if (angleDiff < 0.3 || angleDiff > Math.PI * 2 - 0.3) {
          opacity += 0.4;
        }

        line.material.opacity = Math.min(opacity, 0.8);
      });

      brackets.forEach((bracket) => {
        const pulse =
          Math.sin(elapsedTime * 2.5 + bracket.userData.pulsePhase) * 0.5 + 0.5;
        bracket.material.opacity = 0.5 + pulse * 0.3;
      });

      dots.forEach((dot, index) => {
        const pulse =
          Math.sin(elapsedTime * 3 + dot.userData.pulsePhase) * 0.5 + 0.5;
        let opacity = 0.4 + pulse * 0.5;

        if (dot.userData.clickPulse) {
          opacity += dot.userData.clickPulse * 0.6;
          dot.userData.clickPulse *= 0.93;
          if (dot.userData.clickPulse < 0.01) dot.userData.clickPulse = 0;
        }

        dot.material.opacity = Math.min(opacity, 1);

        const scale = 1 + pulse * 0.5;
        dot.scale.set(scale, scale, 1);

        const dx = dot.position.x - mouseX * 10;
        const dy = dot.position.y - mouseY * 10;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
          const expansionScale = 1 + (3 - distance) / 3;
          dot.scale.multiplyScalar(expansionScale);
          dot.material.opacity = Math.min(dot.material.opacity + 0.3, 1);
        }
      });

      scanLine.rotation.z += scanLine.userData.rotationSpeed;
      const scanPulse = Math.sin(elapsedTime * 2) * 0.5 + 0.5;
      scanLine.material.opacity = 0.3 + scanPulse * 0.5;

      particles.forEach((particle) => {
        particle.userData.angle += particle.userData.speed;

        particle.position.x =
          Math.cos(particle.userData.angle) * particle.userData.radius;
        particle.position.y =
          Math.sin(particle.userData.angle) * particle.userData.radius;

        const pulse =
          Math.sin(elapsedTime * 4 + particle.userData.pulsePhase) * 0.5 + 0.5;
        particle.material.opacity = pulse * 0.6;

        const scale = 0.5 + pulse * 0.5;
        particle.scale.set(scale, scale, 1);
      });

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.rotation.z = mouseX * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      circles.forEach((circle) => {
        circle.geometry.dispose();
        circle.material.dispose();
      });
      arcs.forEach((arc) => {
        arc.geometry.dispose();
        arc.material.dispose();
      });
      radialLines.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
      brackets.forEach((bracket) => {
        bracket.geometry.dispose();
        bracket.material.dispose();
      });
      dots.forEach((dot) => {
        dot.geometry.dispose();
        dot.material.dispose();
      });
      particles.forEach((particle) => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      scanLine.geometry.dispose();
      scanLine.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default JarvisHUD;
