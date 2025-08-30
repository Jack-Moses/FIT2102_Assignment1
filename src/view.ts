import { State } from "./types";
import { Viewport, BirdConstants, GameConstants } from "./constants";

/**
 * Creates an SVG element with the given properties.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/SVG/Element for valid
 * element names and properties.
 *
 * @param namespace Namespace of the SVG element
 * @param name SVGElement name
 * @param props Properties to set on the SVG element
 * @returns SVG element
 */
const createSvgElement = (
    namespace: string | null,
    name: string,
    props: Record<string, string> = {},
): SVGElement => {
    const elem = document.createElementNS(namespace, name) as SVGElement;
    Object.entries(props).forEach(([k, v]) => elem.setAttribute(k, v));
    return elem;
};

/**
 * Brings an SVG element to the foreground.
 * @param elem SVG element to bring to the foreground
 */
const bringToForeground = (elem: SVGElement): void => {
    elem.parentNode?.appendChild(elem);
};

/**
 * Displays a SVG element on the canvas. Brings to foreground.
 * @param elem SVG element to display
 */
const show = (elem: SVGElement): void => {
    elem.setAttribute("visibility", "visible");
    bringToForeground(elem);
};

/**
 * Hides a SVG element on the canvas.
 * @param elem SVG element to hide
 */
const hide = (elem: SVGElement): void => {
    elem.setAttribute("visibility", "hidden");
};

export const render = (): ((s: State) => void) => {
    // Canvas elements
    const gameOver = document.querySelector("#gameOver") as SVGElement,
        container = document.querySelector("#main") as HTMLElement,
        livesText = document.querySelector("#livesText") as HTMLElement,
        scoreText = document.querySelector("#scoreText") as HTMLElement,
        svg = document.querySelector("#svgCanvas") as SVGSVGElement;

    svg.setAttribute(
        "viewBox",
        `0 0 ${Viewport.CANVAS_WIDTH} ${Viewport.CANVAS_HEIGHT}`,
    );

    /**
     * Renders the current state to the canvas.
     *
     * In MVC terms, this updates the View using the Model.
     *
     * @param s Current state
     */
    return (s: State) => {
        // Clear previous frame elements
        svg.querySelectorAll(".game-object").forEach(el => el.remove());

        // Add birb to the main grid canvas
        const birdImg = createSvgElement(svg.namespaceURI, "image", {
            href: "assets/birb.png",
            x: `${Viewport.CANVAS_WIDTH * 0.3 - BirdConstants.WIDTH / 2}`,
            y: `${Viewport.CANVAS_HEIGHT / 2 - BirdConstants.HEIGHT / 2}`,
            width: `${BirdConstants.WIDTH}`,
            height: `${BirdConstants.HEIGHT}`,
            class: "game-object bird",
        });
        svg.appendChild(birdImg);
        // Bring the bird image to the foreground
        bringToForeground(birdImg);

        // Render ghosts birbs with transparency
        s.ghosts.forEach(ghost => {
            if (ghost.currentIndex < ghost.path.length) {
                const pos = ghost.path[ghost.currentIndex];
                const ghostImg = createSvgElement(svg.namespaceURI, "image", {
                    href: "assets/birb.png",
                    x: `${Viewport.CANVAS_WIDTH * 0.3 - BirdConstants.WIDTH / 2}`,
                    y: `${Viewport.CANVAS_HEIGHT / 2 - BirdConstants.HEIGHT / 2}`,
                    width: `${BirdConstants.WIDTH}`,
                    height: `${BirdConstants.HEIGHT}`,
                    class: "game-object ghost",
                });
                svg.appendChild(ghostImg);
            }
        });

        // Render each pipe
        s.pipes.forEach(pipe => {
            // Top pipe
            const pipeTop = createSvgElement(svg.namespaceURI, "rect", {
                x: `${pipe.x}`,
                y: "0",
                width: `${GameConstants.PIPE_WIDTH}`,
                height: `${pipe.gapY - pipe.gapHeight / 2}`,
                fill: "green",
                class: "game-object pipe",
            });
            // Bottom pipe
            const pipeBottom = createSvgElement(svg.namespaceURI, "rect", {
                x: `${pipe.x}`,
                y: `${pipe.gapY + pipe.gapHeight / 2}`,
                width: `${GameConstants.PIPE_WIDTH}`,
                height: `${Viewport.CANVAS_HEIGHT - (pipe.gapY + pipe.gapHeight / 2)}`,
                fill: "green",
            });
            svg.appendChild(pipeTop);
            svg.appendChild(pipeBottom);
        });

        // Update UI text
        if (livesText) livesText.textContent = String(s.lives);
        if (scoreText) scoreText.textContent = String(s.score);

        if (s.gameOver) {
            show(gameOver);
        } else {
            hide(gameOver);
        }
    };
};
