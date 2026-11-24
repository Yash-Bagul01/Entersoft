"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LANDS = [
  { lat: 48, lon: -100, rx: 36, ry: 20 },
  { lat: 18, lon: -90, rx: 10, ry: 10 },
  { lat: -15, lon: -60, rx: 16, ry: 28 },
  { lat: 50, lon: 12, rx: 20, ry: 12 },
  { lat: 7, lon: 20, rx: 18, ry: 26 },
  { lat: 48, lon: 85, rx: 46, ry: 18 },
  { lat: 22, lon: 79, rx: 12, ry: 12 },
  { lat: 36, lon: 108, rx: 16, ry: 12 },
  { lat: -25, lon: 134, rx: 16, ry: 12 },
  { lat: 72, lon: -40, rx: 16, ry: 8 },
];

const ROUTES: Array<[[number, number], [number, number]]> = [
  [[40.7, -74], [51.5, -0.1]],
  [[51.5, -0.1], [1.3, 103.8]],
  [[1.3, 103.8], [-33.9, 151.2]],
  [[6.5, 3.4], [-23.5, -46.6]],
  [[35.7, 139.7], [37.8, -122.4]],
];

function onLand(lat: number, lon: number) {
  return LANDS.some((land) => {
    const dx = (lon - land.lon) / land.rx;
    const dy = (lat - land.lat) / land.ry;
    return dx * dx + dy * dy < 1;
  });
}

function toVec(lat: number, lon: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function arcPoints(from: [number, number], to: [number, number]) {
  const start = toVec(from[0], from[1], 1);
  const end = toVec(to[0], to[1], 1);
  const points: THREE.Vector3[] = [];
  for (let step = 0; step <= 48; step += 1) {
    const t = step / 48;
    const point = start.clone().lerp(end, t);
    point.normalize().multiplyScalar(1.03 + Math.sin(Math.PI * t) * 0.16);
    points.push(point);
  }
  return points;
}

export default function DigitalTrustGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    camera.position.set(0, 0, 5.05);
    camera.lookAt(0, 0, 0);

    const earth = new THREE.Group();
    scene.add(earth);

    earth.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.98, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x101614 }),
      ),
    );
    earth.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.16, 64, 64),
        new THREE.MeshBasicMaterial({
          color: 0x9dffc8,
          transparent: true,
          opacity: 0.07,
          side: THREE.BackSide,
        }),
      ),
    );

    const land: number[] = [];
    const ocean: number[] = [];
    for (let lat = -78; lat <= 78; lat += 3.1) {
      for (let lon = -180; lon < 180; lon += 3.1) {
        const jitter = ((lat * 13 + lon * 7) % 5) * 0.12;
        const point = toVec(lat + jitter, lon - jitter, 1.015);
        const bucket = onLand(lat, lon) ? land : ocean;
        if (!onLand(lat, lon) && (Math.abs(lat + lon) % 6 > 2)) continue;
        bucket.push(point.x, point.y, point.z);
      }
    }

    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute("position", new THREE.Float32BufferAttribute(land, 3));
    const oceanGeometry = new THREE.BufferGeometry();
    oceanGeometry.setAttribute("position", new THREE.Float32BufferAttribute(ocean, 3));
    const landDots = new THREE.Points(
      landGeometry,
      new THREE.PointsMaterial({ color: 0xf4fff8, size: 0.028, sizeAttenuation: true }),
    );
    const oceanDots = new THREE.Points(
      oceanGeometry,
      new THREE.PointsMaterial({
        color: 0x6e8f7c,
        size: 0.012,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
      }),
    );
    earth.add(oceanDots, landDots);

    const curves = ROUTES.map((route) => arcPoints(route[0], route[1]));
    const arcLines = curves.map((points) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xd7ffe8, transparent: true, opacity: 0.55 }),
      );
      earth.add(line);
      return line;
    });
    const pulses = curves.map((points) => {
      const geometry = new THREE.SphereGeometry(0.018, 12, 12);
      const pulse = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      pulse.position.copy(points[0]);
      earth.add(pulse);
      return pulse;
    });

    let frame = 0;
    const resize = () => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);

    const draw = (time = 0) => {
      if (!reduced) earth.rotation.y = time * 0.00018;
      pulses.forEach((pulse, index) => {
        const points = curves[index];
        const t = reduced ? 0.35 : (time * 0.00025 + index * 0.18) % 1;
        const cursor = points[Math.floor(t * (points.length - 1))];
        pulse.position.copy(cursor);
      });
      renderer.render(scene, camera);
    };

    draw();
    if (!reduced) {
      const loop = (time: number) => {
        draw(time);
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      landGeometry.dispose();
      oceanGeometry.dispose();
      (landDots.material as THREE.Material).dispose();
      (oceanDots.material as THREE.Material).dispose();
      arcLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      pulses.forEach((pulse) => {
        pulse.geometry.dispose();
        (pulse.material as THREE.Material).dispose();
      });
      earth.traverse((node) => {
        if (node instanceof THREE.Mesh && !pulses.includes(node)) {
          node.geometry.dispose();
          const material = node.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="dt-globe__canvas" />;
}
