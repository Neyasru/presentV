export interface VideoRoute {
  /** Código de la URL (ej. "3F4A67G"). Da igual mayúsculas/minúsculas. */
  code: string
  /** Solo el ID del vídeo de YouTube, no la URL completa. */
  youtubeId: string
  /** Título opcional, encima del vídeo. */
  title?: string
  /** Mensaje opcional, debajo del vídeo. */
  message?: string
}

export const routes: VideoRoute[] = [
  {
    code: '3F4A67G',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Sorpresa nº 1 🎁',
    message: 'Con todo mi cariño, para ti.',
  },
  {
    code: '9K2M81X',
    youtubeId: 'jNQXAC9IVRw',
    title: 'Sorpresa nº 2 🎈',
  },
  {
    code: 'P7Q4T2Z',
    youtubeId: '9bZkp7q19f0',
    message: '¡Que cumplas muchísimos más! 🥳',
  },
]

export const findRoute = (code: string | undefined): VideoRoute | undefined => {
  if (!code) return undefined
  const wanted = code.toLowerCase()
  return routes.find((r) => r.code.toLowerCase() === wanted)
}
