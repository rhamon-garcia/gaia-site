# Gaia Tecnologias e Geosistemas

Landing page estática, em HTML, CSS e JavaScript, para publicação no GitHub Pages.

- Repositório: https://github.com/rhamon-garcia/gaia-site
- Site publicado: https://rhamon-garcia.github.io/gaia-site/

## Estrutura

```
site/
  index.html              página principal
  privacidade.html        política de privacidade
  termos.html             termos de uso
  404.html                página de erro personalizada
  styles.css              estilos da página principal e das páginas legais
  script.js               menu, revelações, formulário e link ativo
  robots.txt              indexação
  .nojekyll               desativa o processamento do Jekyll no GitHub Pages
  assets/
    logo-gaia.png         logotipo original
    logo-mark.png         marca recortada, usada no cabeçalho
    rhamon-garcia.jpg     foto do sócio e diretor
    logo-inyaga.jpg       logo da Inyaga
    logo-sigasmaricas.png logo do Projeto SIG@S Maricás
    logo-acao-socioambiental.png logo do Instituto Ação Socioambiental
    momento-drone.jpg     aerolevantamento em campo
    momento-equipe.jpg    equipe e parceiros em campo
    momento-parceria.jpg  registro da parceria com o Instituto Ação Socioambiental
    favicon.png
    apple-touch-icon.png
    og-image.png          imagem de compartilhamento social
    contours-light.svg    arte de curvas de nível para fundos escuros
```

## WebGIS

O portfólio WebGIS é uma aplicação Solara publicada no Hugging Face Spaces:

```
https://gaiatecnologias-solara-geospatial.hf.space
```

Ela é carregada em um iframe na seção WebGIS de `index.html` e também pode ser aberta em tela cheia pelo link do cabeçalho do navegador. Se o endereço do Space mudar, atualize o `src` do iframe e o link `browser-open`.

## Pré-visualizar localmente

Na pasta `site`:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. O projeto é estático e não tem etapa de build.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `gaia-site`.
2. Envie **o conteúdo da pasta `site`** para a raiz do repositório.
3. No repositório, abra **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação em `https://rhamon-garcia.github.io/gaia-site/`.

Se preferir manter a pasta `site` no repositório, envie a pasta inteira e escolha `/site` como pasta de publicação.

Para domínio próprio, configure o domínio em **Settings → Pages → Custom domain** e crie o registro DNS indicado pelo GitHub.

## Antes de publicar: revisar

- [ ] **Revisão jurídica.** As páginas de privacidade e termos são modelos iniciais. Revise com apoio jurídico e remova a nota de modelo ao final.
- [ ] **Formulário.** Hoje o envio abre o aplicativo de email do visitante com a mensagem pronta. Para receber as mensagens sem depender do cliente de email, troque o trecho de envio em `script.js` por um endpoint de formulário (Formspree, Netlify Forms ou serviço equivalente).
- [ ] **Direitos de imagem.** Confirme a autorização de uso das fotos, do logo da Inyaga e dos logos dos clientes antes da publicação.

## Observações

- Contato publicado: `gaia.tecnologias1@gmail.com` e `(21) 98686-1805`.
- CNPJ publicado no rodapé e nas páginas legais: 47.385.358/0001-43.
- Perfil do consultor: Rhamon Garcia, sócio e diretor, Engenheiro Ambiental pela Escola Politécnica/UFRJ.
- O WebGIS embutido é o portfólio hospedado no Hugging Face Spaces. Os dados exibidos nele são de exemplo e pertencem ao próprio Space.
- A página não usa cookies de rastreamento nem analytics. A fonte Geist é carregada do Google Fonts; isso está descrito na política de privacidade.
- A logo, as cores e o tom visual foram derivados do arquivo original da marca.
