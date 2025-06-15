import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Button, Spinner, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ArrowsFullscreen, ZoomIn, ZoomOut, ArrowCounterclockwise, PlayFill, PauseFill } from 'react-bootstrap-icons';

const GLBViewer = ({ fileUrl, height = '300px' }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene().background = new THREE.Color(0xf5f5f5));
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef(null);
  const originalPositionRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [hasAnimation, setHasAnimation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

  const getFullUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://localhost:8080${url.startsWith('/') ? url : `/uploads/${url}`}`;
  };

  useEffect(() => {
    if (!containerRef.current || !fileUrl) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (containerRef.current.hasChildNodes()) containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-1, 0.5, -1);
    scene.add(dirLight2);

    scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6));

    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.enablePan = true;
    controls.panSpeed = 0.5;
    controls.screenSpacePanning = true;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI - Math.PI / 6;
    controlsRef.current = controls;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (mixerRef.current && isPlaying) {
        mixerRef.current.update(clockRef.current.getDelta());
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      if (controlsRef.current) controlsRef.current.dispose();

      window.removeEventListener('resize', handleResize);

      if (modelRef.current && sceneRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      mixerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !fileUrl) return;

    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    setLoading(true);
    setProgress(0);
    setError(null);
    setHasAnimation(false);
    setIsPlaying(false);

    const fullUrl = getFullUrl(fileUrl);
    if (!fullUrl) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    const extension = fullUrl.split('.').pop().toLowerCase();
    let loader;

    switch (extension) {
      case 'glb':
      case 'gltf':
        loader = new GLTFLoader();
        break;
      case 'obj':
        loader = new OBJLoader();
        break;
      case 'fbx':
        loader = new FBXLoader();
        break;
      default:
        setError("Unsupported file format");
        setLoading(false);
        return;
    }

    loader.load(
      fullUrl,
      (modelOrGltf) => {
        const model = extension === 'glb' || extension === 'gltf' ? modelOrGltf.scene : modelOrGltf;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 2 / Math.max(size.x, size.y, size.z);

        model.position.sub(center);
        model.scale.multiplyScalar(scale);

        originalPositionRef.current = {
          position: model.position.clone(),
          rotation: model.rotation.clone(),
          scale: model.scale.clone()
        };

        sceneRef.current.add(model);
        modelRef.current = model;

        if ((extension === 'glb' || extension === 'gltf') && modelOrGltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const animation = mixer.clipAction(modelOrGltf.animations[0]);
          animation.play();
          animation.paused = true;

          mixerRef.current = mixer;
          setHasAnimation(true);
        }

        if (cameraRef.current) {
          cameraRef.current.position.set(0, 0, 5);
          if (controlsRef.current) controlsRef.current.update();
        }

        setLoading(false);
      },
      (xhr) => setProgress(Math.round((xhr.loaded / xhr.total) * 100)),
      (err) => {
        console.error('Error loading model:', err);
        setError("Failed to load 3D model");
        setLoading(false);
      }
    );
  }, [fileUrl]);

  const toggleFullscreen = () => setFullscreen(!fullscreen);

  const resetView = () => {
    if (!modelRef.current || !cameraRef.current || !controlsRef.current) return;

    cameraRef.current.position.set(0, 0, 5);

    if (originalPositionRef.current) {
      modelRef.current.position.copy(originalPositionRef.current.position);
      modelRef.current.rotation.copy(originalPositionRef.current.rotation);
      modelRef.current.scale.copy(originalPositionRef.current.scale);
    }

    controlsRef.current.update();
  };

  const toggleAnimation = () => {
    if (!mixerRef.current) return;
    setIsPlaying(!isPlaying);
  };

  const zoomIn = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.z -= 0.5;
    controlsRef.current.update();
  };

  const zoomOut = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.z += 0.5;
    controlsRef.current.update();
  };

  if (!fileUrl) {
    return (
      <div className="d-flex align-items-center justify-content-center border rounded bg-light" style={{ height }}>
        <span className="text-muted">No 3D model available</span>
      </div>
    );
  }

  return (
    <div 
      className={`position-relative ${fullscreen ? 'fixed-top vw-100 vh-100 bg-white' : ''}`}
      style={{ width: '100%', height: fullscreen ? '100%' : height, zIndex: fullscreen ? 1050 : 'auto' }}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <div ref={containerRef} className="w-100 h-100 rounded" style={{ overflow: 'hidden', position: 'relative' }} />

      {loading && (
        <div className="position-absolute top-0 left-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light bg-opacity-75">
          <Spinner animation="border" />
          <div className="mt-2">Loading model... {progress}%</div>
          <div className="progress mt-2" style={{ width: '80%', maxWidth: '300px' }}>
            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75">
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      <div 
        className="position-absolute bottom-0 right-0 p-2 d-flex"
        style={{ 
          opacity: controlsVisible || fullscreen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '4px',
          margin: '8px'
        }}
      >
        <ButtonGroup size="sm">
          <OverlayTrigger placement="top" overlay={<Tooltip>Zoom In</Tooltip>}>
            <Button variant="outline-secondary" onClick={zoomIn}><ZoomIn /></Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>Zoom Out</Tooltip>}>
            <Button variant="outline-secondary" onClick={zoomOut}><ZoomOut /></Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip>Reset View</Tooltip>}>
            <Button variant="outline-secondary" onClick={resetView}><ArrowCounterclockwise /></Button>
          </OverlayTrigger>

          {hasAnimation && (
            <OverlayTrigger placement="top" overlay={<Tooltip>{isPlaying ? 'Pause' : 'Play'} Animation</Tooltip>}>
              <Button variant="outline-secondary" onClick={toggleAnimation}>
                {isPlaying ? <PauseFill /> : <PlayFill />}
              </Button>
            </OverlayTrigger>
          )}

          <OverlayTrigger placement="top" overlay={<Tooltip>{fullscreen ? 'Exit Full Screen' : 'Full Screen'}</Tooltip>}>
            <Button variant="outline-secondary" onClick={toggleFullscreen}><ArrowsFullscreen /></Button>
          </OverlayTrigger>
        </ButtonGroup>
      </div>

      {fullscreen && (
        <Button variant="secondary" className="position-absolute top-0 right-0 m-3" onClick={toggleFullscreen}>
          Close
        </Button>
      )}
    </div>
  );
};

export default GLBViewer;
