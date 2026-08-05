# Entgegen als eigener Server: baut die App und liefert sie mitsamt der
# Schnittstelle aus. Der API-Schlüssel wird beim Start übergeben und liegt
# nie im Abbild.
#
#   docker build -f server/Dockerfile -t entgegen .
#   docker run -p 8080:8080 \
#     -e ANTHROPIC_API_KEY=sk-ant-… \
#     -e ENTGEGEN_PASSWORT=ein-eigenes-wort \
#     entgegen

FROM node:22-alpine AS build
WORKDIR /app

# Erst die Abhängigkeiten – so bleibt diese Schicht im Cache, solange sich
# package.json nicht ändert.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Ohne BASE_PATH baut Vite für die Wurzel „/“ – genau richtig für einen
# eigenen Server. Die GitHub-Pages-Fassung braucht stattdessen /Bible-study/.
RUN npm run build

FROM node:22-alpine
WORKDIR /app

# Der Server hat keine Abhängigkeiten; es reicht die eine Datei und die
# gebaute App.
COPY --from=build /app/dist ./dist
COPY server/entgegen-server.mjs ./server/

# Nicht als root laufen: Das Abbild bringt den Nutzer „node“ bereits mit.
USER node

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1:8080/gesund || exit 1

CMD ["node", "server/entgegen-server.mjs"]
