import "../styles/components/SkullArt.css";

export default function SkullArt() {
  return (
    <div className="skull-art" aria-hidden="true">
      <svg viewBox="0 0 400 460" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="draw draw-1"
          d="M200,40 C260,40 300,90 300,150 C300,190 290,210 285,230 C300,240 305,260 295,280 C290,300 275,305 265,300 C260,330 250,360 230,380 C220,392 210,398 200,400 C190,398 180,392 170,380 C150,360 140,330 135,300 C125,305 110,300 105,280 C95,260 100,240 115,230 C110,210 100,190 100,150 C100,90 140,40 200,40 Z"
        />
        <ellipse className="draw draw-2" cx="155" cy="178" rx="28" ry="36" />
        <ellipse className="draw draw-2" cx="245" cy="178" rx="28" ry="36" />
        <path className="draw draw-2" d="M200,192 L184,232 Q200,248 216,232 Z" />
        <path
          className="draw draw-3"
          d="M155,300 L155,340 M170,300 L170,345 M185,300 L185,348 M200,300 L200,350 M215,300 L215,348 M230,300 L230,345 M245,300 L245,340"
        />
        <path className="draw draw-3" d="M150,300 C170,312 230,312 250,300" />
        <path className="draw draw-3" d="M200,350 L200,392" />
        <g className="hatch draw draw-4">
          <path d="M112,110 L128,126 M118,124 L134,140 M124,138 L140,154 M120,155 L136,171" />
          <path d="M288,110 L272,126 M282,124 L266,140 M276,138 L260,154 M280,155 L264,171" />
          <path d="M118,250 L134,262 M124,262 L140,274 M114,262 L128,276" />
          <path d="M282,250 L266,262 M276,262 L260,274 M286,262 L272,276" />
        </g>
      </svg>
    </div>
  );
}
