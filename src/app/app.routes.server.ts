import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productDetails/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'orders/users/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
