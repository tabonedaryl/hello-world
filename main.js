import * as THREE from 'three';
import './styles/styles.css';

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//Texture
const texture = new THREE.TextureLoader().load('textures/earth.jpg' ); 

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({map: texture});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.enableZoom = false;

//Light
const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
scene.add( ambient );

const spotLight = new THREE.SpotLight(0xffffff, 100);
spotLight.position.set(0, 5, 6);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 1;
spotLight.decay = 2;
spotLight.distance = 0;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
scene.add( spotLight );

// const lightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(lightHelper);

//Resize
window.addEventListener("resize", () => {
    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
})

const axis = new THREE.Vector3(-1, 1, 0).normalize(); // Diagonal axis (normalized)
const angle = 0.005; // Rotation speed

function animate() {
    // Create a quaternion that represents a rotation around the diagonal axis
    const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    
    // Apply the quaternion rotation to the sphere
    sphere.quaternion.multiplyQuaternions(quaternion, sphere.quaternion);
    
    // Normalize the quaternion to avoid cumulative errors
    sphere.quaternion.normalize();
    // Render the scene
    renderer.render(scene, camera);
}
