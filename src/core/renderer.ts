import { Scene, WebGLRenderer, PerspectiveCamera } from "three";

export default class Renderer {
    camera!: PerspectiveCamera;
    scene: Scene;
    renderer!: WebGLRenderer;

    constructor() {
        this.onResize = this.onResize.bind(this);
        this.scene = new Scene();

        if (typeof window !== "undefined") {
            this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
            this.camera.position.z = 5;
            
            this.renderer = new WebGLRenderer({ antialias: true });
    
            this.renderer.shadowMap.enabled = true;

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
    
            window.addEventListener("resize", this.onResize);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    private onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}