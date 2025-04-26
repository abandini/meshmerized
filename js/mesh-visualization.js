/**
 * MESHMERIZED.COM - Mesh Network Visualization
 * Creates an interactive, animated mesh network visualization
 */

class MeshVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.colors = {
            node: {
                primary: '#1e88e5',
                secondary: '#00bcd4',
                accent: '#7b1fa2'
            },
            connection: {
                normal: 'rgba(30, 136, 229, 0.2)',
                active: 'rgba(0, 188, 212, 0.6)'
            }
        };
        this.nodeDensity = 0.00005; // nodes per pixel squared
        this.nodeCount = 0;
        this.connectionDistance = 200;
        this.initialized = false;
        this.resizeTimeout = null;

        // Bind methods
        this.init = this.init.bind(this);
        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        this.createNodes = this.createNodes.bind(this);
        this.drawConnections = this.drawConnections.bind(this);
        this.drawNodes = this.drawNodes.bind(this);

        // Initialize
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.resize, 200);
        });

        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.nodeCount = Math.max(15, Math.floor(this.canvas.width * this.canvas.height * this.nodeDensity));
        this.createNodes();
        this.initialized = true;
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.nodeCount = Math.max(15, Math.floor(this.canvas.width * this.canvas.height * this.nodeDensity));
        this.createNodes();
    }

    createNodes() {
        this.nodes = [];

        for (let i = 0; i < this.nodeCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const size = Math.random() * 3 + 2;
            const speed = Math.random() * 0.5 + 0.1;
            const direction = Math.random() * Math.PI * 2;
            const colorType = Math.random();
            
            let color;
            if (colorType < 0.6) {
                color = this.colors.node.primary;
            } else if (colorType < 0.9) {
                color = this.colors.node.secondary;
            } else {
                color = this.colors.node.accent;
            }

            this.nodes.push({
                x,
                y,
                size,
                speed,
                direction,
                color
            });
        }
    }

    drawNodes() {
        for (const node of this.nodes) {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fillStyle = node.color;
            this.ctx.fill();
            
            // Update node position
            node.x += Math.cos(node.direction) * node.speed;
            node.y += Math.sin(node.direction) * node.speed;
            
            // Boundary check and bounce
            if (node.x < 0 || node.x > this.canvas.width) {
                node.direction = Math.PI - node.direction;
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.direction = -node.direction;
            }
        }
    }

    drawConnections() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.strokeStyle = `rgba(30, 136, 229, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        if (!this.initialized) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConnections();
        this.drawNodes();
        
        requestAnimationFrame(this.animate);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const meshVisualization = new MeshVisualization('meshCanvas');
});
