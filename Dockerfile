# ---------- Build Stage ----------
FROM node:18-alpine AS build

# Install git
RUN apk update && apk add --no-cache git

# Clone project
RUN git clone https://github.com/GuyNeeman/Sudoku-Frontend

# Set working directory
WORKDIR /Sudoku-Frontend

# Install dependencies
RUN npm install

# Build Vite app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine

# Copy Vite build output to Nginx
COPY --from=build /Sudoku-Frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]