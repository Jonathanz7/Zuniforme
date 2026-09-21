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
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789962092939-1.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960472940-2.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960478168-3.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789960483749-4.png"
        ]
      }
    ]
  },
  {
    "id": "zu-chaqueta-luna",
    "nombre": "Conjunto Alma",
    "categoria": "Uniformes Quirúrgicos",
    "descripcion": "Conjunto femenino de diseño moderno compuesto por blusa sin mangas con cuello alto y cierre frontal, y pantalón tipo jogger con pretina elástica y bolsillos cargo. Diseñado para brindar comodidad, libertad de movimiento y funcionalidad durante jornadas profesionales.",
    "precio": 140000,
    "tallas": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "genero": "Femenino",
    "destacado": false,
    "tela": "Antifluido semi-impermeable con forro interior transpirableTela / composición: Lafayette 4-Way Stretch — 96% poliéster, 4% spandex",
    "caracteristicas": [
      "Cuello alto con cremallera frontal",
      "Diseño sin mangas",
      "Pretina elástica",
      "Corte semi-ajustado que resalta la figura femenina"
    ],
    "variantesColor": [
      {
        "color": "Ébano",
        "colorHex": "#0B0B0D",
        "imagenes": [
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789961282698-1.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789961284977-2.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789961288251-3.png",
          "https://ckia3v7wbmlxmsag.public.blob.vercel-storage.com/products/1789961291950-4.png"
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
