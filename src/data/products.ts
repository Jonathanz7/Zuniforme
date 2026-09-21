import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    "id": "zu-scrub-aura",
    "nombre": "Conjunto Esperanza",
    "categoria": "Uniformes Quirúrgicos",
    "descripcion": "Conjunto femenino de blusa cuello en V y pantalón jogger, diseñado para brindar comodidad, libertad de movimiento y un ajuste práctico durante jornadas de trabajo prolongadas. Cuenta con bolsillos funcionales y pretina elástica con cordón.",
    "precio": 115000,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "genero": "Femenino",
    "destacado": true,
    "tela": "Antifluido Lafayette 4-Way Stretch (96% Poliéster, 4% Spandex)",
    "caracteristicas": [
      "Repelencia certificada a fluidos corporales y salpicaduras",
      "Blusa con 2 bolsillos inferiores amplios y 1 bolsillo superior para esfero",
      "Pantalón jogger con 4 bolsillos (2 laterales + 2 tipo cargo)",
      "Tecnología de secado rápido y no requiere planchado riguroso",
      "Bordado personalizado de nombre y especialidad disponible"
    ],
    "variantesColor": [
      {
        "color": "Rosa Esperanza 🌸",
        "colorHex": "#C70033",
        "imagenes": [
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789959922760-1.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960472940-2.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960478168-3.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960483749-4.png"
        ]
      }
    ]
  },
  {
    "id": "zu-chaqueta-luna",
    "nombre": "Chaqueta Antifluidos Luna Bomber",
    "categoria": "Chaquetas Antifluidos",
    "descripcion": "Chaqueta antifluido estilo bomber con cuello nerú rib suave y cierre metálico inoxidable en tono oro rosa. Ideal para complementar tu uniforme clínico, mantener la temperatura adecuada en consultorio con aire acondicionado y conservar un look femenino y sofisticado.",
    "precio": 98000,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "genero": "Femenino",
    "destacado": true,
    "tela": "Antifluido semi-impermeable con forro interior transpirable",
    "caracteristicas": [
      "Puños y cuello en rib elástico resistente al desgaste",
      "Cierre central dorado / oro rosa de alta durabilidad",
      "2 bolsillos con cremallera oculta para guardar llaves o celular",
      "Corte semi-ajustado que resalta la figura femenina"
    ],
    "variantesColor": [
      {
        "color": "Azul",
        "colorHex": "#22165a",
        "imagenes": [
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789959837811-zu-chaqueta-luna-azul.jpg",
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Mauve Oscuro",
        "colorHex": "#8C3D65",
        "imagenes": [
          "https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Blanco Clínico",
        "colorHex": "#FFFFFF",
        "imagenes": [
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    "id": "zu-pantalon-jogger",
    "nombre": "Pantalón Scrub Jogger Clínico",
    "categoria": "Pantalones Jogger",
    "descripcion": "Pantalón tipo jogger con pretina ancha de tiro medio-alto, cordón decorativo ajustable y bota con elástico anatómico que no corta la circulación. Diseñado con 6 bolsillos estratégicamente ubicados para tijeras, teléfono, sellos y notas clínicas.",
    "precio": 72000,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "genero": "Femenino",
    "destacado": false,
    "tela": "Antifluido Spandex Bidireccional",
    "caracteristicas": [
      "Pretina suave que no marca el abdomen ni genera incomodidad",
      "Costuras dobles reforzadas en entrepierna y tiro",
      "Bolsillo cargo con división especial para bolígrafo y linterna",
      "Fácil lavado y secado ultra rápido en menos de 2 horas"
    ],
    "variantesColor": [
      {
        "color": "Mauve ZUniforme",
        "colorHex": "#A8577F",
        "imagenes": [
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789959838230-zu-pantalon-jogger-mauve-zuniforme.jpg",
          "https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Azul Marino",
        "colorHex": "#1B2A4A",
        "imagenes": [
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Negro",
        "colorHex": "#222222",
        "imagenes": [
          "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    "id": "zu-gorro-antifluido",
    "nombre": "Gorro Quirúrgico Ergonómico Ajustable",
    "categoria": "Gorros Quirúrgicos",
    "descripcion": "Gorro antifluido con diseño de ajuste posterior mediante lazo y banda elástica, pensado para acomodar tanto cabello corto como coletas o moños voluminosos. Incluye toalla interna en la frente para absorción de sudor.",
    "precio": 25000,
    "tallas": [
      "Ajustable"
    ],
    "genero": "Unisex",
    "destacado": false,
    "tela": "Microfibra Antifluido Cloro-resistente",
    "caracteristicas": [
      "Banda absorbente en felpa de algodón en la zona de la frente",
      "Botones laterales opcionales para sujetar el tapabocas y aliviar las orejas",
      "No destiñe con el lavado frecuente ni con desinfectantes",
      "Personalizable con bordado de tu nombre o logo"
    ],
    "variantesColor": [
      {
        "color": "Rosa Pastel Liso",
        "colorHex": "#F4B8CC",
        "imagenes": [
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Mauve ZUniforme",
        "colorHex": "#A8577F",
        "imagenes": [
          "https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Azul Quirófano",
        "colorHex": "#2B6CB0",
        "imagenes": [
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    "id": "zu-bata-estetica",
    "nombre": "Bata Antifluido Silueta Slim & Spa",
    "categoria": "Batas Médicas & Spa",
    "descripcion": "Bata manga 3/4 o larga con corte estilizado princesa, abotonadura frontal oculta y bolsillos diagonales reforzados. Especialmente concebida para odontología, medicina estética, dermatología, cosmetología y laboratorios que requieren una presencia pulcra y distinguida.",
    "precio": 110000,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "genero": "Femenino",
    "destacado": true,
    "tela": "Antifluido Universal de Alta Densidad",
    "caracteristicas": [
      "Silueta entallada que favorece la postura sin restringir movimiento",
      "Pinzas en espalda y cinturón decorativo integrado",
      "Resistencia a salpicaduras químicas leves y desinfectantes",
      "Cuello mao refinado con acabado suave"
    ],
    "variantesColor": [
      {
        "color": "Blanco Puro",
        "colorHex": "#FFFFFF",
        "imagenes": [
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Rosa Palo Suave",
        "colorHex": "#FBE8EF",
        "imagenes": [
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Mauve ZUniforme",
        "colorHex": "#A8577F",
        "imagenes": [
          "https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    "id": "zu-scrub-essential",
    "nombre": "Uniforme Quirúrgico Essential Cuello Cruzado",
    "categoria": "Uniformes Quirúrgicos",
    "descripcion": "Uniforme clásico modernizado con escote cruzado en rib elástico a tono, aberturas laterales ergonómicas y pantalón bota recta con elástico en cintura. La elección predilecta para dotación completa de equipos médicos, enfermería y veterinaria en Neiva y toda Colombia.",
    "precio": 120000,
    "tallas": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "genero": "Unisex",
    "destacado": false,
    "tela": "Antifluido Clásico Repelente Lafayette",
    "caracteristicas": [
      "Diseño versátil apto para dotaciones corporativas e institucionales",
      "Excelente relación durabilidad/costo para pedidos al por mayor",
      "Color sólido garantizado por más de 100 lavadas industriales",
      "Descuento especial en dotaciones a partir de 6 conjuntos"
    ],
    "variantesColor": [
      {
        "color": "Azul Celeste Hospitalario",
        "colorHex": "#7EA0B7",
        "imagenes": [
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Vino Tinto / Borgoña",
        "colorHex": "#682035",
        "imagenes": [
          "https://images.unsplash.com/photo-1594824813589-9a25032fb778?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      {
        "color": "Mauve ZUniforme",
        "colorHex": "#A8577F",
        "imagenes": [
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop"
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  'Todos',
  'Uniformes Quirúrgicos',
  'Chaquetas Antifluidos',
  'Pantalones Jogger',
  'Gorros Quirúrgicos',
  'Batas Médicas & Spa'
];
