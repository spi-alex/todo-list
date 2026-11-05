import type { NextConfig } from "next";

// Obs.: o template do Next 16.4 vem com `cacheComponents` e `partialPrefetching`
// ligados. Desligamos para simplificar: com eles ativos, toda leitura de sessão
// (ex.: `auth()` do Clerk) precisa ficar dentro de <Suspense>. Sem eles, as
// páginas que usam `auth()` simplesmente renderizam por requisição.
//
// O Tailwind é processado via PostCSS (postcss.config.mjs), que é o setup
// que o shadcn/ui espera.
const nextConfig: NextConfig = {
  output: "standalone", // usado pelo Dockerfile (imagem de produção enxuta)
};

export default nextConfig;
