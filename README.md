# 2023_2_Rabotyagi
Frontend репозиторий команды Работяги  
### Приложение
http://84.23.53.28/
### Наши контакты:

Владислав Ильинский: https://github.com/Vilinvil и тг https://t.me/Vilin0

Никита Демирев: 'https://github.com/NickDemiman' и тг https://t.me/NikDemiman

Алексей Красноперов: 'https://github.com/SanExpett' и тг https://t.me/SanExpet

Таня Емельянова: 'https://github.com/TanyaEmka' и тг https://t.me/jupi_abri

### Репа бек
https://github.com/go-park-mail-ru/2023_2_Rabotyagi

### Фигма
https://www.figma.com/file/YLSZ9uY9gVn6bMDJchrEzD?node-id=23:2127&mode=design#567544444

### Запуск локально

`npm run server`

## Документация


## Docker image build

### Local

Из корня проекта прописываем
```shell
docker build -t nikdemi/rabotyagi-backend:rk1-test .
```

Далее, чтобы убедиться что image забилдился, прописываем:
```shell
docker images
```

Должны увидеть следующее:
```shell
REPOSITORY          TAG       IMAGE ID       CREATED          SIZE
nikdemi/rabotyagi-backend:rk1-test   latest    25dbaeeef1af   50 seconds ago   307MB
```

### Запуск контейнера

`docker run -p 3000:3000 nikdemi/rabotyagi-backend:rk1-test`

