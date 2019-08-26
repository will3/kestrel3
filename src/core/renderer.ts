import { Scene, WebGLRenderer, PerspectiveCamera } from "three";

export default class Renderer {
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;

    constructor() {
        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 5;
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({ antialias: true });

        this.onResize = this.onResize.bind(this);
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        window.addEventListener("resize", this.onResize);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}