FROM denoland/deno:latest

USER deno

EXPOSE 3000

WORKDIR /app
COPY . .

CMD [ "run", "--unstable", "--allow-net", "--allow-read", "server.ts" ]