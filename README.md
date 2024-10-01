# B-DEV-500-NCE-5-1-area
[![Quality gate](https://sonarqube.malown.com/api/project_badges/quality_gate?project=Les-Aigris-du-AREA_B-DEV-500-NCE-5-1-area_d2b8ee1d-187c-492b-bf9e-8430f0002a9a&token=sqb_04740790f6c130d090c3db7ed1e25c9c255b9bab)](https://sonarqube.malown.com/dashboard?id=Les-Aigris-du-AREA_B-DEV-500-NCE-5-1-area_d2b8ee1d-187c-492b-bf9e-8430f0002a9a)

# Development

Run the db:
```bash
docker compose -f docker-compose.dev.yml up -d
```

Run the front
```bash
cd frontend
npm install
npm run dev
```

Run the back
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
