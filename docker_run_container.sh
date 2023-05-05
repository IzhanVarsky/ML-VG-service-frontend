docker run --restart=always -p 36000:36000 ml-vg-service-frontend:latest
# docker run -e PORT=36000 --rm -p 36000:36000 izhanvarsky/ml-vg-service-frontend:dev npm run start_no_port