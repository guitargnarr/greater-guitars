/**
 * HeroScene: 3D visualization of vibrating guitar strings
 *
 * Six strings rendered as glowing lines that vibrate with harmonic overtones.
 * Particles drift like sawdust in a workshop.
 * Camera slowly orbits, creating depth and life.
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VibrantStrings() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  // 6 strings with different gauges (visual thickness) and base frequencies
  const strings = useMemo(() => [
    { y: 1.5,  gauge: 0.008, freq: 329.63, color: "#d4a574" }, // E4
    { y: 0.9,  gauge: 0.010, freq: 246.94, color: "#c49a6c" }, // B3
    { y: 0.3,  gauge: 0.013, freq: 196.00, color: "#b89064" }, // G3
    { y: -0.3, gauge: 0.018, freq: 146.83, color: "#ac865c" }, // D3
    { y: -0.9, gauge: 0.024, freq: 110.00, color: "#a07c54" }, // A2
    { y: -1.5, gauge: 0.032, freq: 82.41,  color: "#94724c" }, // E2
  ], []);

  // Create geometry for each string as a tube following a curve
  const stringGeometries = useMemo(() => {
    return strings.map(() => {
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        points.push(new THREE.Vector3((i / segments) * 8 - 4, 0, 0));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      return new THREE.TubeGeometry(curve, segments, 0.012, 8, false);
    });
  }, [strings]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (!groupRef.current) return;

    // Update each string's geometry to simulate vibration
    stringGeometries.forEach((geo, si) => {
      const str = strings[si];
      const posAttr = geo.attributes.position;
      const segments = 128;
      const amplitude = (0.03 + si * 0.008) * (0.5 + 0.5 * Math.sin(t * 0.3 + si));

      for (let i = 0; i <= segments; i++) {
        // String vibration: fundamental + harmonics
        const x = (i / segments) * 8 - 4;
        const normalizedX = i / segments;
        // Standing wave envelope (zero at endpoints)
        const envelope = Math.sin(normalizedX * Math.PI);
        // Fundamental + 2nd + 3rd harmonic
        const vibration =
          Math.sin(t * str.freq * 0.02 + normalizedX * Math.PI) * amplitude * envelope +
          Math.sin(t * str.freq * 0.04 + normalizedX * Math.PI * 2) * amplitude * 0.3 * envelope +
          Math.sin(t * str.freq * 0.06 + normalizedX * Math.PI * 3) * amplitude * 0.15 * envelope;

        // Update all vertices at this segment (tube has 8 radial segments)
        for (let r = 0; r <= 8; r++) {
          const idx = i * 9 + r; // 9 vertices per segment ring (8 + 1 to close)
          if (idx * 3 + 1 < posAttr.count * 3) {
            const baseY = str.y;
            posAttr.setY(idx, baseY + vibration);
            posAttr.setZ(idx, posAttr.getZ(idx) * 0.999 + vibration * 0.3 * 0.001);
          }
        }
      }
      posAttr.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef}>
      {strings.map((str, i) => (
        <mesh key={i} geometry={stringGeometries[i]}>
          <meshStandardMaterial
            color={str.color}
            emissive={str.color}
            emissiveIntensity={0.3 + Math.abs(i - 2.5) * 0.05}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function WorkshopParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.001 + 0.0005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3];
      let y = posAttr.getY(i) + velocities[i * 3 + 1];
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];
      // Reset particles that drift too far
      if (y > 3.5) { y = -3.5; x = (Math.random() - 0.5) * 12; }
      if (Math.abs(x) > 6.5) x *= -0.9;
      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#c49a6c"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function SlowOrbit() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() * 0.08;
    const radius = 7;
    camera.position.x = Math.sin(t) * radius * 0.3;
    camera.position.y = 0.5 + Math.sin(t * 0.5) * 0.3;
    camera.position.z = Math.cos(t) * radius * 0.15 + radius * 0.85;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.15} color="#d4a574" />
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#e8c99b" distance={15} />
        <pointLight position={[-3, -1, 3]} intensity={0.4} color="#8fa4b8" distance={12} />
        <pointLight position={[0, 0, -2]} intensity={0.3} color="#c49a6c" distance={10} />
        <fog attach="fog" args={["#0c0a08", 6, 16]} />
        <VibrantStrings />
        <WorkshopParticles />
        <SlowOrbit />
      </Canvas>
    </div>
  );
}
