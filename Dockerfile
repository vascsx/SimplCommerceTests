FROM mcr.microsoft.com/playwright:v1.53.0-noble

WORKDIR /app
COPY package*.json ./
RUN npm install && npx playwright install --with-deps
COPY . .
# CMD ["npx", "playwright test", "--reporter=junit"]
