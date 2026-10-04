type ManarLogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function ManarLogo({
  size = 32,
  className,
  title = "MANAR DATA",
}: ManarLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-8 -8 388 316"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient
          id="manar-brand"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="48%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6B2F3A" />
        </linearGradient>
      </defs>
      <path
        d="M 2 11 L 2 12 L 16 17 L 34 27 L 38 31 L 41 40 L 41 256 L 38 266 L 32 275 L 19 287 L 0 299 L 62 299 L 70 296 L 77 289 L 89 271 L 103 246 L 105 244 L 107 239 L 109 237 L 111 232 L 113 230 L 117 221 L 123 212 L 128 201 L 134 192 L 145 171 L 155 189 L 159 194 L 161 199 L 184 235 L 197 216 L 222 183 L 256 254 L 258 256 L 272 283 L 278 292 L 283 297 L 289 299 L 345 299 L 346 298 L 363 298 L 346 285 L 336 275 L 334 270 L 334 48 L 335 47 L 335 40 L 337 34 L 344 22 L 352 14 L 371 1 L 371 0 L 327 0 L 326 1 L 318 2 L 309 7 L 300 16 L 284 37 L 234 112 L 231 115 L 225 104 L 225 102 L 220 93 L 220 91 L 216 84 L 216 82 L 212 75 L 212 73 L 196 40 L 196 38 L 191 29 L 189 23 L 186 24 L 186 26 L 145 109 L 141 104 L 130 83 L 109 48 L 103 40 L 99 32 L 84 10 L 77 3 L 69 0 L 44 1 L 43 2 L 36 2 L 31 4 L 27 4 L 24 6 L 9 11 L 6 11 L 5 10 L 3 12 Z
           M 188 87 L 190 89 L 190 91 L 196 102 L 196 104 L 202 115 L 202 117 L 208 128 L 208 130 L 214 141 L 214 143 L 187 184 L 161 141 L 161 139 L 163 137 Z
           M 301 75 L 302 76 L 302 264 L 301 265 L 289 245 L 260 187 L 260 185 L 249 164 L 249 162 L 244 154 L 250 144 Z
           M 72 52 L 87 75 L 127 142 L 126 146 L 124 148 L 112 172 L 110 174 L 106 183 L 104 185 L 100 194 L 98 196 L 84 224 L 82 226 L 72 245 L 71 244 L 71 53 Z"
        fill="url(#manar-brand)"
        fillRule="evenodd"
      />
    </svg>
  );
}